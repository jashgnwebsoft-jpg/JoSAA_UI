import { useQuery } from '@tanstack/react-query';
import { categoryQueries } from './hooks';

export function useCategoryOptions(enabled: boolean = true) {
  return useQuery({
    ...categoryQueries.Options(),
    enabled,
    select: result => result.data,
  });
}
