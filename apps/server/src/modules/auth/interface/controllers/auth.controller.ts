// NestJs
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';

// Application
import { SignInUseCase } from '../../application/use-cases/sign-in.use-case';
import { SignUpUseCase } from '../../application/use-cases/sign-up.use-case';
import { SignUpDto } from '../../application/dtos/sign-up.dto';

// Infrastructure
import { LocalAuthGuard } from '../../infrastructure/guards/local-auth.guard';

// Shared
import { Public } from '@/shared/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';

const REFRESH_TOKEN_KEY = 'refreshToken';

@Controller('auth')
export class AuthController {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUseCase: SignUpUseCase,
    private configService: ConfigService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Request() req, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken, userData } = await this.signInUseCase.execute(req.user);

    response.cookie(REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>('nodeEnv') === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
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
  async signup(@Body() signUpDto: SignUpDto) {
    return await this.signUpUseCase.execute(signUpDto);
  }

  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refresh(@Req() req) {
    // User didefinisikan oleh JwtRefreshStrategy setelah validasi cookie berhasil
    const user = req.user;

    // Generate Access Token baru
    // const newAccessToken = await this.authService.generateAccessToken(user);

    return user;
  }

  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(REFRESH_TOKEN_KEY, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });
    return { message: 'Logged out' };
  }
}
