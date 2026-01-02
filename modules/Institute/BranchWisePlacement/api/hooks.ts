import { PostModel } from '@gnwebsoft/ui';
import { useQuery } from '@tanstack/react-query';
import { BranchWisePlacementListPageRequest } from '../types';
import { branchWisePlacementQueries } from './query';
import { useStableRowCount } from '@core/utils/useStableRowCount';
import { EntityId } from '@core/hooks/useListView';

export function useBranchWisePlacementListQuery(
  model: PostModel<BranchWisePlacementListPageRequest>,
  enabled: boolean = true
) {
  const { data, isLoading, error } = useQuery({
    ...branchWisePlacementQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}

export function useBranchWisePlacementByCollegeIDQuery(
  id: EntityId | string | null | undefined,
  enabled: boolean = true
) {
  return useQuery({
    ...branchWisePlacementQueries.BranchWisePlacementByCollegeIDOption(id!),
    select: result => result.data,
    enabled: enabled,
  });
}
