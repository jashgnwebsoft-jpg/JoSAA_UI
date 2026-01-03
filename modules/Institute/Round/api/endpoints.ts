import { CONFIG } from '@/global-config';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  CSABOptions: (id: string) => `${apiBase}/api/Institute/Round/CSABOptions/${id}`,
  Options: (id: string) => `${apiBase}/api/Institute/Round/options/${id}`,
};
