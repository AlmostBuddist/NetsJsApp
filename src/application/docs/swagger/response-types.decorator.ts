import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  BAD_REQUEST_RESPONSE,
  FORBIDDEN_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONSE,
  NOT_FOUND_RESPONSE,
  UNAUTHORIZED_RESPONSE,
} from './response-types.const';

/* Decorators with authorization */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function PrivateResponseTypes() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiBadRequestResponse(BAD_REQUEST_RESPONSE),
    ApiUnauthorizedResponse(UNAUTHORIZED_RESPONSE),
    ApiForbiddenResponse(FORBIDDEN_RESPONSE),
    ApiNotFoundResponse(NOT_FOUND_RESPONSE),
    ApiInternalServerErrorResponse(INTERNAL_SERVER_ERROR_RESPONSE),
  );
}

/* Decorators without authorization */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function PublicResponseTypes() {
  return applyDecorators(
    ApiBadRequestResponse(BAD_REQUEST_RESPONSE),
    ApiNotFoundResponse(NOT_FOUND_RESPONSE),
    ApiInternalServerErrorResponse(INTERNAL_SERVER_ERROR_RESPONSE),
  );
}
