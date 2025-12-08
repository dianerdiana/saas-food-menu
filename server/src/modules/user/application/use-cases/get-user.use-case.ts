import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserUseCase {
  execute(): string {
    return 'Hello world!';
  }
}
