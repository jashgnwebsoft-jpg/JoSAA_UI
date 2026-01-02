import { CONFIG } from 'src/global-config';

const apiBase = `${CONFIG.apiBaseUrl}`;

export const endpoints = {
  List: `${apiBase}/api/Institute/IntakeCutoff/list`,
};
