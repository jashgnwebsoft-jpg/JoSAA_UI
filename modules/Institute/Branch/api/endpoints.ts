import { CONFIG } from '@/global-config';
import { EntityId } from '@core/hooks/useListView';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  BranchList: `${apiBase}/api/Institute/Branch/branchList`,
  MotherBranchList: `${apiBase}/api/Institute/Branch/motherBranchList`,
  SystemBranchWiseCollegeList: `${apiBase}/api/Institute/Branch/systemBranchWiseCollegeList`,
  BranchWiseCollegeList: `${apiBase}/api/Institute/Branch/branchWiseCollegeList`,
  CollegeComparePreviousYearsOpenCloseRankList: `${apiBase}/api/Institute/Branch/collegeComparePreviousYearsOpenCloseRankList`,
  CollegeWiseBranchOptions: (id: EntityId) =>
    `${apiBase}/api/Institute/Branch/collegeWiseBranchOptions/${id}`,
};
