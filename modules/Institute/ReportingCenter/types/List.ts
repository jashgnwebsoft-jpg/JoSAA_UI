import { z } from 'zod';

export const ReportingCenterListSchema = z.object({
  CollegeTypeID: z.string().nullish(),
});

export type ReportingCenterListRequest = z.infer<typeof ReportingCenterListSchema>;

export type ReportingCenterListResponse = {
  ReportingCentreID: string;
  CollegeAdmissionCode: number;
  ReportingCentreName: string;
  CollegeName: string;
  Address: string | null;
  Phone: string | null;
  Fax: string | null;
  Website: string | null;
  CollegeID: string | null;
};
