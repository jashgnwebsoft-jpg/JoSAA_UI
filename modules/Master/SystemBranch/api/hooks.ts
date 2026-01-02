import { useQuery } from '@tanstack/react-query';
import { systemBranchQueries } from './query';

export function useSystemBranchOptions(enabled: boolean = true) {
  return useQuery({
    ...systemBranchQueries.Options(),
    enabled,
    select: result => result.data,
  });
}
