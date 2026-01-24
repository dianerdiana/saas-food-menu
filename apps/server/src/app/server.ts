import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

export async function createServer() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:7000', 'https://tooang.com', 'https://www.tooang.com', 'https://dash.tooang.com'],
    credentials: true,
  });

  // Validation pipe for class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Use cookie parser
  app.use(cookieParser());

  return app;
}
