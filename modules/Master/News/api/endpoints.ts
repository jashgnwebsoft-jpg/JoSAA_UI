import { CONFIG } from '@/global-config';
import { EntityId } from '@core/hooks/useListView';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  News: `${apiBase}/api/Master/News/list`,
  NewsByID: (id: EntityId) => `${apiBase}/api/Master/News/newsByID/${id}`,
};
