import { useQuery } from '@tanstack/react-query';
import { quotaQueries } from './query';

export function useQuotaOptions(id: string, enabled: boolean = true) {
  return useQuery({
    ...quotaQueries.Options(id),
    enabled,
    select: result => result.data,
  });
}
