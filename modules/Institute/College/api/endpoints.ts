import { CONFIG } from '@/global-config';
import { EntityId } from '@core/hooks/useListView';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  HomeStateList: `${apiBase}/api/Institute/College/homeStateList`,
  CollegeList: `${apiBase}/api/Institute/College/list`,
  CollegeTypeCombo: `${apiBase}/api/Institute/College/collegeType`,
  CollegeCombo: `${apiBase}/api/Institute/College/collegeOption`,
  Get: (id: EntityId) => `${apiBase}/api/Institute/College/${id}`,
  CollegeCompareCollegeDetails: `${apiBase}/api/Institute/College/collegeCompareCollegeDetails`,
  CollegeCompareOptions: `${apiBase}/api/Institute/College/collegeCompareOption`,
};
