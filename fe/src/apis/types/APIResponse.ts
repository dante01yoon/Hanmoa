export type StatusCode = number;
export interface APIStatus {
  status: StatusCode;
  success?: boolean;
}
export interface APIError extends APIStatus {
  error?: string;
  validate?: boolean; // authenticate 관련 api 필드
}
export interface APISuccess extends APIStatus { };
export interface Response<Data> extends APISuccess {
  data: Data
}

export type WhenError = [APIError, undefined];
export type WhenSuccess<Data> = [undefined, Response<Data>];
export type APIResponse<Data> = WhenError | WhenSuccess<Data>;
