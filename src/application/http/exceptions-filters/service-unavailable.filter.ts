/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  ServiceUnavailableException,
} from '@nestjs/common';

@Catch(ServiceUnavailableException)
export default class ServiceUnavailableFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost): void {
    // @ts-ignore - because response method is private but it necessary
    const errorResponse = exception?.response;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).send(errorResponse);
  }
}
