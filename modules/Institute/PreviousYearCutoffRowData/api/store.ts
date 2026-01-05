import { PostModel } from '@gnwebsoft/ui';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CONFIG } from '@/global-config';
import { calculateFilterCount } from '@core/utils';
import {
  BranchWiseCutoffListRequest,
  CollegeWiseCutoffListRequest,
  CurrentYearWiseCutoffListRequest,
  MeritRankCutOffRequest,
  PreviousYearWiseCutoffListRequest,
  RoundWiseChartRequest,
} from '../types';
import { Institute } from '@core/utils/constants';

type CurrentYearWiseCutoffListState = {
  filterCount: number;
  postModel: PostModel<CurrentYearWiseCutoffListRequest>;
};

type CurrentYearWiseCutoffListAction = {
  handleFiltering: (filterModel: CurrentYearWiseCutoffListRequest) => void;
  handlePagination: (pageModel: GridPaginationModel) => void;
  handleSorting: (sortModel: GridSortModel) => void;
};

export const useCurrentYearWiseCutoffListStore = create<
  CurrentYearWiseCutoffListState & CurrentYearWiseCutoffListAction
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
      handleFiltering: (filterModel: CurrentYearWiseCutoffListRequest) =>
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
      name: Institute.CurrentYearWiseCutoffList,
      partialize: state => ({
        postModel: state.postModel,
        filterCount: state.filterCount,
      }),
    }
  )
);

type PreviousYearWiseCutoffListState = {
  filterCount: number;
  postModel: PostModel<PreviousYearWiseCutoffListRequest>;
};

type PreviousYearWiseCutoffListAction = {
  handleFiltering: (filterModel: PreviousYearWiseCutoffListRequest) => void;
  handlePagination: (pageModel: GridPaginationModel) => void;
  handleSorting: (sortModel: GridSortModel) => void;
};

export const usePreviousYearWiseCutoffListStore = create<
  PreviousYearWiseCutoffListState & PreviousYearWiseCutoffListAction
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
      handleFiltering: (filterModel: PreviousYearWiseCutoffListRequest) =>
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
      name: Institute.PreviousYearWiseCutoffList,
      partialize: state => ({
        postModel: state.postModel,
        filterCount: state.filterCount,
      }),
    }
  )
);

type RoundWiseChartState = {
  filterCount: number;
  postModel: RoundWiseChartRequest;
};

type RoundWiseChartAction = {
  handleFiltering: (filterModel: RoundWiseChartRequest) => void;
};

export const useRoundWiseChartStore = create<RoundWiseChartState & RoundWiseChartAction>()(
  persist(
    set => ({
      postModel: {},
      filterCount: 0,
      handleFiltering: (filterModel: RoundWiseChartRequest) =>
        set(state => ({
          filterCount: filterModel ? calculateFilterCount(filterModel) : 0,
          postModel: { ...state.postModel, ...filterModel },
        })),
    }),
    {
      name: Institute.RoundWiseChart,
      partialize: state => ({
        postModel: state.postModel,
        filterCount: state.filterCount,
      }),
    }
  )
);

type MeritRankWiseCutOffListState = {
  filterCount: number;
  postModel: PostModel<MeritRankCutOffRequest>;
};

type MeritRankWiseCutOffListAction = {
  handleFiltering: (filterModel: MeritRankCutOffRequest) => void;
  handlePagination: (pageModel: GridPaginationModel) => void;
  handleSorting: (sortModel: GridSortModel) => void;
};

export const useMeritRankWiseCutOffListStore = create<
  MeritRankWiseCutOffListState & MeritRankWiseCutOffListAction
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
      handleFiltering: (filterModel: MeritRankCutOffRequest) =>
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
      name: Institute.MeritRankWiseCutOffList,
      partialize: state => ({
        postModel: state.postModel,
        filterCount: state.filterCount,
      }),
    }
  )
);

type BranchWiseCutOffListState = {
  filterCount: number;
  postModel: PostModel<BranchWiseCutoffListRequest>;
};

type BranchWiseCutOffListAction = {
  handleFiltering: (filterModel: BranchWiseCutoffListRequest) => void;
  handlePagination: (pageModel: GridPaginationModel) => void;
  handleSorting: (sortModel: GridSortModel) => void;
};

export const useBranchWiseCutOffListStore = create<
  BranchWiseCutOffListState & BranchWiseCutOffListAction
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
      handleFiltering: (filterModel: BranchWiseCutoffListRequest) =>
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
      name: Institute.BranchWiseCutOffList,
      partialize: state => ({
        postModel: state.postModel,
        filterCount: state.filterCount,
      }),
    }
  )
);

type CollegeWiseCutOffListState = {
  filterCount: number;
  postModel: PostModel<CollegeWiseCutoffListRequest>;
};

type CollegeWiseCutOffListAction = {
  handleFiltering: (filterModel: CollegeWiseCutoffListRequest) => void;
  handlePagination: (pageModel: GridPaginationModel) => void;
  handleSorting: (sortModel: GridSortModel) => void;
};

export const useCollegeWiseCutOffListStore = create<
  CollegeWiseCutOffListState & CollegeWiseCutOffListAction
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
      handleFiltering: (filterModel: CollegeWiseCutoffListRequest) =>
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
      name: Institute.CollegeWiseCutOffList,
      partialize: state => ({
        postModel: state.postModel,
        filterCount: state.filterCount,
      }),
    }
  )
);
