import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseApi } from '../utils/response-api';
import { RESPONSE_STATUS } from '../constants/response-status.constant';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseApi<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseApi<T>> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((payload) => {
        if (payload instanceof ResponseApi) return payload;

        const hasMeta = payload && payload.data && payload.meta;

        return {
          status: RESPONSE_STATUS.success,
          statusCode: statusCode,
          message: payload?.message || 'Request successful',
          data: payload?.data || payload,
          meta: hasMeta ? payload.meta : undefined,
        };
      }),
    );
  }
}
