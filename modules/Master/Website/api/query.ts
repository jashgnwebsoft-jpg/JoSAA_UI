import { PostModel } from '@gnwebsoft/ui';
import type { ListRequest, ListResponse } from '../types';

import { getGlobalApiClient } from '@core/api/createApiClient';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { endpoints } from './endpoints';

const apiClient = getGlobalApiClient();

export const websiteQueries = createQueryKeys('website', {
  List: (postModel: PostModel<ListRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<ListResponse, ListRequest>(endpoints.List!, postModel, {
        throwErrors: false,
      }),
  }),
});
