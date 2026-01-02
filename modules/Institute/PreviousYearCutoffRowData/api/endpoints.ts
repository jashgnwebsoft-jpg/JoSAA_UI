import { CONFIG } from 'src/global-config';

const apiBase = `${CONFIG.apiBaseUrl}`;

export const endpoints = {
  CurrentYearWiseCutoffList: `${apiBase}/api/Institute/PreviousYearCutoffRowData/currentYearWiseCutoffList`,
  PreviousYearWiseCutoffList: `${apiBase}/api/Institute/PreviousYearCutoffRowData/previousYearWiseCutoffList`,
  RoundWiseChart: `${apiBase}/api/Institute/PreviousYearCutoffRowData/roundWiseChart`,
  MeritRankWiseCutoffList: `${apiBase}/api/Institute/PreviousYearCutoffRowData/meritRankWiseCutoffList`,
  BranchWiseCutoffList: `${apiBase}/api/Institute/PreviousYearCutoffRowData/branchWiseCutoffList`,
  CollegeWiseCutoffList: `${apiBase}/api/Institute/PreviousYearCutoffRowData/collegeWiseCutoffList`,
};
