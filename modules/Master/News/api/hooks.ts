import type { PostModel } from '@gnwebsoft/ui';
import { useQuery } from '@tanstack/react-query';

import { useStableRowCount } from '@core/utils/useStableRowCount';
import { LatestNewsRequest } from '../types';
import { latestNewsQueries } from './query';
import { EntityId } from '@core/hooks/useListView';

export function useLatestNewsQuery(model: PostModel<LatestNewsRequest>, enabled: boolean = true) {
  const { data, isLoading, error } = useQuery({
    ...latestNewsQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}

export function useNewsByIDQuery(id: EntityId | null | undefined, enabled: boolean = true) {
  return useQuery({
    ...latestNewsQueries.Get(id as EntityId),
    enabled: enabled && !!id,
    select: result => result.data,
  });
}
