import { z } from 'zod';

export const AdmissionStepListSchema = z.object({});

export type AdmissionStepListRequest = z.infer<typeof AdmissionStepListSchema>;

export type AdmissionStepListResponse = {
  AdmissionStepID: string;
  AdmissionStepTitle: string;
  AdmissionStepHTML: string;
};
