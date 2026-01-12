import { useQuery } from '@tanstack/react-query';
import { programQueries } from './query';
import { EntityId } from '@core/hooks/useListView';

export function useProgarmOptions(id: EntityId, enabled: boolean = true) {
  return useQuery({
    ...programQueries.Options(id),
    enabled: enabled,
    select: result => result.data,
  });
}
