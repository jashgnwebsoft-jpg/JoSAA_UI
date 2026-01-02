import type { PostModel } from '@gnwebsoft/ui';
import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getGlobalApiClient } from '@core/api/createApiClient';

import { endpoints } from './endpoints';
import { LatestNewsRequest, LatestNewsResponse, NewsByIDResponse } from '../types';
import { EntityId } from '@core/hooks/useListView';

const apiClient = getGlobalApiClient();

export const latestNewsQueries = createQueryKeys('latestNews', {
  List: (postModel: PostModel<LatestNewsRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<LatestNewsResponse, LatestNewsRequest>(endpoints.News!, postModel, {
        throwErrors: false,
      }),
  }),

  Get: (id: EntityId) => ({
    queryKey: [id],
    queryFn: () => apiClient.get<NewsByIDResponse>(endpoints.NewsByID!(id)),
  }),
});
