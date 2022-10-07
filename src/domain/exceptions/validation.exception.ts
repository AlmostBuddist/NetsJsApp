/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any */

import EXCEPTION_MESSAGES from '../constants/exception-messages.const';
import AppExceptionCodesEnum from '../enums/app-expection-codes.enum';
import AppException from './app.exception';

export default class ValidationException extends AppException {
  // TODO: set type
  constructor(payload?: any) {
    super(AppExceptionCodesEnum.BAD_REQUEST, EXCEPTION_MESSAGES.INVALID_DATA, null, payload);
  }
}
