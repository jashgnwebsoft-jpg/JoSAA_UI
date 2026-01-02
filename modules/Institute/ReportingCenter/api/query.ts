import type { PostModel } from '@gnwebsoft/ui';
import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getGlobalApiClient } from '@core/api/createApiClient';

import type { ReportingCenterListRequest, ReportingCenterListResponse } from '../types';

import { endpoints } from './endpoints';

const apiClient = getGlobalApiClient();

export const reportingCenterQueries = createQueryKeys('reportingCenter', {
  List: (postModel: PostModel<ReportingCenterListRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<ReportingCenterListResponse, ReportingCenterListRequest>(endpoints.List!, postModel, {
        throwErrors: false,
      }),
  }),
});
