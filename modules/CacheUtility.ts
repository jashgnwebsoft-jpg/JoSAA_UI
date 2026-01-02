import { QueryClient, QueryKey, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

// Minimal type-safe cache utility for query key factories
export class CacheUtility {
  constructor(private queryClient: QueryClient) {}

  /**
   * Get cached data using only the queryKey from query factory
   */
  getCachedData<T>(queryKey: QueryKey): T | undefined {
    return this.queryClient.getQueryData<T>(queryKey);
  }

  /**
   * Get cached data with transformation using select function
   */
  getCachedDataWithSelect<T, R>(queryKey: QueryKey, select: (data: T) => R): R | undefined {
    const cachedData = this.queryClient.getQueryData<T>(queryKey);

    if (cachedData === undefined) {
      return undefined;
    }

    return select(cachedData);
  }
}

export function useCacheUtility(): CacheUtility {
  const queryClient = useQueryClient();
  return useMemo(() => new CacheUtility(queryClient), [queryClient]);
}
