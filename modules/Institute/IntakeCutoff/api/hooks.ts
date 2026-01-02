import { PostModel } from '@gnwebsoft/ui';
import { IntakeCutoffListRequest } from '../types';
import { useQuery } from '@tanstack/react-query';
import { useStableRowCount } from '@core/utils/useStableRowCount';
import { intakeCutoffQueries } from './query';

export function useListQuery(model: PostModel<IntakeCutoffListRequest>, enabled: boolean) {
  const { data, isLoading, error } = useQuery({
    ...intakeCutoffQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}
