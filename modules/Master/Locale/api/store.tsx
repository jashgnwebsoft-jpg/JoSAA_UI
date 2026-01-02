import type { PostModel } from '@gnwebsoft/ui';

import { create } from 'zustand';

import type { FilterModel } from '../types';

type State = {
  postModel: PostModel<FilterModel>;
};

export interface LocaleStore {
  handleFiltering: (filterModel: FilterModel) => void;

  tabValue: number;
  setTabValue: (tabValue: number) => void;

  openFormDrawer: boolean;
  setOpenFormDrawer: (openFormDrawer: boolean) => void;
}

export const useLocaleStore = create<State & LocaleStore>()(set => ({
  postModel: {
    pageOffset: 0,
    pageSize: 10,
    sortField: null,
    sortOrder: null,
    filterModel: {
      Language: 'en',
    },
  },
  handleFiltering: (filterModel: FilterModel) =>
    set(state => ({
      postModel: { ...state.postModel, filterModel: { ...filterModel } },
    })),

  tabValue: 0,
  setTabValue: (tabValue: number) => set({ tabValue }),

  openFormDrawer: false,
  setOpenFormDrawer: (openFormDrawer: boolean) => set({ openFormDrawer }),
}));
