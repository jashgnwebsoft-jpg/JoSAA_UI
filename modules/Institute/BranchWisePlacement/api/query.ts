import { getGlobalApiClient } from '@core/api/createApiClient';
import { PostModel } from '@gnwebsoft/ui';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { BranchWisePlacementListPageRequest, BranchWisePlacementListPageResponse } from '../types';
import { endpoints } from './endpoints';
import { EntityId } from '@core/hooks/useListView';
import { OptionsResponse } from '@core/models';

const apiClient = getGlobalApiClient();

export const branchWisePlacementQueries = createQueryKeys('branchWisePlacement', {
  List: (postModel: PostModel<BranchWisePlacementListPageRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      apiClient.filter<BranchWisePlacementListPageResponse, BranchWisePlacementListPageRequest>(
        endpoints.BranchWisePlacementList!,
        postModel,
        {
          throwErrors: false,
        }
      ),
  }),

  BranchWisePlacementByCollegeIDOption: (id: EntityId) => ({
    queryKey: [id],
    queryFn: () =>
      apiClient.get<OptionsResponse[]>(endpoints.BranchWisePlacementByCollegeIDOption!(id)),
  }),
});
