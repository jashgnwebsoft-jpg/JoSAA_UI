import { ApiError } from './ApiError';

export type ErrorInterceptor = (error: ApiError) => Promise<ApiError> | ApiError;
