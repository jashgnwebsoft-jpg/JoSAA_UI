export const pageSizeOptions = [10, 20, 50, 100];
export const defaultPageSizeOptions = [10, 20, 50, 100, 500, 1000, 2000];
export const defaultPageSize = 20;
export const PendingVerificationStatusPK = 1;

export const rupees = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const withOutCurrencyIconRupees = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Dashboard
export const FilterValue = 'FilterValue';

//#region Toast Msg.
export const getSaveSuccessMessage = (id: string | null | undefined): string =>
  `Record ${id ? 'updated' : 'inserted'} successfully`;

export const getDeleteSuccessMessage = `Record deleted successfully`;

export const getUpdateSuccessMessage = `Record updated successfully`;

export const getEmailSentSuccessMessage = `Email Sent Successfully`;

export const getUpdatePasswordSuccessMessage = `Password Successfully Updated`;

export const getDeleteErrorMessage = 'Record could not be deleted';

export const settingSaveMessage = (entity?: string): string =>
  `${entity || 'Settings'} saved successfully`;

export const settingErrorMessage = (entity?: string): string =>
  `Failed to save ${entity?.toLowerCase() || 'settings'}. Please try again.`;

//#endregion

export const Institute = {
  BranchList: 'BranchList',
  MotherBranchList: ' MotherBranchList',
  SystemBranchWiseCollegeList: 'SystemBranchWiseCollegeList',
  BranchWiseCollegeList: 'BranchWiseCollegeList',
  HomeStateList: 'HomeStateList',
  CollegeList: 'CollegeList',
  IntakeCutoffList: 'IntakeCutoffList',
  CurrentYearWiseCutoffList: 'CurrentYearWiseCutoffList',
  PreviousYearWiseCutoffList: 'PreviousYearWiseCutoffList',
  RoundWiseChart: 'RoundWiseChart',
  MeritRankWiseCutOffList: 'MeritRankWiseCutOffList',
  BranchWiseCutOffList: 'BranchWiseCutOffList',
  CollegeWiseCutOffList: 'CollegeWiseCutOffList',
  ReportingCenterList: 'ReportingCenterList',
  BranchWisePlacementList: 'BranchWisePlacementList',
  CollegeCompare: 'CollegeCompare',
  CSABPreviousYearWiseCutoffList: 'CSABPreviousYearWiseCutoffList',
  CSABBranchWiseCutOffList: 'CSABBranchWiseCutOffList',
  CSABCollegeWiseCutOffList: 'CSABCollegeWiseCutOffList',
};

export const Master = {
  DocumentList: 'DocumentList',
  LatestNewsList: 'LatestNewsList',
  WebsiteList: 'WebsiteList',
};
