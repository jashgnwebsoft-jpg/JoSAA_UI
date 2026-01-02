import { ApiError } from './ApiError';

export interface ApiResponse<TData = any, TError = ApiError> {
  data?: TData;
  error?: TError;
}
