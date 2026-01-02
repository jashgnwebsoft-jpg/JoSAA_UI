import type { PostModel } from '@gnwebsoft/ui';

import { useQuery } from '@tanstack/react-query';

import { LocaleQueries } from './query';

import type { FilterModel } from '../types';

export function useListQuery(model: PostModel<FilterModel>) {
  return useQuery({
    ...LocaleQueries.list(model),
    select: data => data.apiData,
  });
}

export function useTLanguageOptions(tLanguage: string) {
  const {
    data: tLanguages,
    isFetching: isTLanguageFetching,
    error: tLanguageError,
  } = useQuery({
    ...LocaleQueries.TLanguageOptions(tLanguage),
    select: data => data.apiData,
  });
  return { tLanguages, isTLanguageFetching, tLanguageError };
}
