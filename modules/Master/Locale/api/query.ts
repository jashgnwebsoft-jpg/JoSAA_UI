import type { PostModel, ValueLabel } from '@gnwebsoft/ui';

import { api } from '@gnwebsoft/ui';
import { createQueryKeys } from '@lukemorales/query-key-factory';

import { endpoints } from './endpoints';

import type { FilterModel, ListDisplay } from '../types';

export const LocaleQueries = createQueryKeys('Locale', {
  list: (postModel: PostModel<FilterModel>) => ({
    queryKey: [postModel],
    queryFn: () => api.filter<ListDisplay, FilterModel>(endpoints.list!, postModel),
  }),

  TLanguageOptions: (tLanguage: string) => ({
    queryKey: ['TLanguageOptions'],
    queryFn: () => api.get<ValueLabel[]>(endpoints.TLanguageOptions(tLanguage)),
  }),
});
