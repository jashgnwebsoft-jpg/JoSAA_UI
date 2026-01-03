import { z } from 'zod';

export const CSABPreviousYearWiseCutoffListSchema = z.object({
  CollegeID: z.string().nullish(),
  CategoryID: z.string().nullish(),
  Status: z.string().nullish(),
});

export type CSABPreviousYearWiseCutoffListRequest = z.infer<
  typeof CSABPreviousYearWiseCutoffListSchema
>;

export type CSABPreviousYearWiseCutoffListResponse = {
  CutoffID: string;
  RoundID: string;
  BranchProperName: string;
  ReservationType: string;
  AdmissionYear: string;
  RoundTitle: string;
  OpenRank: number;
  CloseRank: number;
};

export type CSABPreviousYearWiseCutoffRow = {
  id: string;
  AdmissionYear: string;
  [key: string]: any;
};

export type PivotRow = {
  id: string;
  BranchName: string;
  ReservationType: string;
  [roundTitle: string]: string | number;
};

export const CSABBranchWiseCutoffListSchema = z.object({
  Year: z.string({ message: 'Select Year' }),
  Category: z.string().nullish(),
  RoundID: z.string({ message: 'Select Round' }),
  CollegeType: z.string().nullish(),
  Branch: z.string({ message: 'Select Branch' }),
  ReservationType: z.string({ message: 'Select Seat Pool' }),
});

export type CSABBranchWiseCutoffListRequest = z.infer<typeof CSABBranchWiseCutoffListSchema>;

export type CSABBranchWiseCutoffListResponse = {
  CutoffID: string;
  CollegeShortName: string;
  CollegeTypeShortName: string;
  BranchProperName: string;
  CategoryName: string;
  ReservationType: string;
  CloseRank: number;
};

export const CSABCollegeWiseCutoffListSchema = z.object({
  Year: z.string({ message: 'Select Year' }),
  Category: z.string().nullish(),
  RoundID: z.string({ message: 'Select Round' }),
  College: z.string({ message: 'Select College' }),
  ReservationType: z.string({ message: 'Select Seat Pool' }),
});

export type CSABCollegeWiseCutoffListRequest = z.infer<typeof CSABCollegeWiseCutoffListSchema>;

export type CSABCollegeWiseCutoffListResponse = {
  CutoffID: string;
  BranchProperName: string;
  QuotaName: string;
  CategoryName: string;
  ReservationType: number;
  CloseRank: number;
};

export type CutoffGridRow = {
  id: string;
  BranchProperName: string;
  ReservationType?: string;
  ClosingRank?: number | null;
  CloseRank?: number | null;
};
