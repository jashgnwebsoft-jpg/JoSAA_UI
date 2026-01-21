import type { PostModel } from '@gnwebsoft/ui';
import { dataTagSymbol, useQuery } from '@tanstack/react-query';

import { useStableRowCount } from '@core/utils/useStableRowCount';

import type {
  CollegeCompareRequest,
  CollegeListByStateIDListPageRequest,
  CollegeListRequest,
  HomeStateListPageRequest,
} from '../types';
import { collegeCompareQueries, collegeQueries, homestateQueries } from './query';
import { EntityId } from '@core/hooks/useListView';

export function useHomeStateListQuery(
  model: PostModel<HomeStateListPageRequest>,
  enabled: boolean = true
) {
  const { data, isLoading, error } = useQuery({
    ...homestateQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}

export function useCollegeListQuery(model: PostModel<CollegeListRequest>, enabled: boolean = true) {
  const { data, isLoading, error } = useQuery({
    ...collegeQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}

export function useCollegeTypeOptions(enabled: boolean = true) {
  return useQuery({
    ...homestateQueries.Options(),
    enabled: true,
    select: data => data.data,
  });
}

export function useCollegeOptions(enabled: boolean = true) {
  return useQuery({
    ...collegeQueries.Options(),
    enabled,
    select: data => data.data,
  });
}

export function useGetQuery(id: EntityId | string | null | undefined, enabled: boolean = true) {
  return useQuery({
    ...collegeQueries.Get(id!),
    select: result => result.data,
    enabled: !!id && enabled,
  });
}

export function useCollegeCompareCollegeOptionsQuery(enabled: boolean = true) {
  return useQuery({
    ...collegeCompareQueries.CollegeCompareOptions(),
    select: result => result.data,
    enabled: enabled,
  });
}

export function useCollegeCompareCollegeDetailsQuery(
  model: CollegeCompareRequest,
  enabled: boolean = true
) {
  const { data, isLoading, error, isSuccess } = useQuery({
    ...collegeCompareQueries.CollegeCompareCollegeDetails(model),
    select: result => result?.data,
    enabled,
  });

  return { data: data, isLoading, error, isSuccess };
}

export function useCollegeListByStateIDQuery(
  model: PostModel<CollegeListByStateIDListPageRequest>,
  enabled: boolean = true
) {
  const { data, isLoading, error } = useQuery({
    ...collegeQueries.ListByStateID(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}

export function useCollegeCompareForPlacementByCollegeIDQuery(
  id: EntityId | string | null | undefined,
  enabled: boolean = true
) {
  return useQuery({
    ...collegeCompareQueries.CollegeCompareForPlacementByCollegeID(id!),
    select: result => result.data,
    enabled: !!id && enabled,
  });
}

export function useCollgeCardListQuery(enabled: boolean = true) {
  return useQuery({
    ...collegeQueries.CollegeCardList(),
    select: result => result.data,
    enabled,
  });
}
