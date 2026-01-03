import { PostModel } from '@gnwebsoft/ui';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  CSABBranchWiseCutoffListRequest,
  CSABBranchWiseCutoffListResponse,
  CSABCollegeWiseCutoffListRequest,
  CSABCollegeWiseCutoffListResponse,
  CSABPreviousYearWiseCutoffListRequest,
  CSABPreviousYearWiseCutoffListResponse,
} from '../types';
import { endpoints } from './endpoints';
import { getGlobalApiClient } from '@core/api/createApiClient';

const apiClient = getGlobalApiClient();

export const CSABPreviousYearWiseCutoffQueries = createQueryKeys('CSABPreviousYearWiseCutoff', {
  List: (postModel: PostModel<CSABPreviousYearWiseCutoffListRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<
        CSABPreviousYearWiseCutoffListResponse,
        CSABPreviousYearWiseCutoffListRequest
      >(endpoints.CSABPreviousYearWiseCutoffList!, postModel, {
        throwErrors: false,
      }),
  }),
});

export const CSABBranchWiseCutoffQueries = createQueryKeys('CSABBranchWiseCutoff', {
  List: (postModel: PostModel<CSABBranchWiseCutoffListRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<CSABBranchWiseCutoffListResponse, CSABBranchWiseCutoffListRequest>(
        endpoints.CSABBranchWiseCutoffList!,
        postModel,
        {
          throwErrors: false,
        }
      ),
  }),
});

export const CSABCollegeWiseCutoffQueries = createQueryKeys('CSABCollegeWiseCutoff', {
  List: (postModel: PostModel<CSABCollegeWiseCutoffListRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<CSABCollegeWiseCutoffListResponse, CSABCollegeWiseCutoffListRequest>(
        endpoints.CSABCollegeWiseCutoffList!,
        postModel,
        {
          throwErrors: false,
        }
      ),
  }),
});
