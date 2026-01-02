import { getGlobalApiClient } from '@core/api/createApiClient';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { AdmissionStepListResponse } from '../types';
import { endpoints } from './endpoints';

const apiClient = getGlobalApiClient();

export const admissionStepQueries = createQueryKeys('admissionStep', {
  Get: () => ({
    queryKey: ['admissionStep'],
    queryFn: () => apiClient.get<AdmissionStepListResponse[]>(endpoints.AdmissionStepList),
  }),
});
