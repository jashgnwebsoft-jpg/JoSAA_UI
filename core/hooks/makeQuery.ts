import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

type MakeQueryConfig<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey'> & {
  queryKey: TQueryKey;
};

// Overloads
export function useMakeQuery<
  TQueryFnData,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>(
  config: MakeQueryConfig<TQueryFnData, TError, TData, TQueryKey>,
  opts?: { selectDataOnly?: false }
): UseQueryResult<TData, TError>;

export function useMakeQuery<
  TQueryFnData,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>(
  config: MakeQueryConfig<TQueryFnData, TError, TData, TQueryKey>,
  opts: { selectDataOnly: true }
): TData | undefined;

// Implementation
export function useMakeQuery<
  TQueryFnData,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>(
  config: MakeQueryConfig<TQueryFnData, TError, TData, TQueryKey>,
  opts?: { selectDataOnly?: boolean }
): UseQueryResult<TData, TError> | TData | undefined {
  const result = useQuery<TQueryFnData, TError, TData, TQueryKey>(config);
  return opts?.selectDataOnly ? result.data : result;
}
