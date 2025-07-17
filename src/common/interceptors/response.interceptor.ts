import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

export interface Response<T> {
  data: T;
  status: number;
  message: string;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept<T>(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();
    const request = httpContext.getRequest();

    const { method, url } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap((data) => {
        this.logger.log(
          `API HIT: ${method} ${url} - STATUS: ${response.statusCode} - RESPONSE TIME: ${Date.now() - now}`,
        );
      }),
      map((data: T) => {
        return {
          data,
          status: response.statusCode,
          message: 'Success',
        } as Response<T>;
      }),
    );
  }
}
