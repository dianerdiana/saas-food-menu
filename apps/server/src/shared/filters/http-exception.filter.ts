import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { RESPONSE_STATUS } from '../constants/response-status.constant';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

    const message =
      typeof exceptionResponse === 'object'
        ? (exceptionResponse as any).message || (exceptionResponse as any).error
        : exceptionResponse;

    // Log error details
    this.logError(exception, request, status);

    response.status(status).json({
      status: RESPONSE_STATUS.error,
      statusCode: status,
      message: Array.isArray(message) ? message[0] : message,
      timestamp: new Date().toISOString(),
    });
  }

  private logError(exception: unknown, request: Request, status: number) {
    const { method, url } = request;
    const message = exception instanceof HttpException ? exception.message : (exception as Error).message;

    // Trace log error
    if (status >= 500) {
      this.logger.error(
        `${method} ${url} ${status} - Error: ${message}`,
        exception instanceof Error ? exception.stack : '', // Stack trace is important for 500 error
      );
    } else {
      this.logger.warn(`${method} ${url} ${status} - Client Error: ${message}`);
    }
  }
}
