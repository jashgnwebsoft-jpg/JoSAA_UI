import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getGlobalApiClient } from '@core/api/createApiClient';
import { OptionsResponse } from '@core/models';

import { endpoints } from './endpoints';

const apiClient = getGlobalApiClient();

export const programQueries = createQueryKeys('program', {
  Options: (id: number) => ({
    queryKey: ['Options', id],
    queryFn: () => apiClient.get<OptionsResponse[]>(endpoints.Options(id!)),
  }),
});
