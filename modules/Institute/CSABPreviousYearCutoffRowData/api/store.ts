import { CONFIG } from '@/global-config';
import { calculateFilterCount } from '@core/utils';
import { Institute } from '@core/utils/constants';
import { PostModel } from '@gnwebsoft/ui';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { persist } from 'zustand/middleware';
import {
  CSABBranchWiseCutoffListRequest,
  CSABCollegeWiseCutoffListRequest,
  CSABPreviousYearWiseCutoffListRequest,
} from '../types';
import { create } from 'zustand';

type CSABPreviousYearWiseCutoffListState = {
  filterCount: number;
  postModel: PostModel<CSABPreviousYearWiseCutoffListRequest>;
};

type CSABPreviousYearWiseCutoffListAction = {
  handleFiltering: (filterModel: CSABPreviousYearWiseCutoffListRequest) => void;
  handlePagination: (pageModel: GridPaginationModel) => void;
  handleSorting: (sortModel: GridSortModel) => void;
};

export const useCSABPreviousYearWiseCutoffListStore = create<
  CSABPreviousYearWiseCutoffListState & CSABPreviousYearWiseCutoffListAction
>()(
  persist(
    set => ({
      postModel: {
        pageOffset: 0,
        pageSize: 1000,
        sortField: null,
        sortOrder: null,
      },
      filterCount: 0,
      handleFiltering: (filterModel: CSABPreviousYearWiseCutoffListRequest) =>
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
      name: Institute.CSABPreviousYearWiseCutoffList,
      partialize: state => ({
        postModel: state.postModel,
        filterCount: state.filterCount,
      }),
    }
  )
);

type CSABBranchWiseCutOffListState = {
  filterCount: number;
  postModel: PostModel<CSABBranchWiseCutoffListRequest>;
};

type CSABBranchWiseCutOffListAction = {
  handleFiltering: (filterModel: CSABBranchWiseCutoffListRequest) => void;
  handlePagination: (pageModel: GridPaginationModel) => void;
  handleSorting: (sortModel: GridSortModel) => void;
};

export const useCSABBranchWiseCutOffListStore = create<
  CSABBranchWiseCutOffListState & CSABBranchWiseCutOffListAction
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
      handleFiltering: (filterModel: CSABBranchWiseCutoffListRequest) =>
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
      name: Institute.CSABBranchWiseCutOffList,
      partialize: state => ({
        postModel: state.postModel,
        filterCount: state.filterCount,
      }),
    }
  )
);

type CSABCollegeWiseCutOffListState = {
  filterCount: number;
  postModel: PostModel<CSABCollegeWiseCutoffListRequest>;
};

type CSABCollegeWiseCutOffListAction = {
  handleFiltering: (filterModel: CSABCollegeWiseCutoffListRequest) => void;
  handlePagination: (pageModel: GridPaginationModel) => void;
  handleSorting: (sortModel: GridSortModel) => void;
};

export const useCSABCollegeWiseCutOffListStore = create<
  CSABCollegeWiseCutOffListState & CSABCollegeWiseCutOffListAction
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
      handleFiltering: (filterModel: CSABCollegeWiseCutoffListRequest) =>
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
      name: Institute.CSABCollegeWiseCutOffList,
      partialize: state => ({
        postModel: state.postModel,
        filterCount: state.filterCount,
      }),
    }
  )
);
