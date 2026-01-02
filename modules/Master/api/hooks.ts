import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getGlobalApiClient } from '@core/api/createApiClient';
import { OptionsResponse } from '@core/models';

import { endpoints } from './endpoints';

const apiClient = getGlobalApiClient();

export const categoryQueries = createQueryKeys('category', {
  Options: () => ({
    queryKey: ['Options'],
    queryFn: () => apiClient.get<OptionsResponse[]>(endpoints.Options!),
  }),
});
