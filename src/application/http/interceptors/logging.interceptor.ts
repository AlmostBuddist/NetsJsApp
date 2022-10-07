import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
  ServiceUnavailableException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import AppException from '../../../domain/exceptions/app.exception';
import UnhandledException from '../../../domain/exceptions/unhandle.exception';
import ValidationException from '../../../domain/exceptions/validation.exception';
import { getIpByHeaders } from '../../../domain/utils';
import HEALTH_API_URL from '../constants/health.const';

@Injectable()
export default class LoggingInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const requestUrl = request.raw.url;
    const isHealthRequest = this.isHealthRequest(requestUrl);
    const isEnableLogger = !isHealthRequest;
    const userIp = getIpByHeaders(request.headers) || request.raw.ip;

    if (isEnableLogger) {
      // eslint-disable-next-line no-console
      console.log(
        new Date(),
        ' Входящий запрос: ',
        JSON.stringify({
          params: request.params,
          body: request.body,
          query: request.query,
          headers: request.headers,
          url: request.url,
          userIp,
        }),
      );
    }

    return next.handle().pipe(
      tap((data) => {
        const response = http.getResponse();

        if (isEnableLogger) {
          // eslint-disable-next-line no-console
          console.log(
            new Date(),
            ' Ответ на запрос: ',
            JSON.stringify({
              url: request.url,
              response: data,
              code: response.statusCode,
            }),
          );
        }
      }),
      catchError((err) => {
        const response = http.getResponse();

        if (isEnableLogger) {
          // eslint-disable-next-line no-console
          console.log(
            new Date(),
            ' Ошибка при запросе: ',
            JSON.stringify({
              url: request.url,
              code: response.statusCode,
              err,
            }),
          );
        }

        const isHandleErrorInstance = this.isHandleErrorInstance(err);

        if (isHandleErrorInstance) {
          return throwError(err);
        }

        return throwError(new UnhandledException(err?.message));
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isHandleErrorInstance(err: any): boolean {
    return (
      err instanceof HttpException ||
      err instanceof AppException ||
      err instanceof ValidationException ||
      err instanceof ServiceUnavailableException
    );
  }

  private isHealthRequest(url: string): boolean {
    return url === `${HEALTH_API_URL.ROOT}${HEALTH_API_URL.CHILD}`;
  }
}
