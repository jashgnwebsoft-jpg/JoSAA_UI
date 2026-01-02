import { CONFIG } from '@/global-config';
import { EntityId } from '@core/hooks/useListView';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  FeesMoreDeatils: (id: EntityId) => `${apiBase}/api/Institute/Fees/feesMoreDetails/${id}`,
};
