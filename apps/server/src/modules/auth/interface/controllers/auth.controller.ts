import { Body, Controller, HttpCode, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';

import { SignInUseCase } from '../../application/use-cases/sign-in.use-case';
import { SignUpUseCase } from '../../application/use-cases/sign-up.use-case';
import { SignUpDto } from '../../application/dtos/sign-up.dto';
import { RefreshAccessTokenUseCase } from '../../application/use-cases/refresh-access-token.use-case';
import { ChangeStoreUseCase } from '../../application/use-cases/change-store.use-case';

import { LocalAuthGuard } from '../../infrastructure/guards/local-auth.guard';

import { UserDataResponse } from '../responses/sign-in.response';

import { Public } from '@/shared/decorators/public.decorator';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import type { AuthUser } from '@/shared/types/auth-user.type';

const REFRESH_TOKEN_KEY = 'refreshToken';
const MAX_AGE_COOKIE = 7 * 24 * 60 * 60 * 1000;

@Controller('auth')
export class AuthController {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUseCase: SignUpUseCase,
    private refreshAccessTokenUseCase: RefreshAccessTokenUseCase,
    private configService: ConfigService,
    private changeStoreUseCase: ChangeStoreUseCase,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Request() req, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken, userData } = await this.signInUseCase.execute(req.user);

    response.cookie(REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>('nodeEnv') === 'production',
      maxAge: MAX_AGE_COOKIE, // 7 Days
      path: '/auth/refresh',
    });

    return {
      data: {
        accessToken,
        userData: new UserDataResponse(userData),
      },
    };
  }

  @Public()
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.signUpUseCase.execute(signUpDto);
  }

  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refresh(@Req() req) {
    const user: AuthUser = req.user;

    const { accessToken, userData } = await this.refreshAccessTokenUseCase.execute(user);

    return {
      data: {
        accessToken,
        userData: new UserDataResponse(userData),
      },
    };
  }

  @Public()
  @Post('signout')
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(REFRESH_TOKEN_KEY, {
      httpOnly: true,
      secure: this.configService.get<string>('nodeEnv') === 'production',
      path: '/auth/refresh',
    });

    return { message: 'Logged out' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('change-store')
  async changeStore(
    @Res({ passthrough: true }) response: Response,
    @GetAuthUser() authUser: AuthUser,
    @Body('storeId') storeId: string,
  ) {
    const { accessToken, refreshToken, userData } = await this.changeStoreUseCase.execute(authUser, storeId);

    response.cookie(REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>('nodeEnv') === 'production',
      maxAge: MAX_AGE_COOKIE, // 7 Days
      path: '/auth/refresh',
    });

    return {
      data: {
        accessToken,
        userData: new UserDataResponse(userData),
      },
    };
  }
}
