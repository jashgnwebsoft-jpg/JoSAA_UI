import { PostModel } from '@gnwebsoft/ui';
import { ListRequest } from '../types';
import { useQuery } from '@tanstack/react-query';
import { useStableRowCount } from '@core/utils/useStableRowCount';
import { documentQueries } from './query';

export function useListQuery(model: PostModel<ListRequest>, enabled: boolean = true) {
  const { data, isLoading, error } = useQuery({
    ...documentQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}
