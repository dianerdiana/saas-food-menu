import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export async function createServer() {
  const app = await NestFactory.create(AppModule, { cors: true });

  return app;
}
