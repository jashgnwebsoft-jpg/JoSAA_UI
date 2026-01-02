import { CONFIG } from '@/global-config';
import { EntityId } from '@core/hooks/useListView';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  BranchWisePlacementList: `${apiBase}/api/Institute/BranchWisePlacement/branchWisePlacementList`,
  BranchWisePlacementByCollegeIDOption: (id: EntityId) =>
    `${apiBase}/api/Institute/BranchWisePlacement/branchWisePlacementByCollegeIDOption/${id}`,
};
