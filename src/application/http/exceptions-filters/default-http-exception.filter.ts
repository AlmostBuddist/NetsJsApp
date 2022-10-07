import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

import HTTP_REQUEST_TYPE_MESSAGES from '../constants/http-request-types.const';
import {
  IHttpErrorResponseBody,
  IHttpValidationErrorResponseBody,
} from '../interfaces/http-response-body.interface';

@Catch(HttpException)
export default class DefaultHttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const responseBody = this.getResponseBody(exception);

    response.status(responseBody.status).send(responseBody);
  }

  private getResponseBody(
    exception: HttpException,
  ): IHttpErrorResponseBody | IHttpValidationErrorResponseBody {
    const status = exception.getStatus();
    const title = exception.message;

    return {
      status,
      timestamp: new Date().toISOString(),
      type: HTTP_REQUEST_TYPE_MESSAGES[status],
      title,
    };
  }
}
