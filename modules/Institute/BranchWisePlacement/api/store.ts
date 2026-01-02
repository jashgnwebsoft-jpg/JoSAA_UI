import { PostModel } from '@gnwebsoft/ui';
import { create } from 'zustand';
import { BranchWisePlacementListPageRequest } from '../types';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { persist } from 'zustand/middleware';
import { CONFIG } from '@/global-config';
import { calculateFilterCount } from '@core/utils';
import { Institute } from '@core/utils/constants';

type BranchWisePlacementListState = {
  filterCount: number;
  postModel: PostModel<BranchWisePlacementListPageRequest>;
};

type BranchWisePlacementListAction = {
  handleFiltering: (filterModel: BranchWisePlacementListPageRequest) => void;
  handlePagination: (pageModel: GridPaginationModel) => void;
  handleSorting: (sortModel: GridSortModel) => void;
};

export const useBranchWisePlacementListStore = create<
  BranchWisePlacementListState & BranchWisePlacementListAction
>()(
  persist(
    set => ({
      postModel: {
        pageOffset: 0,
        pageSize: CONFIG.defaultPageSize,
        sortField: null,
        sortOrder: null,
      },
      filterCount: 0,
      handleFiltering: (filterModel: BranchWisePlacementListPageRequest) =>
        set(state => ({
          filterCount: filterModel ? calculateFilterCount(filterModel) : 0,
          postModel: { ...state.postModel, filterModel: { ...filterModel } },
        })),
      handlePagination: (pageModel: GridPaginationModel) =>
        set(state => ({
          postModel: {
            ...state.postModel,
            pageOffset: pageModel.page,
            pageSize: pageModel.pageSize,
          },
        })),
      handleSorting: (sortModel: GridSortModel) =>
        set(state => ({
          postModel: {
            ...state.postModel,
            sortField: sortModel.length > 0 ? sortModel[0].field : null,
            sortOrder: sortModel.length > 0 ? (sortModel[0].sort as 'asc' | 'desc' | null) : null,
            sortModel: sortModel.length > 0 ? sortModel : [],
          },
        })),
    }),
    {
      name: Institute.BranchWisePlacementList,
      partialize: state => ({
        postModel: state.postModel,
        filterCount: state.filterCount,
      }),
    }
  )
);
