import { getGlobalApiClient } from '@core/api/createApiClient';
import { EntityId } from '@core/hooks/useListView';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { FeesMoreDeatilsResponse } from '../types/List';
import { endpoints } from './endpoints';

const apiClient = getGlobalApiClient();

export const feesQueries = createQueryKeys('fees', {
  Get: (id: EntityId) => ({
    queryKey: [id],
    queryFn: () => apiClient.get<FeesMoreDeatilsResponse[]>(endpoints.FeesMoreDeatils!(id)),
  }),
});
