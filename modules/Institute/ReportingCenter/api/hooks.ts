import type { PostModel } from '@gnwebsoft/ui';
import { useQuery } from '@tanstack/react-query';

import { useStableRowCount } from '@core/utils/useStableRowCount';

import type { ReportingCenterListRequest } from '../types';
import { reportingCenterQueries } from './query';

export function useReportingCenterListQuery(
  model: PostModel<ReportingCenterListRequest>,
  enabled: boolean = true
) {
  const { data, isLoading, error } = useQuery({
    ...reportingCenterQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}
