import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { SignIn } from '../../application/use-cases/sign-in.use-case';
import { Public } from '@/shared/decorators/public.decorator';
import { LocalAuthGuard } from '../../infrastructure/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private signIn: SignIn) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async login(@Request() req) {
    return this.signIn.execute(req.user);
  }
}
