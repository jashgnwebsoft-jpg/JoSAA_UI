import { PostModel } from '@gnwebsoft/ui';
import {
  CSABBranchWiseCutoffListRequest,
  CSABCollegeWiseCutoffListRequest,
  CSABPreviousYearWiseCutoffListRequest,
  CSABPreviousYearWiseCutoffListResponse,
  PivotRow,
} from '../types';
import { useQuery } from '@tanstack/react-query';
import { GridColDef } from '@mui/x-data-grid';
import { useStableRowCount } from '@core/utils/useStableRowCount';
import {
  CSABBranchWiseCutoffQueries,
  CSABCollegeWiseCutoffQueries,
  CSABPreviousYearWiseCutoffQueries,
} from './query';
import { fNumber } from '@core/utils/format-number';
import React from 'react';
import { Typography } from '@mui/material';
import { Label } from '@minimal/components/label';

export function useCSABPreviousYearWiseCutoffListQuery(
  model: PostModel<CSABPreviousYearWiseCutoffListRequest>,
  enabled: boolean
) {
  const { data, isLoading, error } = useQuery({
    ...CSABPreviousYearWiseCutoffQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const list = data?.Data ?? [];

  const rounds: string[] = Array.from(
    new Set(list.map((item: CSABPreviousYearWiseCutoffListResponse) => item.RoundTitle))
  ).sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' }));

  const rows: PivotRow[] = Object.values(
    list.reduce<Record<string, PivotRow>>((acc, curr) => {
      const key = `${curr.BranchProperName}-${curr.ReservationType}`;
      if (!acc[key]) {
        acc[key] = {
          id: key,
          BranchName: curr.BranchProperName,
          ReservationType: curr.ReservationType,
        };
      }
      acc[key][curr.RoundTitle] = curr.CloseRank !== null ? curr.CloseRank : '-';
      return acc;
    }, {})
  );

  const roundColumns: GridColDef[] = rounds.map<GridColDef>(round => ({
    field: round,
    headerName: round,
    minWidth: 110,
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    renderCell: params =>
      params.value !== null && params.value !== undefined ? fNumber(params.value) : '-',
  }));

  const columns: GridColDef[] = [
    ...roundColumns,
    {
      field: 'BranchName',
      headerName: 'Branch Name',
      minWidth: 110,
      flex: 2,
    },
    {
      field: 'ReservationType',
      headerName: 'Reservation Type',
      minWidth: 110,
      flex: 1,
      renderCell: params => {
        const type = params.row.ReservationType;

        if (!type) {
          return React.createElement(Typography, { variant: 'subtitle1', pl: 0.5 }, 'Total');
        }

        const isGenderNeutral = type === 'Gender-Neutral';

        return React.createElement(
          Label,
          {
            color: isGenderNeutral ? 'primary' : 'warning',
            variant: 'soft',
          },
          isGenderNeutral ? type : 'Female-Only'
        );
      },
    },
  ];

  const rowCount = useStableRowCount(rows?.length);

  return {
    rows,
    columns,
    isLoading,
    error,
    totalRecords: rowCount,
  };
}

export function useCSABBranchWiseCutOffQuery(
  model: PostModel<CSABBranchWiseCutoffListRequest>,
  enabled: boolean
) {
  const { data, isLoading, error, isSuccess } = useQuery({
    ...CSABBranchWiseCutoffQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount, isSuccess };
}

export function useCSABCollegeRankWiseCutOffQuery(
  model: PostModel<CSABCollegeWiseCutoffListRequest>,
  enabled: boolean
) {
  const { data, isLoading, error, isSuccess } = useQuery({
    ...CSABCollegeWiseCutoffQueries.List(model),
    select: result => result?.data,
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount, isSuccess };
}
