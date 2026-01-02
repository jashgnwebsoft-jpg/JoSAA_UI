import { EntityId } from '@core/hooks/useListView';
import { useQuery } from '@tanstack/react-query';
import { feesQueries } from './query';

export function useFeesQuery(id: EntityId | string | null | undefined, enabled: boolean = true) {
  return useQuery({
    ...feesQueries.Get(id!),
    select: result => result.data,
    enabled: !!id && enabled,
  });
}
