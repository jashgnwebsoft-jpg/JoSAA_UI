import { CONFIG } from '@/global-config';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  SelectAutoComplete: `${apiBase}/api/Institute/College/collegeSearchList`,
};
