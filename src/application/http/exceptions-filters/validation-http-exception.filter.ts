import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

import ValidationException from '../../../domain/exceptions/validation.exception';
import { getValidationErrorMessages } from '../../../domain/utils';
import HTTP_EXCEPTIONS_MAPPER from '../constants/http-exceptions-mapper.const';
import HTTP_REQUEST_TYPE_MESSAGES from '../constants/http-request-types.const';
import {
  IHttpErrorResponseBody,
  IHttpValidationErrorResponseBody,
} from '../interfaces/http-response-body.interface';

@Catch(ValidationException)
export default class ValidationHttpExceptionFilter implements ExceptionFilter {
  public catch(exception: ValidationException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const responseBody = this.getResponseBody(exception);

    response.status(responseBody.status).send(responseBody);
  }

  private getResponseBody(
    exception: ValidationException,
  ): IHttpErrorResponseBody | IHttpValidationErrorResponseBody {
    const { status, message } = exception;
    const httpStatus = HTTP_EXCEPTIONS_MAPPER[status];
    const type =
      HTTP_REQUEST_TYPE_MESSAGES[httpStatus] ||
      HTTP_REQUEST_TYPE_MESSAGES[HttpStatus.INTERNAL_SERVER_ERROR];

    const errorPayload = exception.payload;
    const validationErrors = errorPayload?.details || [];
    const errors: string[] = getValidationErrorMessages(validationErrors);

    return {
      status: httpStatus,
      timestamp: new Date().toISOString(),
      type,
      title: message,
      errors,
    };
  }
}
