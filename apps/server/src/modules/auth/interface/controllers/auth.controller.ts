// NestJs
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';

// Application
import { SignInUseCase } from '../../application/use-cases/sign-in.use-case';
import { SignUpUseCase } from '../../application/use-cases/sign-up.use-case';
import { SignUpDto } from '../../application/dtos/sign-up.dto';
import { GenerateAccessTokenUseCase } from '../../application/use-cases/generate-access-token.use-case';

// Infrastructure
import { LocalAuthGuard } from '../../infrastructure/guards/local-auth.guard';

// Shared
import { Public } from '@/shared/decorators/public.decorator';
import { AuthUser } from '@/shared/types/auth-user.type';

const REFRESH_TOKEN_KEY = 'refreshToken';

@Controller('auth')
export class AuthController {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUseCase: SignUpUseCase,
    private generateAccessTokenUseCase: GenerateAccessTokenUseCase,
    private configService: ConfigService,
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
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
      path: '/auth/refresh',
    });

    return {
      data: {
        accessToken,
        userData,
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

    const { accessToken, userData } = await this.generateAccessTokenUseCase.execute(user);

    return { data: { accessToken, userData } };
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
}
