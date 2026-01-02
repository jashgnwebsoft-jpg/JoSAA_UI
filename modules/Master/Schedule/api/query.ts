import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getGlobalApiClient } from '@core/api/createApiClient';

import { endpoints } from './endpoints';
import { KeyDateResponse } from '../types';

const apiClient = getGlobalApiClient();

export const keyDateQueries = createQueryKeys('keyDate', {
  Get: () => ({
    queryKey: ['keyDate'],
    queryFn: () => apiClient.get<KeyDateResponse[]>(endpoints.KeyDate),
  }),
});
