import { z } from 'zod';

export const MotherBranchListSchema = z.object({});

export type MotherBranchListRequest = z.infer<typeof MotherBranchListSchema>;

export type MotherBranchListResponse = {
  SystemBranchID: string;
  SystemBranchProperName: string;
  Intake: number | null;
  Colleges: number | null;
  SystemBranchName: string;
  SystemBranchCode: string;
};

export const SystemBranchWiseCollegeListSchema = z.object({
  SystemBranchID: z.string().nullish(),
  CollegeTypeID: z.string().nullish(),
});

export type SystemBranchWiseCollegeListRequest = z.infer<typeof SystemBranchWiseCollegeListSchema>;

export type SystemBranchWiseCollegeistResponse = {
  CollegeID: string;
  CollegeShortName: string | null;
  CollegeAdmissionCode: number | null;
  StateName: string | null;
  City: string | null;
};

export const CollegeWiseBranchOptionstSchema = z.object({
  CollegeID: z.string().nullish(),
});

export type CollegeWiseBranchOptionstRequest = z.infer<typeof CollegeWiseBranchOptionstSchema>;

export type CollegeWiseBranchOptionsResponse = {
  Value: string;
  Label: string;
};

export const BranchListSchema = z.object({});

export type BranchListRequest = z.infer<typeof BranchListSchema>;

export type BranchListResponse = {
  BranchID: string;
  SystemBranchID: string;
  BranchAdmissionCode: string;
  BranchWebName: string;
  BranchProperName: string;
  SystemBranchProperName: string;
  SystemBranchName: string;
  Intake: number | null;
  Colleges: number | null;
};

export const BranchWiseCollegeListSchema = z.object({
  BranchID: z.string().nullish(),
  CollegeTypeID: z.string().nullish(),
});

export type BranchWiseCollegeListRequest = z.infer<typeof BranchWiseCollegeListSchema>;

export type BranchWiseCollegeistResponse = {
  CollegeID: string;
  CollegeShortName: string | null;
  CollegeAdmissionCode: number | null;
  StateName: string | null;
  City: string | null;
};

export type CollegeComparePreviousYearsOpenCloseRankListResponse = {
  CutoffID: string;
  BranchAdmissionCode: string;
  BranchProperName: string;
  CategoryName: string;
  ReservationType: string;
  RoundNumber: number;
  OpenRank: string;
  ClosingRank: string;
};

export type PreviousYearOpenClose = {
  CutoffID: string;
  CategoryName: string;
  ReservationType: string;
  RoundNumber: number;
  OpenRank: string;
  ClosingRank: string;
};

export type CollegeComparePreviousYearsOpenCloseRankFormateListResponse = {
  BranchAdmissionCode: string;
  BranchProperName: string;
  PreviousYearOpenClose: PreviousYearOpenClose[];
};

export type MotherBranchInformation = {
  SystemBranchID: string;
  SystemBranchCode: string;
  SystemBranchName: string;
  SystemBranchProperName: string;
};

export type BranchInformation = {
  BranchID: string;
  SystemBranchID: string;
  BranchName: string;
  BranchProperName: string;
  BranchAdmissionCode: string;
  BranchGroup: string;
  BranchWebName: string;
};
