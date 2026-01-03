import { useQuery } from '@tanstack/react-query';
import { CSABRoundQueries, roundQueries } from './query';

export function useRoundOptions(id: string, enabled: boolean = true) {
  return useQuery({
    ...roundQueries.Options(id),
    enabled,
    select: result => result.data,
  });
}

export function useCSABRoundOptions(id: string, enabled: boolean = true) {
  return useQuery({
    ...CSABRoundQueries.Options(id),
    enabled,
    select: result => result.data,
  });
}
