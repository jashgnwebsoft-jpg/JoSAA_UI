import { CONFIG } from '@/global-config';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  AdmissionYearOptions: `${apiBase}/api/Master/AdmissionYear/admissionYearOptions`,
  CurrentYear: `${apiBase}/api/Master/AdmissionYear/currentYear`,
};
