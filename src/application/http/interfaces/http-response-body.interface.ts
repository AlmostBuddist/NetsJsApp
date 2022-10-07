export interface IHttpErrorResponseBody {
  readonly status: number;
  readonly timestamp: string;
  readonly type: string;
  readonly title: string;
  readonly code?: string;
}
export interface IHttpValidationErrorResponseBody extends IHttpErrorResponseBody {
  readonly errors: string[];
}
