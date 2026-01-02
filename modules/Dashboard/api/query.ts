import { api, AsyncSelectPayload, ValueLabel } from '@gnwebsoft/ui';
import { endpoints } from './endpoints';

export const useCollegeAsyncQuery = async (payload: AsyncSelectPayload) => {
  const response = await api.post<ValueLabel[]>(endpoints.SelectAutoComplete, { ...payload });
  return response.apiData;
};
