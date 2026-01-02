import { PostModel } from '@gnwebsoft/ui';
import { useQuery } from '@tanstack/react-query';
import { useStableRowCount } from '@core/utils/useStableRowCount';
import {
  branchWiseCutoffQueries,
  collegeWiseCutoffQueries,
  currentYearWiseCutoffQueries,
  meritRankWiseCutoffQueries,
  previousYearWiseCutoffQueries,
  RoundWiseChartQueries,
} from './query';
import {
  CurrentYearWiseCutoffRow,
  CurrentYearWiseCutoffListRequest,
  PreviousYearWiseCutoffListRequest,
  PreviousYearWiseCutoffRow,
  RoundWiseChartRequest,
  MeritRankCutOffRequest,
  BranchWiseCutoffListRequest,
  CollegeWiseCutoffListRequest,
  PivotRow,
  PreviousYearWiseCutoffListResponse,
} from '../types';
import { toast } from 'sonner';
import { GridColDef } from '@mui/x-data-grid';

export function useCurrentYearWiseCutoffListQuery(
  model: PostModel<CurrentYearWiseCutoffListRequest>,
  enabled: boolean
) {
  const { data, isLoading, error } = useQuery({
    ...currentYearWiseCutoffQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  const currentYearWiseCutoffData = data?.Data ?? [];
  const grouped: Record<string, CurrentYearWiseCutoffRow> = {};

  currentYearWiseCutoffData.forEach(item => {
    const [year, round] = item.RoundTitle.split('-');
    const roundNumber = round.replace('R', '');
    const field = `Round ${roundNumber}`;

    if (!grouped[item.BranchCode]) {
      grouped[item.BranchCode] = {
        BranchCode: item.BranchCode,
        BranchName: item.BranchName,
      };
    }

    grouped[item.BranchCode][field] = item.ClosingRank;
  });

  return {
    data: Object.values(grouped),
    isLoading,
    error,
    totalRecords: Object.values(grouped).length,
  };
}

export function usePreviousYearWiseCutoffListQuery(
  model: PostModel<PreviousYearWiseCutoffListRequest>,
  enabled: boolean
) {
  const { data, isLoading, error } = useQuery({
    ...previousYearWiseCutoffQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  const previousYearWiseCutoffData = data?.Data ?? [];
  const grouped: Record<string, PreviousYearWiseCutoffRow> = {};

  previousYearWiseCutoffData.forEach(item => {
    const year = item.AdmissionYear;
    const roundNumber = item.RoundTitle.split('R')[1];
    if (!grouped[year]) {
      grouped[year] = {
        id: year,
        AdmissionYear: year,
      };
    }
    grouped[year][`Round ${roundNumber}`] = item.ClosingRank;
  });

  return {
    data: Object.values(grouped) ?? [],
    isLoading,
    error,
    totalRecords: Object.values(grouped).length,
  };
}

export function usePreviousYearWiseCutoffListModifiedQuery(
  model: PostModel<PreviousYearWiseCutoffListRequest>,
  enabled: boolean
) {
  const { data, isLoading, error } = useQuery({
    ...previousYearWiseCutoffQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const list = data?.Data ?? [];

  const rounds: string[] = Array.from(
    new Set(list.map((item: PreviousYearWiseCutoffListResponse) => item.RoundTitle))
  );

  const rows: PivotRow[] = Object.values(
    list.reduce<Record<string, PivotRow>>((acc, curr) => {
      const key = `${curr.BranchName}-${curr.ReservationType}`;

      if (!acc[key]) {
        acc[key] = {
          id: key,
          BranchName: curr.BranchName,
          ReservationType: curr.ReservationType,
        };
      }

      acc[key][curr.RoundTitle] = curr.ClosingRank !== null ? curr.ClosingRank : '-';
      return acc;
    }, {})
  );

  // 👉 DataGrid columns
  const columns: GridColDef[] = [
    { field: 'BranchName', headerName: 'Branch Name', flex: 1 },
    { field: 'ReservationType', headerName: 'Reservation Type', flex: 1 },
    ...rounds.map<GridColDef>(round => ({
      field: round,
      headerName: round,
      width: 120,
      type: 'number',
    })),
  ];

  const rowCount = useStableRowCount(data?.Total);

  return {
    rows,
    columns,
    isLoading,
    error,
    totalRecords: rowCount,
  };
}

export function useRoundWiseChartQuery(model: RoundWiseChartRequest, enabled: boolean) {
  return useQuery({
    ...RoundWiseChartQueries.RoundWiseChart(model),
    select: result => result?.data,
    enabled,
  });
}

export function useMeritRankWiseCutOffQuery(
  model: PostModel<MeritRankCutOffRequest>,
  enabled: boolean
) {
  const { data, isLoading, error } = useQuery({
    ...meritRankWiseCutoffQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}

export function useBranchWiseCutOffQuery(
  model: PostModel<BranchWiseCutoffListRequest>,
  enabled: boolean
) {
  const { data, isLoading, error } = useQuery({
    ...branchWiseCutoffQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}

export function useCollegeRankWiseCutOffQuery(
  model: PostModel<CollegeWiseCutoffListRequest>,
  enabled: boolean
) {
  const { data, isLoading, error } = useQuery({
    ...collegeWiseCutoffQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}
