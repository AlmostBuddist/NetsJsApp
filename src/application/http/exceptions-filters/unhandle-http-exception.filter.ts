import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

import UnhandledException from '../../../domain/exceptions/unhandle.exception';
import HTTP_EXCEPTIONS_MAPPER from '../constants/http-exceptions-mapper.const';
import HTTP_REQUEST_TYPE_MESSAGES from '../constants/http-request-types.const';
import { IHttpErrorResponseBody } from '../interfaces/http-response-body.interface';

@Catch(UnhandledException)
export default class UnhandledExceptionFilter implements ExceptionFilter {
  public catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const responseBody = this.getResponseBody(exception);

    response.status(responseBody.status).send(responseBody);
  }

  /* eslint-disable-next-line */
  private getResponseBody(exception: any): IHttpErrorResponseBody {
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const httpStatus =
      exception?.status && HTTP_EXCEPTIONS_MAPPER[exception.status]
        ? HTTP_EXCEPTIONS_MAPPER[exception.status]
        : HTTP_EXCEPTIONS_MAPPER[status];

    const type =
      HTTP_REQUEST_TYPE_MESSAGES[httpStatus] ||
      HTTP_REQUEST_TYPE_MESSAGES[HttpStatus.INTERNAL_SERVER_ERROR];

    return {
      status,
      timestamp: new Date().toISOString(),
      type,
      title: exception?.message || type,
      code: exception?.code,
    };
  }
}
