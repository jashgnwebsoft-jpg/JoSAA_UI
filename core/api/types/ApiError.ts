import { RequestConfig } from './RequestConfig';
import { ValidationErrors } from './ValidationErrors';

export interface ApiError extends Error {
  type?:
    | 'validation_error'
    | 'client_error'
    | 'server_error'
    | 'request_cancelled'
    | 'timeout_error'
    | 'network_error'
    | 'unknown_error';
  title?: string;
  status?: number;
  traceId?: string;
  errors?: ValidationErrors;
  isAborted?: boolean;
  config?: RequestConfig;
}
