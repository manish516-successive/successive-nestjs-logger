import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status: string;
  message: string;
  data: T;
}

@Injectable()
export class LoggerInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data) => {
          let req = context.switchToHttp().getRequest();
          req.res.header('X-Correlation-Id', req.headers["X-Correlation-Id"]);
          return data;
        }),
      );
  }
}