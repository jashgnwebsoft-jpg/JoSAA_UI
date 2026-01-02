import { useReducer } from 'react';

export type EntityId = string | number;

interface ListViewState {
  detailView: boolean;
  addView: boolean;
  editView: boolean;
  selectedRowId: EntityId | null;
  openFilter: boolean;
  openDelete: boolean;
}

type ListViewAction =
  | { type: 'SHOW_DETAIL_VIEW'; payload: string }
  | { type: 'SHOW_EDIT_VIEW'; payload: string }
  | { type: 'SHOW_ADD_VIEW' }
  | { type: 'CLOSE_ADD_EDIT_VIEW' }
  | { type: 'CLOSE_DETAIL_VIEW' }
  | { type: 'SHOW_FILTER' }
  | { type: 'SET_OPEN_FILTER'; payload: boolean }
  | { type: 'SHOW_DELETE_VIEW'; payload: string }
  | { type: 'CLOSE_DELETE_VIEW' };

const initialState: ListViewState = {
  detailView: false,
  addView: false,
  editView: false,
  selectedRowId: null,
  openFilter: false,
  openDelete: false,
};

function listViewReducer(state: ListViewState, action: ListViewAction): ListViewState {
  switch (action.type) {
    case 'SHOW_DETAIL_VIEW':
      return {
        ...state,
        detailView: true,
        selectedRowId: action.payload,
      };
    case 'SHOW_EDIT_VIEW':
      return {
        ...state,
        editView: true,
        selectedRowId: action.payload,
      };
    case 'SHOW_ADD_VIEW':
      return {
        ...state,
        addView: true,
      };
    case 'CLOSE_ADD_EDIT_VIEW':
      return {
        ...state,
        addView: false,
        editView: false,
        selectedRowId: null,
      };
    case 'CLOSE_DETAIL_VIEW':
      return {
        ...state,
        detailView: false,
        selectedRowId: null,
      };
    case 'SHOW_FILTER':
      return {
        ...state,
        openFilter: true,
      };
    case 'SET_OPEN_FILTER':
      return {
        ...state,
        openFilter: action.payload,
      };
    case 'SHOW_DELETE_VIEW':
      return {
        ...state,
        openDelete: true,
        selectedRowId: action.payload,
      };
    case 'CLOSE_DELETE_VIEW':
      return {
        ...state,
        openDelete: false,
        selectedRowId: null,
      };
    default:
      return state;
  }
}

export default function useListView() {
  const [state, dispatch] = useReducer(listViewReducer, initialState);

  // Action handlers
  const showDetailView = (rowId: string) => {
    dispatch({ type: 'SHOW_DETAIL_VIEW', payload: rowId });
  };

  const showEditView = (rowId: string) => {
    dispatch({ type: 'SHOW_EDIT_VIEW', payload: rowId });
  };

  const showAddView = () => {
    dispatch({ type: 'SHOW_ADD_VIEW' });
  };

  const closeAddEditView = () => {
    dispatch({ type: 'CLOSE_ADD_EDIT_VIEW' });
  };

  const closeDetailView = () => {
    dispatch({ type: 'CLOSE_DETAIL_VIEW' });
  };

  const showFilter = () => {
    dispatch({ type: 'SHOW_FILTER' });
  };

  const setOpenFilter = (open: boolean) => {
    dispatch({ type: 'SET_OPEN_FILTER', payload: open });
  };

  const showDeleteView = (rowId: string) => {
    dispatch({ type: 'SHOW_DELETE_VIEW', payload: rowId });
  };

  const closeDeleteView = () => {
    dispatch({ type: 'CLOSE_DELETE_VIEW' });
  };

  return {
    modal: {
      formView: state.addView || state.editView,
      openFilter: state.openFilter,
      detailView: state.detailView,
      openDelete: state.openDelete,
      showEditView,
      showAddView,
      showDetailView,
      closeDetailView,
      setOpenFilter,
      showFilter,
      closeAddEditView,
      showDeleteView,
      closeDeleteView,
    },
    selectedRowId: state.selectedRowId,
  };
}
