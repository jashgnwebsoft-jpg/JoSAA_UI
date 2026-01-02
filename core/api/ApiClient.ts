import type { GridSortModel } from '@mui/x-data-grid';

import { CorrelationIdGenerator } from './CorrelationIdGenerator';
import { RequestManager } from './RequestManager';
import { ApiError } from './types/ApiError';
import { ApiResponse } from './types/ApiResponse';
import { ErrorInterceptor } from './types/ErrorInterceptor';
import { RequestConfig } from './types/RequestConfig';
import { RequestInterceptor } from './types/RequestInterceptor';
import { ResponseInterceptor } from './types/ResponseInterceptor';

export interface PostModel<TFilterModel> {
  filterModel?: TFilterModel;
  pageOffset: number;
  pageSize: number;
  sortField: string | null;
  sortOrder: 'asc' | 'desc' | null | undefined;
  sortModel?: GridSortModel;
}

export type ListResponse2<TListModel> = {
  Data: TListModel[];
  Total: number;
};

// apiClient.ts
export class ApiClient {
  private baseURL: string;
  private defaultTimeout: number;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];
  private authToken: string | null = null;
  private refreshTokenPromise: Promise<string> | null = null;
  private requestManager: RequestManager = new RequestManager();
  private correlationIdPrefix: string = 'api';
  private includeCorrelationId: boolean = true;

  constructor(baseURL: string = '', defaultTimeout: number = 30000) {
    this.baseURL = baseURL;
    this.defaultTimeout = defaultTimeout;
  }

  // Configuration methods
  setCorrelationIdPrefix(prefix: string): void {
    this.correlationIdPrefix = prefix;
  }

  setIncludeCorrelationId(include: boolean): void {
    this.includeCorrelationId = include;
  }

  // Interceptor management
  addRequestInterceptor(interceptor: RequestInterceptor): () => void {
    this.requestInterceptors.push(interceptor);
    return () => {
      const index = this.requestInterceptors.indexOf(interceptor);
      if (index > -1) this.requestInterceptors.splice(index, 1);
    };
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    this.responseInterceptors.push(interceptor);
    return () => {
      const index = this.responseInterceptors.indexOf(interceptor);
      if (index > -1) this.responseInterceptors.splice(index, 1);
    };
  }

  addErrorInterceptor(interceptor: ErrorInterceptor): () => void {
    this.errorInterceptors.push(interceptor);
    return () => {
      const index = this.errorInterceptors.indexOf(interceptor);
      if (index > -1) this.errorInterceptors.splice(index, 1);
    };
  }

  // Auth token management
  setAuthToken(token: string | null): void {
    this.authToken = token;
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  // Request cancellation
  cancelRequest(key: string): void {
    this.requestManager.cancel(key);
  }

  cancelAllRequests(): void {
    this.requestManager.cancelAll();
  }

  // URL and params handling
  private buildURL(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseURL);

    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => url.searchParams.append(key, String(v)));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      });
    }

    return url.toString();
  }

  // Apply request interceptors
  private async applyRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
    let modifiedConfig = { ...config };

    for (const interceptor of this.requestInterceptors) {
      modifiedConfig = await interceptor(modifiedConfig);
    }

    return modifiedConfig;
  }

  // Apply response interceptors
  private async applyResponseInterceptors<T>(response: ApiResponse<T>): Promise<ApiResponse<T>> {
    let modifiedResponse = response;

    for (const interceptor of this.responseInterceptors) {
      modifiedResponse = await interceptor(modifiedResponse);
    }

    return modifiedResponse;
  }

  // Apply error interceptors
  private async applyErrorInterceptors(error: ApiError): Promise<ApiError> {
    let modifiedError = error;

    for (const interceptor of this.errorInterceptors) {
      try {
        modifiedError = await interceptor(modifiedError);
      } catch (e) {
        modifiedError = e as ApiError;
      }
    }

    throw modifiedError;
  }

  // Create combined abort signal
  private createCombinedSignal(signals: (AbortSignal | undefined)[]): AbortController {
    const controller = new AbortController();

    for (const signal of signals) {
      if (signal) {
        if (signal.aborted) {
          controller.abort(signal.reason);
          break;
        }

        signal.addEventListener(
          'abort',
          () => {
            controller.abort(signal.reason);
          },
          { once: true }
        );
      }
    }

    return controller;
  }

  // Timeout handling with AbortSignal
  private createTimeoutSignal(timeout: number): AbortController {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort(`Request timeout after ${timeout}ms`);
    }, timeout);

    // Clean up timeout when signal is aborted
    controller.signal.addEventListener(
      'abort',
      () => {
        clearTimeout(timeoutId);
      },
      { once: true }
    );

    return controller;
  }

  // Retry logic with abort support
  private async retryRequest<T>(
    fn: () => Promise<T>,
    retries: number,
    delay: number,
    signal?: AbortSignal
  ): Promise<T> {
    try {
      // Check if already aborted
      if (signal?.aborted) {
        throw new Error(signal.reason || 'Request aborted');
      }

      return await fn();
    } catch (error: any) {
      // Don't retry if aborted
      if (error.name === 'AbortError' || signal?.aborted) {
        throw error;
      }

      // Don't retry validation errors
      if (error.type === 'validation_error' || error.status === 400) {
        throw error;
      }

      if (retries === 0) throw error;

      // Wait with abort support
      await new Promise((resolve, reject) => {
        const timeoutId = setTimeout(resolve, delay);

        if (signal) {
          signal.addEventListener(
            'abort',
            () => {
              clearTimeout(timeoutId);
              reject(new Error(signal.reason || 'Request aborted'));
            },
            { once: true }
          );
        }
      });

      return this.retryRequest(fn, retries - 1, delay * 2, signal);
    }
  }

  // Overloaded request method signatures
  async request<T = any>(
    endpoint: string,
    config: RequestConfig & { throwErrors: false }
  ): Promise<ApiResponse<T, ApiError>>;
  async request<T = any>(
    endpoint: string,
    config?: RequestConfig & { throwErrors?: true }
  ): Promise<ApiResponse<T, ApiError>>;
  async request<T = any>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T, ApiError>>;

  // Main request method implementation
  async request<T = any>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T, ApiError>> {
    // Generate correlation ID
    const correlationId =
      config.correlationId ||
      (!config.skipCorrelationId && this.includeCorrelationId
        ? CorrelationIdGenerator.generate(this.correlationIdPrefix)
        : undefined);

    // Generate request key for tracking
    const requestKey = `${config.method || 'GET'}_${endpoint}_${Date.now()}`;

    // Create master controller for this request
    const masterController = new AbortController();

    try {
      // Combine all abort signals
      const signals: (AbortSignal | undefined)[] = [
        config.signal,
        config.cancelToken?.signal,
        masterController.signal,
      ];

      // Add timeout signal if configured
      const timeout = config.timeout || this.defaultTimeout;
      const timeoutController = this.createTimeoutSignal(timeout);
      signals.push(timeoutController.signal);

      // Create combined signal
      const combinedController = this.createCombinedSignal(signals);

      // Track this request
      if (correlationId) {
        this.requestManager.add(requestKey, masterController, correlationId);
      }

      // Apply request interceptors
      const finalConfig = await this.applyRequestInterceptors({
        ...config,
        signal: combinedController.signal,
        correlationId,
      });

      // Build full URL
      const url = this.buildURL(endpoint, finalConfig.params);

      // Add default headers
      const headers = new Headers(finalConfig.headers);

      // Add correlation ID header
      if (correlationId) {
        headers.set('X-Correlation-Id', correlationId);
        headers.set('X-Request-Id', correlationId);
      }

      // Add auth header if token exists
      if (this.authToken && !finalConfig.skipAuthRefresh) {
        headers.set('Authorization', `Bearer ${this.authToken}`);
      }

      // Set content-type for JSON payloads
      if (
        finalConfig.body &&
        typeof finalConfig.body === 'object' &&
        !(finalConfig.body instanceof FormData)
      ) {
        headers.set('Content-Type', 'application/json');
        finalConfig.body = JSON.stringify(finalConfig.body);
      }

      finalConfig.headers = headers;

      // Create fetch promise
      const fetchPromise = async () => {
        try {
          const response = await fetch(url, {
            ...finalConfig,
            signal: combinedController.signal,
          });

          // Parse response data
          const responseData = await this.parseResponseData(response);

          // Handle error responses
          if (!response.ok) {
            const error: ApiError = Object.assign(
              new Error(responseData.title || `HTTP ${response.status}: ${response.statusText}`),
              {
                type: responseData.type || this.getErrorType(response.status),
                title: responseData.title || this.getErrorTitle(response.status),
                status: response.status,
                traceId: responseData.traceId || correlationId,
                errors: responseData.errors,
                isAborted: false,
                config: finalConfig,
              }
            );

            // Check if we should throw or return error in response
            if (finalConfig.throwErrors !== false) {
              throw error;
            } else {
              // Return error in ApiResponse.error field
              return await this.applyResponseInterceptors({
                error: error,
              } as ApiResponse<T, ApiError>);
            }
          }

          // Format successful response
          const apiResponse: ApiResponse<T> = {
            data: responseData as T,
          };

          // Apply response interceptors
          return await this.applyResponseInterceptors(apiResponse);
        } catch (error: any) {
          // Handle abort errors
          if (error.name === 'AbortError') {
            const abortError = Object.assign(new Error(error.message || 'Request aborted'), {
              type: 'request_cancelled',
              title: 'Request was cancelled',
              status: 0,
              traceId: correlationId,
              isAborted: true,
              config: finalConfig,
            });

            // Check if we should throw or return error in response
            if (finalConfig.throwErrors !== false) {
              throw abortError;
            } else {
              // Return error in ApiResponse.error field
              return await this.applyResponseInterceptors({
                error: abortError,
              } as ApiResponse<T, ApiError>);
            }
          }
          throw error;
        }
      };

      // Handle retries if configured
      if (finalConfig.retries && finalConfig.retries > 0) {
        return await this.retryRequest(
          fetchPromise,
          finalConfig.retries,
          finalConfig.retryDelay || 1000,
          combinedController.signal
        );
      }

      return await fetchPromise();
    } catch (error) {
      // Handle errors
      const apiError: ApiError = this.normalizeError(error, config, correlationId);

      // Check if we should throw or return error in response
      if (config.throwErrors !== false) {
        await this.applyErrorInterceptors(apiError);
        // This line will never be reached as applyErrorInterceptors always throws,
        // but TypeScript requires a return statement
        throw apiError;
      } else {
        // Return error in ApiResponse.error field
        return {
          error: apiError,
        } as ApiResponse<T, ApiError>;
      }
    } finally {
      // Clean up request tracking
      this.requestManager.remove(requestKey);
    }
  }

  // Get error type based on status code
  private getErrorType(status: number): string {
    if (status >= 400 && status < 500) {
      return status === 400 ? 'validation_error' : 'client_error';
    } else if (status >= 500) {
      return 'server_error';
    }
    return 'unknown_error';
  }

  // Get error title based on status code
  private getErrorTitle(status: number): string {
    const titles: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      405: 'Method Not Allowed',
      408: 'Request Timeout',
      409: 'Conflict',
      422: 'Unprocessable Entity',
      429: 'Too Many Requests',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
      504: 'Gateway Timeout',
    };

    return titles[status] || `HTTP Error ${status}`;
  }

  // Parse response data based on content type
  private async parseResponseData(response: Response): Promise<any> {
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      return response.json();
    } else if (contentType?.includes('text/')) {
      return response.text();
    } else if (contentType?.includes('application/octet-stream')) {
      return response.blob();
    } else {
      // Try JSON first, fallback to text
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    }
  }

  // Normalize errors
  private normalizeError(error: any, config: RequestConfig, correlationId?: string): ApiError {
    // If error already has ApiError structure, enhance it
    if (error.type || error.title || error.errors) {
      return Object.assign(
        error instanceof Error ? error : new Error(error.message || 'Unknown error'),
        {
          type: error.type,
          title: error.title,
          status: error.status,
          traceId: error.traceId || correlationId,
          errors: error.errors,
          isAborted: error.isAborted || false,
          config,
        }
      );
    }

    if (error.name === 'AbortError' || error.isAborted) {
      return Object.assign(new Error(error.message || 'Request was aborted'), {
        type: 'request_cancelled',
        title: 'Request was cancelled',
        status: 0,
        traceId: correlationId,
        isAborted: true,
        config,
      } as ApiError);
    }

    if (error.message?.includes('timeout')) {
      return Object.assign(new Error(error.message), {
        type: 'timeout_error',
        title: 'Request Timeout',
        status: 408,
        traceId: correlationId,
        isAborted: true,
        config,
      } as ApiError);
    }

    if (error.message?.includes('network')) {
      return Object.assign(new Error(error.message || 'Network request failed'), {
        type: 'network_error',
        title: 'Network Error',
        status: 0,
        traceId: correlationId,
        isAborted: false,
        config,
      } as ApiError);
    }

    return Object.assign(new Error(error.message || 'An unknown error occurred'), {
      type: 'unknown_error',
      title: 'Unknown Error',
      status: 0,
      traceId: correlationId,
      isAborted: false,
      config,
    } as ApiError);
  }

  // Convenience methods with abort support and overloads for error handling

  // GET method overloads
  get<T = any>(
    endpoint: string,
    config: RequestConfig & { throwErrors: false }
  ): Promise<ApiResponse<T, ApiError>>;
  get<T = any>(
    endpoint: string,
    config?: RequestConfig & { throwErrors?: true }
  ): Promise<ApiResponse<T, ApiError>>;
  get<T = any>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T, ApiError>>;
  get<T = any>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T, ApiError>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  // POST method overloads
  post<T = any>(
    endpoint: string,
    data: any,
    config: RequestConfig & { throwErrors: false }
  ): Promise<ApiResponse<T, ApiError>>;
  post<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig & { throwErrors?: true }
  ): Promise<ApiResponse<T, ApiError>>;
  post<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T, ApiError>>;
  post<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T, ApiError>> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body: data });
  }

  // PUT method overloads
  put<T = any>(
    endpoint: string,
    data: any,
    config: RequestConfig & { throwErrors: false }
  ): Promise<ApiResponse<T, ApiError>>;
  put<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig & { throwErrors?: true }
  ): Promise<ApiResponse<T, ApiError>>;
  put<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T, ApiError>>;
  put<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T, ApiError>> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body: data });
  }

  // PATCH method overloads
  patch<T = any>(
    endpoint: string,
    data: any,
    config: RequestConfig & { throwErrors: false }
  ): Promise<ApiResponse<T, ApiError>>;
  patch<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig & { throwErrors?: true }
  ): Promise<ApiResponse<T, ApiError>>;
  patch<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T, ApiError>>;
  patch<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T, ApiError>> {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body: data });
  }

  // DELETE method overloads
  delete<T = any>(
    endpoint: string,
    config: RequestConfig & { throwErrors: false }
  ): Promise<ApiResponse<T, ApiError>>;
  delete<T = any>(
    endpoint: string,
    config?: RequestConfig & { throwErrors?: true }
  ): Promise<ApiResponse<T, ApiError>>;
  delete<T = any>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T, ApiError>>;
  delete<T = any>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T, ApiError>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  // Filter method overloads
  filter<TListModel, TFilter>(
    url: string,
    data: PostModel<TFilter>,
    config: RequestConfig & { throwErrors: false }
  ): Promise<ApiResponse<ListResponse2<TListModel>, ApiError>>;
  filter<TListModel, TFilter>(
    url: string,
    data: PostModel<TFilter>,
    config?: RequestConfig & { throwErrors?: true }
  ): Promise<ApiResponse<ListResponse2<TListModel>, ApiError>>;
  filter<TListModel, TFilter>(
    url: string,
    data: PostModel<TFilter>,
    config?: RequestConfig
  ): Promise<ApiResponse<ListResponse2<TListModel>, ApiError>>;
  filter<TListModel, TFilter>(
    url: string,
    data: PostModel<TFilter>,
    config?: RequestConfig
  ): Promise<ApiResponse<ListResponse2<TListModel>, ApiError>> {
    // Merge body: { ...postModel, ...postModel.filterModel }
    const mergedData = { ...data, ...data.filterModel };
    return this.request<ListResponse2<TListModel>>(url, {
      ...config,
      method: 'POST',
      body: mergedData,
    });
  }
}
