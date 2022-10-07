/* eslint-disable @typescript-eslint/ban-types,@typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */

import AppExceptionCodesEnum from '../enums/app-expection-codes.enum';

export default class AppException extends Error {
  private readonly errorMessage: string;

  private readonly errorStatus: AppExceptionCodesEnum;

  private readonly errorPayload: any;

  private readonly errorCode: string;

  constructor(
    status: AppExceptionCodesEnum,
    message: string,
    errorCode?: string,
    payload?: Object,
  ) {
    super(message);
    this.errorMessage = message;
    this.errorStatus = status;
    this.errorCode = errorCode;
    this.errorPayload = payload || {};
  }

  public get status(): AppExceptionCodesEnum {
    return this.errorStatus;
  }

  public get message(): string {
    return this.errorMessage;
  }

  /* TODO: set type */
  public get payload() {
    return this.errorPayload;
  }

  public get code(): string {
    return this.errorCode;
  }
}
