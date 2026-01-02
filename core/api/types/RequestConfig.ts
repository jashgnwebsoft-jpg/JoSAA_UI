import { CancelToken } from './CancelToken';

export interface RequestConfig extends Omit<RequestInit, 'signal'> {
  url?: string;
  params?: Record<string, any>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  skipAuthRefresh?: boolean;
  signal?: AbortSignal;
  cancelToken?: CancelToken;
  correlationId?: string;
  skipCorrelationId?: boolean;
  throwErrors?: boolean; // If true, throws errors; if false, returns errors in ApiResponse.error
}
