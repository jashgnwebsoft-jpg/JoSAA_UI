import type { PostModel } from '@gnwebsoft/ui';
import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getGlobalApiClient } from '@core/api/createApiClient';

import { endpoints } from './endpoints';
import {
  BranchListRequest,
  BranchListResponse,
  SystemBranchWiseCollegeistResponse,
  SystemBranchWiseCollegeListRequest,
  CollegeWiseBranchOptionsResponse,
  MotherBranchListRequest,
  MotherBranchListResponse,
  BranchWiseCollegeListRequest,
  BranchWiseCollegeistResponse,
  CollegeComparePreviousYearsOpenCloseRankListResponse,
  MotherBranchInformation,
  BranchInformation,
} from '../types';
import { EntityId } from '@core/hooks/useListView';
import { CollegeCompareRequest, CollegeListResponse } from '@modules/Institute/College/types';

const apiClient = getGlobalApiClient();

export const branchQueries = createQueryKeys('branch', {
  List: (postModel: PostModel<BranchListRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<BranchListResponse, BranchListRequest>(endpoints.BranchList!, postModel, {
        throwErrors: false,
      }),
  }),
});

export const motherbranchQueries = createQueryKeys('motherbranch', {
  List: (postModel: PostModel<MotherBranchListRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<MotherBranchListResponse, MotherBranchListRequest>(
        endpoints.MotherBranchList!,
        postModel,
        {
          throwErrors: false,
        }
      ),
  }),
});

export const systemBranchWiseCollegeQueries = createQueryKeys('systemBranchWiseCollege', {
  List: (postModel: PostModel<SystemBranchWiseCollegeListRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<CollegeListResponse, SystemBranchWiseCollegeListRequest>(
        endpoints.SystemBranchWiseCollegeList!,
        postModel,
        {
          throwErrors: false,
        }
      ),
  }),
});

export const collegeWiseBranchOptionQueries = createQueryKeys('collegeWiseBranchOption', {
  SelectBranchByCollegeID: (id: EntityId) => ({
    queryKey: [id],
    queryFn: () =>
      apiClient.get<CollegeWiseBranchOptionsResponse[]>(endpoints.CollegeWiseBranchOptions!(id)),
  }),
});

export const branchWiseCollegeQueries = createQueryKeys('branchWiseCollege', {
  List: (postModel: PostModel<BranchWiseCollegeListRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<CollegeListResponse, BranchWiseCollegeListRequest>(
        endpoints.BranchWiseCollegeList!,
        postModel,
        {
          throwErrors: false,
        }
      ),
  }),
});

export const collegeComparePreviousYearsOpenCloseRankListQueries = createQueryKeys(
  'collegeComparePreviousYearsOpenCloseRankList',
  {
    List: (postModel: CollegeCompareRequest) => ({
      queryKey: [postModel],
      queryFn: () =>
        apiClient.post<CollegeComparePreviousYearsOpenCloseRankListResponse[]>(
          endpoints.CollegeComparePreviousYearsOpenCloseRankList!,
          postModel,
          {
            throwErrors: false,
          }
        ),
    }),
  }
);

export const motherBranchInformationQueries = createQueryKeys('motherBranchInformation', {
  MotherBranchInformation: (id: EntityId) => ({
    queryKey: [id],
    queryFn: () => apiClient.get<MotherBranchInformation>(endpoints.MotherBranchInformation!(id)),
  }),
});

export const branchInformationQueries = createQueryKeys('branchInformation', {
  BranchInformation: (id: EntityId) => ({
    queryKey: [id],
    queryFn: () => apiClient.get<BranchInformation>(endpoints.BranchInformation!(id)),
  }),
});
