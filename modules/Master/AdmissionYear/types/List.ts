import { z } from 'zod';

export const CurrentYearSchema = z.object({});

export type CurrentYearRequest = z.infer<typeof CurrentYearSchema>;

export type CurrentYearResponse = {
  AdmissionYearID: string;
  RoundID: string | null;
  AdmissionYear: number | null;
  RoundNumber: number | null;
};
