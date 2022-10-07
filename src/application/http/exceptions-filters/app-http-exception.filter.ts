import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

import AppException from '../../../domain/exceptions/app.exception';
import HTTP_EXCEPTIONS_MAPPER from '../constants/http-exceptions-mapper.const';
import HTTP_REQUEST_TYPE_MESSAGES from '../constants/http-request-types.const';
import { IHttpErrorResponseBody } from '../interfaces/http-response-body.interface';

@Catch(AppException)
export default class AppHttpExceptionFilter implements ExceptionFilter {
  public catch(exception: AppException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const responseBody = this.getResponseBody(exception);

    response.status(responseBody.status).send(responseBody);
  }

  private getResponseBody(exception: AppException): IHttpErrorResponseBody {
    const { message, status, code } = exception;
    const httpStatus = HTTP_EXCEPTIONS_MAPPER[status];
    const type =
      HTTP_REQUEST_TYPE_MESSAGES[httpStatus] ||
      HTTP_REQUEST_TYPE_MESSAGES[HttpStatus.INTERNAL_SERVER_ERROR];

    return {
      status: httpStatus,
      timestamp: new Date().toISOString(),
      type,
      title: message,
      code,
    };
  }
}
