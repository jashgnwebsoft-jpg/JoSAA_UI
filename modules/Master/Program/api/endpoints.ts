import { CONFIG } from '@/global-config';
import { EntityId } from '@core/hooks/useListView';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  Options: (id: EntityId) => `${apiBase}/api/Master/Program/options/${id}`,
};
