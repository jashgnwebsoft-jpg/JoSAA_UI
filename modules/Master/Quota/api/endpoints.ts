import { CONFIG } from '@/global-config';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  Options: (id: string) => `${apiBase}/api/Master/Quota/options/${id}`,
};
