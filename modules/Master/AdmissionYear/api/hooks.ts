import { useQuery } from '@tanstack/react-query';
import { admissionYearQueries, currentYaerQueries } from './query';

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
