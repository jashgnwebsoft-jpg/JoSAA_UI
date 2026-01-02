import { z } from 'zod';

export const FeesMoreDeatilsSchema = z.object();

export type FeesMoreDeatilsRequest = z.infer<typeof FeesMoreDeatilsSchema>;

export type FeesMoreDeatilsResponse = {
  FeesID: string;
  FeesHeadTitle: string | null;
  HeadWiseFees: number | null;
  YearWiseTotalFees: number | null;
  SemesterWiseTotalFees: number | null;
  isAnnualFees: boolean | null;
};
