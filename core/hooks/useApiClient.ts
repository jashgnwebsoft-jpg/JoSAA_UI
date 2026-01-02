import { useMemo } from 'react';

import { createApiClient } from '@core/api/createApiClient';
import type { ApiClientConfig } from '@core/api/createApiClient';

export function useApiClient(config: ApiClientConfig = {}) {
  return useMemo(() => {
    return createApiClient(config);
  }, [
    config.baseURL,
    config.timeout,
    config.correlationIdPrefix,
    config.includeCorrelationId,
    config.authToken,
    config.requestInterceptors,
    config.responseInterceptors,
    config.errorInterceptors,
  ]);
}
