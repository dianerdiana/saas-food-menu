import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '@/shared/interceptors/transform.interceptor';
import { GlobalExceptionFilter } from '@/shared/filters/http-exception.filter';

export async function createServer() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Validation pipe for class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Use for serialize model responses
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Use for transform success response
  app.useGlobalInterceptors(new TransformInterceptor());

  // Use for filter error response
  app.useGlobalFilters(new GlobalExceptionFilter());

  return app;
}
