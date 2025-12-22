import { Injectable } from '@nestjs/common';
import { SignInModel } from '../../domain/models/sign-in.model';

@Injectable()
export class SignIn {
  async execute(user: any) {
    return new SignInModel(user);
  }
}
