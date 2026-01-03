import { getGlobalApiClient } from '@core/api/createApiClient';
import { OptionsResponse } from '@core/models';
import { endpoints } from './endpoints';
import { createQueryKeys } from '@lukemorales/query-key-factory';

const apiClient = getGlobalApiClient();

export const roundQueries = createQueryKeys('round', {
  Options: (id: string) => ({
    queryKey: ['Options'],
    queryFn: () => apiClient.get<OptionsResponse[]>(endpoints.Options(id!)),
  }),
});

export const CSABRoundQueries = createQueryKeys('CSABRound', {
  Options: (id: string) => ({
    queryKey: ['Options', id],
    queryFn: () => {
      return apiClient.get<OptionsResponse[]>(endpoints.CSABOptions(id));
    },
  }),
});
