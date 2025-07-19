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
  intercept<T>(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();

    return next.handle().pipe(
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
