import EXCEPTION_MESSAGES from '../../../domain/constants/exception-messages.const';
import ErrorForbiddenDto from '../../http/dtos/error-forbidden.dto';
import ErrorInternalServerDto from '../../http/dtos/error-internal-server.dto';
import ErrorNotFoundDto from '../../http/dtos/error-not-found.dto';
import ErrorUnauthorizedDto from '../../http/dtos/error-unauthorized.dto';
import ErrorValidationDto from '../../http/dtos/error-validation.dto';

export const BAD_REQUEST_RESPONSE = {
  type: ErrorValidationDto,
  description: EXCEPTION_MESSAGES.BAD_REQUEST,
};

export const FORBIDDEN_RESPONSE = {
  type: ErrorForbiddenDto,
  description: EXCEPTION_MESSAGES.FORBIDDEN,
};

export const INTERNAL_SERVER_ERROR_RESPONSE = {
  type: ErrorInternalServerDto,
  description: EXCEPTION_MESSAGES.INTERNAL_SERVER_ERROR,
};

export const NOT_FOUND_RESPONSE = {
  type: ErrorNotFoundDto,
  description: EXCEPTION_MESSAGES.NOT_FOUND,
};

export const UNAUTHORIZED_RESPONSE = {
  type: ErrorUnauthorizedDto,
  description: EXCEPTION_MESSAGES.UNAUTHORIZED,
};
