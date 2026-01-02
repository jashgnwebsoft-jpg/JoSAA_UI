import { CONFIG } from '@/global-config';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  AdmissionStepList: `${apiBase}/api/Master/AdmissionStep/admissionStepList`,
};
