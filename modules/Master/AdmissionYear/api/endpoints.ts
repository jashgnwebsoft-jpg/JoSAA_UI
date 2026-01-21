import { CONFIG } from '@/global-config';
import { EntityId } from '@core/hooks/useListView';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  AdmissionYearOptions: `${apiBase}/api/Master/AdmissionYear/admissionYearOptions`,
  CSABAdmissionYearOptions: `${apiBase}/api/Master/AdmissionYear/CSABAdmissionYearOptions`,
  CurrentYear: `${apiBase}/api/Master/AdmissionYear/currentYear`,
  BranchWisePlcementYearByCollegeID: (id: EntityId) =>
    `${apiBase}/api/Master/AdmissionYear/branchWisePlacementAdmissionYearOptionsByCollegeID/${id}`,
};
