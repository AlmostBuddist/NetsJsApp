import { HttpStatus } from '@nestjs/common';

import AppExceptionCodesEnum from '../../../domain/enums/app-expection-codes.enum';

const HTTP_EXCEPTIONS_MAPPER = {
  [AppExceptionCodesEnum.CONTINUE]: HttpStatus.CONTINUE,
  [AppExceptionCodesEnum.SWITCHING_PROTOCOLS]: HttpStatus.SWITCHING_PROTOCOLS,
  [AppExceptionCodesEnum.OK]: HttpStatus.OK,
  [AppExceptionCodesEnum.CREATED]: HttpStatus.CREATED,
  [AppExceptionCodesEnum.ACCEPTED]: HttpStatus.ACCEPTED,
  [AppExceptionCodesEnum.NON_AUTHORITATIVE_INFORMATION]: HttpStatus.NON_AUTHORITATIVE_INFORMATION,
  [AppExceptionCodesEnum.NO_CONTENT]: HttpStatus.NO_CONTENT,
  [AppExceptionCodesEnum.RESET_CONTENT]: HttpStatus.RESET_CONTENT,
  [AppExceptionCodesEnum.PARTIAL_CONTENT]: HttpStatus.PARTIAL_CONTENT,
  [AppExceptionCodesEnum.MOVED_PERMANENTLY]: HttpStatus.MOVED_PERMANENTLY,
  [AppExceptionCodesEnum.FOUND]: HttpStatus.FOUND,
  [AppExceptionCodesEnum.SEE_OTHER]: HttpStatus.SEE_OTHER,
  [AppExceptionCodesEnum.NOT_MODIFIED]: HttpStatus.NOT_MODIFIED,
  [AppExceptionCodesEnum.TEMPORARY_REDIRECT]: HttpStatus.TEMPORARY_REDIRECT,
  [AppExceptionCodesEnum.BAD_REQUEST]: HttpStatus.BAD_REQUEST,
  [AppExceptionCodesEnum.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
  [AppExceptionCodesEnum.PAYMENT_REQUIRED]: HttpStatus.PAYMENT_REQUIRED,
  [AppExceptionCodesEnum.FORBIDDEN]: HttpStatus.FORBIDDEN,
  [AppExceptionCodesEnum.NOT_FOUND]: HttpStatus.NOT_FOUND,
  [AppExceptionCodesEnum.METHOD_NOT_ALLOWED]: HttpStatus.METHOD_NOT_ALLOWED,
  [AppExceptionCodesEnum.NOT_ACCEPTABLE]: HttpStatus.NOT_ACCEPTABLE,
  [AppExceptionCodesEnum.PROXY_AUTHENTICATION_REQUIRED]: HttpStatus.PROXY_AUTHENTICATION_REQUIRED,
  [AppExceptionCodesEnum.REQUEST_TIMEOUT]: HttpStatus.REQUEST_TIMEOUT,
  [AppExceptionCodesEnum.CONFLICT]: HttpStatus.CONFLICT,
  [AppExceptionCodesEnum.GONE]: HttpStatus.GONE,
  [AppExceptionCodesEnum.LENGTH_REQUIRED]: HttpStatus.LENGTH_REQUIRED,
  [AppExceptionCodesEnum.PRECONDITION_FAILED]: HttpStatus.PRECONDITION_FAILED,
  [AppExceptionCodesEnum.UNSUPPORTED_MEDIA_TYPE]: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
  [AppExceptionCodesEnum.REQUESTED_RANGE_NOT_SATISFIABLE]:
    HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
  [AppExceptionCodesEnum.EXPECTATION_FAILED]: HttpStatus.EXPECTATION_FAILED,
  [AppExceptionCodesEnum.UNPROCESSABLE_ENTITY]: HttpStatus.UNPROCESSABLE_ENTITY,
  [AppExceptionCodesEnum.TOO_MANY_REQUESTS]: HttpStatus.TOO_MANY_REQUESTS,
  [AppExceptionCodesEnum.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
  [AppExceptionCodesEnum.NOT_IMPLEMENTED]: HttpStatus.NOT_IMPLEMENTED,
  [AppExceptionCodesEnum.BAD_GATEWAY]: HttpStatus.BAD_GATEWAY,
  [AppExceptionCodesEnum.SERVICE_UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
  [AppExceptionCodesEnum.GATEWAY_TIMEOUT]: HttpStatus.GATEWAY_TIMEOUT,
  [AppExceptionCodesEnum.VERSION_NOT_SUPPORTED]: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
};

export default HTTP_EXCEPTIONS_MAPPER;
