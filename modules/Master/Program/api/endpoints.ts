import { CONFIG } from '@/global-config';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  Options: (id: number) => `${apiBase}/api/Master/Program/options/${id}`,
};
