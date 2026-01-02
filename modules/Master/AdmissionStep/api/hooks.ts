import { useQuery } from '@tanstack/react-query';
import { admissionStepQueries } from './query';

export function useSelectAdmissionStepQuery(enabled: boolean = true) {
  return useQuery({
    ...admissionStepQueries.Get(),
    enabled,
    select: result => result.data,
  });
}
