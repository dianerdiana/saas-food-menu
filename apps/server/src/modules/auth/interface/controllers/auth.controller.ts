// NestJs
import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';

// Application
import { SignIn } from '../../application/use-cases/sign-in.use-case';
import { SignUp } from '../../application/use-cases/sign-up.use-case';
import { SignUpDto } from '../../application/dtos/sign-up.dto';

// Infrastructure
import { LocalAuthGuard } from '../../infrastructure/guards/local-auth.guard';

// Shared
import { Public } from '@/shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private signInUseCase: SignIn,
    private signUpUseCase: SignUp,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Request() req) {
    return await this.signInUseCase.execute(req.user);
  }

  @Public()
  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return await this.signUpUseCase.execute(signUpDto);
  }
}
