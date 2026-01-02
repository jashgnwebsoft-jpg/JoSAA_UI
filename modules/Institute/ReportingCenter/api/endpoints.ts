import { CONFIG } from '@/global-config';
import { EntityId } from '@core/hooks/useListView';

const apiBase = CONFIG.apiBaseUrl;

export const endpoints = {
  List: `${apiBase}/api/Institute/ReportingCenter/reportingCenterList`,
};
