import { useRef, useMemo } from 'react';

/**
 * Hook to maintain stable row count for data grids during loading states.
 * Prevents pagination jumping by preserving the last known total count.
 *
 * @param currentTotal - Current total from API response
 * @returns Stable row count that persists during loading
 */
export function useStableRowCount(currentTotal: number | undefined): number {
  const rowCountRef = useRef(currentTotal || 0);

  const stableRowCount = useMemo(() => {
    if (currentTotal !== undefined) {
      rowCountRef.current = currentTotal;
    }
    return rowCountRef.current;
  }, [currentTotal]);

  return stableRowCount;
}
