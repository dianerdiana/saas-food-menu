import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserById {
  execute(): string {
    return 'Hello world!';
  }
}
