import { Body, Controller, HttpCode, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';

import { SignUpDash } from '../../application/use-cases/auth/sign-up.dash';

import { SignInUseCase } from '@/modules/auth/application/use-cases/sign-in.use-case';
import { SignUpDto } from '@/modules/auth/application/dtos/sign-up.dto';
import { RefreshAccessTokenUseCase } from '@/modules/auth/application/use-cases/refresh-access-token.use-case';
import { ChangeStoreUseCase } from '@/modules/auth/application/use-cases/change-store.use-case';

import type { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { LocalAuthGuard } from '@/modules/auth/infrastructure/guards/local-auth.guard';
import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';

import { UserDataResponse } from '@/shared/responses/auth.response';

import type { AuthUser } from '@/shared/types/auth-user.type';
import { Public } from '@/shared/decorators/public.decorator';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { GetAbillity } from '@/shared/decorators/get-ability.decorator';
import { Action, Subject } from '@/shared/enums/access-control.enum';

const REFRESH_TOKEN_KEY = 'refreshToken';
const MAX_AGE_COOKIE = 7 * 24 * 60 * 60 * 1000;

@Controller('/dash/auth')
export class DashAuthController {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpDash: SignUpDash,
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
    const isProduction = this.configService.get<string>('nodeEnv') === 'production';

    response.cookie(REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: MAX_AGE_COOKIE, // 7 Days
      path: '/',
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
    const user = await this.signUpDash.execute(signUpDto);
    return {
      data: new UserDataResponse(user),
    };
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
    const isProduction = this.configService.get<string>('nodeEnv') === 'production';

    response.clearCookie(REFRESH_TOKEN_KEY, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
    });

    return { message: 'Logged out' };
  }

  @UseGuards(PoliciesGuard)
  @HttpCode(HttpStatus.OK)
  @Post('change-store')
  async changeStore(
    @Res({ passthrough: true }) response: Response,
    @GetAuthUser() authUser: AuthUser,
    @Body('storeId') storeId: string,
    @GetAbillity() ability: AppAbility,
  ) {
    const { accessToken, refreshToken, userData } = await this.changeStoreUseCase.execute(
      authUser,
      storeId,
      ability.can(Action.Manage, Subject.Store),
    );

    const isProduction = this.configService.get<string>('nodeEnv') === 'production';

    response.cookie(REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: MAX_AGE_COOKIE, // 7 Days
      path: '/',
    });

    return {
      data: {
        accessToken,
        userData: new UserDataResponse(userData),
      },
    };
  }
}
