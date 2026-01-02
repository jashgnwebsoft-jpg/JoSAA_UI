import { CONFIG } from '@/global-config';

import { ApiClient } from './ApiClient';
import type { ErrorInterceptor } from './types/ErrorInterceptor';
import type { RequestInterceptor } from './types/RequestInterceptor';
import type { ResponseInterceptor } from './types/ResponseInterceptor';

export interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  correlationIdPrefix?: string;
  includeCorrelationId?: boolean;
  authToken?: string | null;
  requestInterceptors?: RequestInterceptor[];
  responseInterceptors?: ResponseInterceptor[];
  errorInterceptors?: ErrorInterceptor[];
}

let globalApiClient: ApiClient | null = null;

export function createApiClient(config: ApiClientConfig = {}): ApiClient {
  const {
    baseURL = CONFIG.apiBaseUrl,
    timeout = 30000,
    correlationIdPrefix = 'api',
    includeCorrelationId = true,
    // authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJnaXZlbl9uYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiZW1haWxcIjpcImFkbWluQGxvY2FsaG9zdC5jb21cIixcIlJvbGVJZFwiOlwiMVwiLFwiUm9sZVwiOlwiU3VwZXJBZG1pblwiLFwicGF0aFwiOlwiL2FkbWlucGFuZWxcIixcImRpc3BsYXlOYW1lXCI6XCJTdXBlciBBZG1pblwifSIsImV4cCI6MTc1NzY1NjI5NywiaXNzIjoiaHR0cHM6Ly93d3cuZ253ZWJzb2Z0LmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5nbndlYnNvZnQuY29tLyJ9.-ON_UKDdHKuFUcZF4n0QLsirUOKuz3lWvbEC-5trnLA',
    requestInterceptors = [],
    responseInterceptors = [],
    errorInterceptors = [],
  } = config;

  const client = new ApiClient(baseURL, timeout);

  client.addRequestInterceptor(config => {
    const token = localStorage.getItem('serviceToken');
    if (token && !config.skipAuthRefresh) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  });

  // Configure correlation ID
  client.setCorrelationIdPrefix(correlationIdPrefix);
  client.setIncludeCorrelationId(includeCorrelationId);

  // // Set auth token if provided
  // if (authToken !== undefined) {
  //   client.setAuthToken(authToken);
  // }

  // Add interceptors
  requestInterceptors.forEach(interceptor => {
    client.addRequestInterceptor(interceptor);
  });

  responseInterceptors.forEach(interceptor => {
    client.addResponseInterceptor(interceptor);
  });

  errorInterceptors.forEach(interceptor => {
    client.addErrorInterceptor(interceptor);
  });

  return client;
}

export function getGlobalApiClient(config?: ApiClientConfig): ApiClient {
  if (!globalApiClient) {
    globalApiClient = createApiClient(config);
  }
  return globalApiClient;
}

export function setGlobalApiClient(client: ApiClient): void {
  globalApiClient = client;
}

export function resetGlobalApiClient(): void {
  globalApiClient = null;
}
