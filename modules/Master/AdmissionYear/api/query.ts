import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getGlobalApiClient } from '@core/api/createApiClient';
import { OptionsResponse } from '@core/models';

import { endpoints } from './endpoints';
import { CurrentYearResponse } from '../types';

const apiClient = getGlobalApiClient();

export const admissionYearQueries = createQueryKeys('admissionYear', {
  Options: () => ({
    queryKey: ['admissionYear'],
    queryFn: () => apiClient.get<OptionsResponse[]>(endpoints.AdmissionYearOptions!),
  }),
});

export const currentYaerQueries = createQueryKeys('currentYear', {
  Get: () => ({
    queryKey: ['currentYear'],
    queryFn: () => apiClient.get<CurrentYearResponse>(endpoints.CurrentYear),
  }),
});

export const CSABAdmissionYearQueries = createQueryKeys('CSABAdmissionYear', {
  Options: () => ({
    queryKey: ['CSABAdmissionYear'],
    queryFn: () => apiClient.get<OptionsResponse[]>(endpoints.CSABAdmissionYearOptions!),
  }),
});
