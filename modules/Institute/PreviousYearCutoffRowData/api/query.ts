import { PostModel } from '@gnwebsoft/ui';

import { getGlobalApiClient } from '@core/api/createApiClient';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { endpoints } from './endpoints';
import {
  BranchWiseCutoffListRequest,
  BranchWiseCutoffListResponse,
  CollegeWiseCutoffListRequest,
  CollegeWiseCutoffListResponse,
  CurrentYearWiseCutoffListRequest,
  CurrentYearWiseCutoffListResponse,
  MeritRankCutOffRequest as MeritRankWiseCutOffRequest,
  MeritRankCutOffResponse as MeritRankWiseCutOffResponse,
  PreviousYearWiseCutoffListRequest,
  PreviousYearWiseCutoffListResponse,
  RoundWiseChartRequest,
} from '../types';

const apiClient = getGlobalApiClient();

export const currentYearWiseCutoffQueries = createQueryKeys('currentYearWiseCutoff', {
  List: (postModel: PostModel<CurrentYearWiseCutoffListRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<CurrentYearWiseCutoffListResponse, CurrentYearWiseCutoffListRequest>(
        endpoints.CurrentYearWiseCutoffList!,
        postModel,
        {
          throwErrors: false,
        }
      ),
  }),
});

export const previousYearWiseCutoffQueries = createQueryKeys('previousYearWiseCutoff', {
  List: (postModel: PostModel<PreviousYearWiseCutoffListRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<PreviousYearWiseCutoffListResponse, PreviousYearWiseCutoffListRequest>(
        endpoints.PreviousYearWiseCutoffList!,
        postModel,
        {
          throwErrors: false,
        }
      ),
  }),
});

export const RoundWiseChartQueries = createQueryKeys('RoundWiseChart', {
  RoundWiseChart: (postModel: RoundWiseChartRequest) => ({
    queryKey: [postModel],
    queryFn: () => apiClient.post(endpoints.RoundWiseChart!, postModel),
  }),
});

export const meritRankWiseCutoffQueries = createQueryKeys('meritRankWiseCutoff', {
  List: (postModel: PostModel<MeritRankWiseCutOffRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<MeritRankWiseCutOffResponse, MeritRankWiseCutOffRequest>(
        endpoints.MeritRankWiseCutoffList!,
        postModel,
        {
          throwErrors: true,
        }
      ),
  }),
});

export const branchWiseCutoffQueries = createQueryKeys('branchWiseCutoff', {
  List: (postModel: PostModel<BranchWiseCutoffListRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<BranchWiseCutoffListResponse, BranchWiseCutoffListRequest>(
        endpoints.BranchWiseCutoffList!,
        postModel,
        {
          throwErrors: false,
        }
      ),
  }),
});

export const collegeWiseCutoffQueries = createQueryKeys('collegeWiseCutoff', {
  List: (postModel: PostModel<CollegeWiseCutoffListRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<CollegeWiseCutoffListResponse, CollegeWiseCutoffListRequest>(
        endpoints.CollegeWiseCutoffList!,
        postModel,
        {
          throwErrors: false,
        }
      ),
  }),
});
