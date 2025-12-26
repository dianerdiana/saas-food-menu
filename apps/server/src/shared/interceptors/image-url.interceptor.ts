import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';

@Injectable()
export class ImageUrlInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const baseUrl = this.configService.get<string>('image.baseUrl') || '';
    return next.handle().pipe(map((data) => this.addBaseUrl(data, baseUrl)));
  }

  addBaseUrl(data: any, baseUrl: string) {
    if (!data) return data;

    if (Array.isArray(data)) {
      return data.map((item) => this.addBaseUrl(item, baseUrl));
    }

    const newData = { ...data };

    for (const key in newData) {
      if (newData.hasOwnProperty(key)) {
        if (
          (key.toLowerCase().includes('image') || key.toLowerCase().includes('avatar')) &&
          typeof newData[key] === 'string'
        ) {
          newData[key] = `${baseUrl}/${newData[key]}`;
        } else if (typeof newData[key] === 'object') {
          newData[key] = this.addBaseUrl(newData[key], baseUrl);
        }
      }
    }

    return newData;
  }
}
