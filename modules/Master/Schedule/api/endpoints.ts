import { CONFIG } from '@/global-config';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  KeyDate: `${apiBase}/api/Master/Schedule/list`,
};
