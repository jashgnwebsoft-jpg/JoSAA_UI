import { PostModel } from '@gnwebsoft/ui';
import type { IntakeCutoffListRequest, IntakeCutoffListResponse } from '../types';

import { getGlobalApiClient } from '@core/api/createApiClient';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { endpoints } from './endpoints';

const apiClient = getGlobalApiClient();

export const intakeCutoffQueries = createQueryKeys('intakeCutoff', {
  List: (postModel: PostModel<IntakeCutoffListRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<IntakeCutoffListResponse, IntakeCutoffListRequest>(endpoints.List!, postModel, {
        throwErrors: false,
      }),
  }),
});
