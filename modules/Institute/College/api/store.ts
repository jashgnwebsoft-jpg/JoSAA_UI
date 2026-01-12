import type { PostModel } from '@gnwebsoft/ui';
import type { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CONFIG } from '@/global-config';
import { calculateFilterCount } from '@core/utils';
import type {
  CollegeCompareCollegeDetailsResponse,
  CollegeCompareRequest,
  CollegeListRequest,
  HomeStateListPageRequest,
} from '../types';
import { Institute } from '@core/utils/constants';
import { CollegeComparePreviousYearsOpenCloseRankFormateListResponse } from '@modules/Institute/Branch/types';

type HomeStateListState = {
  filterCount: number;
  postModel: PostModel<HomeStateListPageRequest>;
};

type HomeStateListAction = {
  handleFiltering: (filterModel: HomeStateListPageRequest) => void;
  handlePagination: (pageModel: GridPaginationModel) => void;
  handleSorting: (sortModel: GridSortModel) => void;
};

export const useHomeStateListStore = create<HomeStateListState & HomeStateListAction>()(
  persist(
    set => ({
      postModel: {
        pageOffset: 0,
        pageSize: CONFIG.defaultPageSize,
        sortField: null,
        sortOrder: null,
      },
      filterCount: 0,
      handleFiltering: (filterModel: HomeStateListPageRequest) =>
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
      name: Institute.HomeStateList,
      partialize: state => ({
        postModel: state.postModel,
        filterCount: state.filterCount,
      }),
    }
  )
);

type CollegeListState = {
  filterCount: number;
  postModel: PostModel<CollegeListRequest>;
};

type CollegeListAction = {
  handleFiltering: (filterModel: CollegeListRequest) => void;
  handlePagination: (pageModel: GridPaginationModel) => void;
  handleSorting: (sortModel: GridSortModel) => void;
};

export const useCollegeListStore = create<CollegeListState & CollegeListAction>()(
  persist(
    set => ({
      postModel: {
        pageOffset: 0,
        pageSize: CONFIG.defaultPageSize,
        sortField: null,
        sortOrder: null,
      },
      filterCount: 0,
      handleFiltering: (filterModel: CollegeListRequest) =>
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
      name: Institute.CollegeList,
      partialize: state => ({
        postModel: state.postModel,
        filterCount: state.filterCount,
      }),
    }
  )
);

type CollegeCompareState = {
  open: boolean;
  activeIndex: number | null;
  requests: (CollegeCompareRequest | null)[];
  saveCollegeDetailsData: (CollegeCompareCollegeDetailsResponse | null)[];
  saveCollegeRankData: (CollegeComparePreviousYearsOpenCloseRankFormateListResponse[] | null)[];
};

type CollegeCompareAction = {
  openDialog: (index: number) => void;
  closeDialog: () => void;
  saveRequest: (
    requestData: CollegeCompareRequest,
    detailsData: CollegeCompareCollegeDetailsResponse,
    rankData: CollegeComparePreviousYearsOpenCloseRankFormateListResponse[]
  ) => void;
  removeDataRequest: (index: number) => void;
};

export const useCollegeCompareStore = create<CollegeCompareState & CollegeCompareAction>()(
  persist(
    (set, get) => ({
      open: false,
      activeIndex: null,
      requests: [null, null, null, null],
      saveCollegeDetailsData: [null, null, null, null],
      saveCollegeRankData: [null, null, null, null],

      openDialog: index => {
        set({
          open: true,
          activeIndex: index,
        });
      },

      closeDialog: () =>
        set({
          open: false,
          activeIndex: null,
        }),

      saveRequest: (requestData, detailsData, rankData) => {
        const { activeIndex, requests, saveCollegeDetailsData, saveCollegeRankData } = get();
        if (activeIndex === null) return;

        const copy = [...requests];
        copy[activeIndex] = requestData;

        const copyDetailsData = [...saveCollegeDetailsData];
        copyDetailsData[activeIndex] = detailsData;

        const copyRankData = [...saveCollegeRankData];
        copyRankData[activeIndex] = rankData;

        set({
          requests: copy,
          open: false,
          activeIndex: null,
          saveCollegeDetailsData: copyDetailsData,
          saveCollegeRankData: copyRankData,
        });
      },

      removeDataRequest: index => {
        const { saveCollegeDetailsData, saveCollegeRankData, requests } = get();

        const copy = [...requests];
        copy[index] = null;

        const copyDetailsData = [...saveCollegeDetailsData];
        copyDetailsData[index] = null;

        const copyRankData = [...saveCollegeRankData];
        copyRankData[index] = null;

        set({
          requests: copy,
          saveCollegeDetailsData: copyDetailsData,
          saveCollegeRankData: copyRankData,
        });
      },
    }),
    {
      name: Institute.CollegeCompare,
      partialize: state => ({
        requests: state.requests,
        saveCollegeDetailsData: state.saveCollegeDetailsData,
        saveCollegeRankData: state.saveCollegeRankData,
      }),
    }
  )
);
