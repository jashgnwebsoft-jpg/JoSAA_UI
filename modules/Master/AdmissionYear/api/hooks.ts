import { useQuery } from '@tanstack/react-query';
import {
  admissionYearQueries,
  branchWisePlcementAdmissionYearByCollegeIDQueries,
  CSABAdmissionYearQueries,
  currentYaerQueries,
} from './query';
import { EntityId } from '@core/hooks/useListView';

export function useAdmissionOptions(enabled: boolean = true) {
  return useQuery({
    ...admissionYearQueries.Options(),
    enabled,
    select: result => result.data,
  });
}

export function useCurrentYearQuery(enabled: boolean = true) {
  return useQuery({
    ...currentYaerQueries.Get(),
    enabled,
    select: result => result.data,
  });
}

export function useCSABAdmissionOptions(enabled: boolean = true) {
  return useQuery({
    ...CSABAdmissionYearQueries.Options(),
    enabled,
    select: result => result.data,
  });
}

export function useBranchWisePlacementAdmissionYearOptionsByCollegeID(
  id: EntityId,
  enabled: boolean = true
) {
  return useQuery({
    ...branchWisePlcementAdmissionYearByCollegeIDQueries.Options(id),
    enabled,
    select: result => result.data,
  });
}
