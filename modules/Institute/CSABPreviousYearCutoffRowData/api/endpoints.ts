import { CONFIG } from 'src/global-config';

const apiBase = `${CONFIG.apiBaseUrl}`;

export const endpoints = {
  CSABPreviousYearWiseCutoffList: `${apiBase}/api/Institute/CSABPreviousYearCutoffRowData/CSABPreviousYearWiseCutoffList`,
  CSABBranchWiseCutoffList: `${apiBase}/api/Institute/CSABPreviousYearCutoffRowData/CSABBranchWiseCutoffList`,
  CSABCollegeWiseCutoffList: `${apiBase}/api/Institute/CSABPreviousYearCutoffRowData/CSABCollegeWiseCutoffList`,
};
