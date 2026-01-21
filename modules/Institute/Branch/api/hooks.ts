import type { PostModel } from '@gnwebsoft/ui';
import { useQuery } from '@tanstack/react-query';

import { useStableRowCount } from '@core/utils/useStableRowCount';
import {
  BranchListRequest,
  SystemBranchWiseCollegeListRequest,
  MotherBranchListRequest,
  BranchWiseCollegeListRequest,
  CollegeComparePreviousYearsOpenCloseRankFormateListResponse,
  CollegeComparePreviousYearsOpenCloseRankListResponse,
} from '../types';
import {
  branchQueries,
  systemBranchWiseCollegeQueries,
  collegeWiseBranchOptionQueries,
  motherbranchQueries,
  branchWiseCollegeQueries,
  collegeComparePreviousYearsOpenCloseRankListQueries,
  motherBranchInformationQueries,
  branchInformationQueries,
} from './query';
import { EntityId } from '@core/hooks/useListView';
import { CollegeCompareRequest } from '@modules/Institute/College/types';
import React from 'react';

export function useBranchListQuery(model: PostModel<BranchListRequest>, enabled: boolean = true) {
  const { data, isLoading, error } = useQuery({
    ...branchQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}

export function useMotherBranchListQuery(
  model: PostModel<MotherBranchListRequest>,
  enabled: boolean = true
) {
  const { data, isLoading, error } = useQuery({
    ...motherbranchQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}

export function useSystemBranchWiseCollegeListQuery(
  model: PostModel<SystemBranchWiseCollegeListRequest>,
  enabled: boolean = true
) {
  const { data, isLoading, error } = useQuery({
    ...systemBranchWiseCollegeQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}

export function useSelectBranchByCollegeIDQuery(
  id: EntityId | null | undefined,
  enabled: boolean = true
) {
  return useQuery({
    ...collegeWiseBranchOptionQueries.SelectBranchByCollegeID(id!),
    enabled,
    select: result => result.data,
  });
}

export function useBranchWiseCollegeListQuery(
  model: PostModel<BranchWiseCollegeListRequest>,
  enabled: boolean = true
) {
  const { data, isLoading, error } = useQuery({
    ...branchWiseCollegeQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}

export function useCollegeComparePreviousYearsOpenCloseRankListQuery(
  model: CollegeCompareRequest,
  enabled: boolean
) {
  const { data, isLoading, error, isSuccess } = useQuery({
    ...collegeComparePreviousYearsOpenCloseRankListQueries.List(model),
    select: result => result?.data ?? [],
    enabled,
  });

  const transformedData: CollegeComparePreviousYearsOpenCloseRankFormateListResponse[] =
    Object.values(
      (data ?? []).reduce<
        Record<string, CollegeComparePreviousYearsOpenCloseRankFormateListResponse>
      >((acc, item) => {
        const key = `${item.BranchAdmissionCode}-${item.BranchProperName}`;

        if (!acc[key]) {
          acc[key] = {
            BranchAdmissionCode: item.BranchAdmissionCode,
            BranchProperName: item.BranchProperName,
            PreviousYearOpenClose: [],
          };
        }

        acc[key].PreviousYearOpenClose.push({
          CutoffID: item.CutoffID,
          CategoryName: item.CategoryName,
          ReservationType: item.ReservationType,
          RoundNumber: item.RoundNumber,
          OpenRank: item.OpenRank,
          ClosingRank: item.ClosingRank,
        });

        return acc;
      }, {})
    );

  return {
    data: transformedData,
    isLoading,
    error,
    isSuccess,
  };
}

export function useMotherBranchInformationQuery(
  id: EntityId | null | undefined,
  enabled: boolean = true
) {
  return useQuery({
    ...motherBranchInformationQueries.MotherBranchInformation(id!),
    enabled,
    select: result => result.data,
  });
}

export function useBranchInformationQuery(
  id: EntityId | null | undefined,
  enabled: boolean = true
) {
  return useQuery({
    ...branchInformationQueries.BranchInformation(id!),
    enabled,
    select: result => result.data,
  });
}
