import { CONFIG } from '@/global-config';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  Options: `${apiBase}/api/Master/SystemBranch/options`,
};
