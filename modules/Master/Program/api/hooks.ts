import { useQuery } from '@tanstack/react-query';
import { programQueries } from './query';

export function useProgarmOptions(id: number, enabled: boolean = true) {
  return useQuery({
    ...programQueries.Options(id),
    enabled: enabled,
    select: result => result.data,
  });
}
