import { z } from 'zod';

export const CurrentYearWiseCutoffListSchema = z.object({
  CollegeID: z.string().nullish(),
  CategoryID: z.string({ message: 'Select Category' }).nullish(),
  SeatPoolID: z.string({ message: 'Select Seat Pool' }).nullish(),
  Status: z.string({ message: 'Select Status' }).nullish(),
});

export type CurrentYearWiseCutoffListRequest = z.infer<typeof CurrentYearWiseCutoffListSchema>;

export type CurrentYearWiseCutoffListResponse = {
  CutoffID: string;
  BranchCode: string;
  RoundTitle: string;
  BranchName: string;
  OpenRank: number;
  ClosingRank: number;
};

export type CurrentYearWiseCutoffRow = {
  BranchCode: string;
  BranchName: string;
  [key: string]: number | string;
};

export const PreviousYearWiseCutoffListSchema = z.object({
  CollegeID: z.string().nullish(),
  CategoryID: z.string().nullish(),
  SeatPoolID: z.string().nullish(),
  Status: z.string().nullish(),
  BranchID: z.string().nullish(),
});

export type PreviousYearWiseCutoffListRequest = z.infer<typeof PreviousYearWiseCutoffListSchema>;

export type PreviousYearWiseCutoffListResponse = {
  CutoffID: string;
  RoundID: string;
  BranchName: string;
  ReservationType: string;
  RoundTitle: string;
  AdmissionYear: string;
  OpenRank: number;
  ClosingRank: number;
};

export type PreviousYearWiseCutoffRow = {
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

export const RoundWiseChartSchema = z.object({
  CollegeID: z.string().nullish(),
  CategoryID: z.string().nullish(),
  SeatPoolID: z.string().nullish(),
  Status: z.string().nullish(),
  BranchID: z.string().nullish(),
  Year: z.number().nullish(),
});

export type RoundWiseChartRequest = z.infer<typeof RoundWiseChartSchema>;

export type RoundWiseChartResponse = {
  CutoffID: string;
  RoundID: string;
  RoundTitle: string;
  AdmissionYear: string;
  OpenRank: number;
  ClosingRank: number;
};

export const MeritRankCutOffSchema = z.object({
  AirRank: z.number({ message: 'Select Air Rank' }),
  CategoryID: z.string({ message: 'Select Category' }),
  MeritRank: z.string({ message: 'Enter Merit Rank' }),
  SeatPoolID: z.string({ message: 'Select Seat Pool' }),
  CourseID: z.string({ message: 'Select Course' }).nullish(),
  BranchID: z.string({ message: 'Select Branch' }).nullish(),
  CollegeType: z.string().nullish(),
});

export type MeritRankCutOffRequest = z.infer<typeof MeritRankCutOffSchema>;

export type MeritRankCutOffResponse = {
  CutoffID: string;
  CollegeShortName: string;
  BranchProperName: string;
  RoundTitle: string;
  OpenRank: number;
  ClosingRank: number;
};

export const BranchWiseCutoffListSchema = z.object({
  Year: z.string({ message: 'Select Year' }),
  Category: z.string().nullish(),
  RoundID: z.number({ message: 'Select Round' }),
  CollegeType: z.string().nullish(),
  Branch: z.string({ message: 'Select Branch' }),
  ReservationType: z.string({ message: 'Select Seat Pool' }),
});

export type BranchWiseCutoffListRequest = z.infer<typeof BranchWiseCutoffListSchema>;

export type BranchWiseCutoffListResponse = {
  CutoffID: string;
  CollegeShortName: string;
  CollegeTypeShortName: string;
  BranchProperName: string;
  CategoryName: string;
  ReservationType: string;
  ClosingRank: number;
};

export const CollegeWiseCutoffListSchema = z.object({
  Year: z.string({ message: 'Select Year' }),
  Category: z.string().nullish(),
  RoundID: z.number({ message: 'Select Round' }),
  College: z.string({ message: 'Select College' }),
  ReservationType: z.string({ message: 'Select Seat Pool' }),
});

export type CollegeWiseCutoffListRequest = z.infer<typeof CollegeWiseCutoffListSchema>;

export type CollegeWiseCutoffListResponse = {
  CutoffID: string;
  BranchProperName: string;
  QuotaName: string;
  CategoryName: string;
  ReservationType: number;
  ClosingRank: number;
};
