import type { PostModel } from '@gnwebsoft/ui';
import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getGlobalApiClient } from '@core/api/createApiClient';

import type {
  CollegeCardListResponse,
  CollegeCompareCollegeDetailsResponse,
  CollegeCompareForPlacementByCollegeIDResponse,
  CollegeCompareRequest,
  CollegeDetailsResponse,
  CollegeListByStateIDListPageRequest,
  CollegeListByStateIDListPageResponse,
  CollegeListRequest,
  CollegeListResponse,
  HomeStateListPageRequest,
  HomeStateListPageResponse,
} from '../types';

import { endpoints } from './endpoints';
import { OptionsResponse } from '@core/models';
import { EntityId } from '@core/hooks/useListView';

const apiClient = getGlobalApiClient();

export const homestateQueries = createQueryKeys('homestate', {
  List: (postModel: PostModel<HomeStateListPageRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<CollegeListResponse, HomeStateListPageRequest>(
        endpoints.HomeStateList!,
        postModel,
        {
          throwErrors: false,
        }
      ),
  }),
  Options: () => ({
    queryKey: ['Options'],
    queryFn: () => apiClient.get<OptionsResponse[]>(endpoints.CollegeTypeCombo!),
  }),
});

export const collegeQueries = createQueryKeys('college', {
  List: (postModel: PostModel<CollegeListRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<CollegeListResponse, CollegeListRequest>(endpoints.CollegeList!, postModel, {
        throwErrors: false,
      }),
  }),

  CollegeCardList: () => ({
    queryKey: ['collegeCardList'],
    queryFn: () => apiClient.get<CollegeCardListResponse[]>(endpoints.CollegeCardList),
  }),

  ListByStateID: (postModel: PostModel<CollegeListByStateIDListPageRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<CollegeListResponse, CollegeListByStateIDListPageRequest>(
        endpoints.CollegeListByStateID!,
        postModel,
        {
          throwErrors: false,
        }
      ),
  }),

  Get: (id: EntityId) => ({
    queryKey: [id],
    queryFn: () => apiClient.get<CollegeDetailsResponse>(endpoints.Get!(id)),
  }),

  Options: () => ({
    queryKey: ['Options'],
    queryFn: () => apiClient.get<OptionsResponse[]>(endpoints.CollegeCombo!),
  }),
});

export const collegeCompareQueries = createQueryKeys('collegeCompare', {
  CollegeCompareCollegeDetails: (postModel: CollegeCompareRequest) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.post<CollegeCompareCollegeDetailsResponse>(
        endpoints.CollegeCompareCollegeDetails!,
        postModel,
        {
          throwErrors: false,
        }
      ),
  }),

  CollegeCompareOptions: () => ({
    queryKey: ['collegeCompareCollegeDetails'],
    queryFn: () => apiClient.get<OptionsResponse[]>(endpoints.CollegeCompareOptions),
  }),

  CollegeCompareForPlacementByCollegeID: (id: EntityId) => ({
    queryKey: [id],
    queryFn: () =>
      apiClient.get<CollegeCompareForPlacementByCollegeIDResponse[]>(
        endpoints.CollegeCompareForPlacementByCollegeID!(id)
      ),
  }),
});
