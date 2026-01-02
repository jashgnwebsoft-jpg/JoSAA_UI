import { z } from 'zod';

export const HomeStateListPageSchema = z.object({
  CollegeTypeID: z.string().nullish(),
});

export type HomeStateListPageRequest = z.infer<typeof HomeStateListPageSchema>;

export type HomeStateListPageResponse = {
  CollegeID: string;
  CollegeName: string;
  CollegeShortName: string | null;
  CollegeAdmissionCode: number;
  City: string | null;
  StateName: string | null;
};

export const CollegeListSchema = z.object({
  CollegeTypeID: z.string().nullish(),
});

export type CollegeListRequest = z.infer<typeof CollegeListSchema>;

export type CollegeListResponse = {
  CollegeID: string;
  CollegeShortName: string | null;
  NIRFRank: number | null;
  Address: string | null;
  CollegeUrlName: string | null;
  StateName: string | null;
  CollegeAdmissionCode: number | null;
};

export const CollegeDetailsSchema = z.object({
  CollegeID: z.string().nullish(),
});

export type CollegeDetailsRequest = z.infer<typeof CollegeDetailsSchema>;

export type CollegeDetailsResponse = {
  CollegeID: string;
  CollegeName: string | null;
  CollegeShortName: string | null;
  CollegeTypeShortName: string;
  NIRFRank: number | null;
  Address: string | null;
  City: string | null;
  District: string | null;
  Phone: string | null;
  Mobile: string | null;
  Website: string | null;
  EstdYear: string | null;
  Hostel: string | null;
  CollegeUrlName: string | null;
  ContactName: string | null;
  ContactDesignation: string | null;
  Fees: string | null;
  CollegeAdmissionCode: string | null;
  IsCSABCollege: string | null;
  IsHomeState: boolean | null;
  Email: string | null;
};

export const CollegeCompareSchema = z.object({
  CollegeID: z.string({ message: 'Select College' }),
  SystemBranchID: z.string({ message: 'Select Branch' }),
  AdmissionYearID: z.string({ message: 'Select Year' }),
});

export type CollegeCompareRequest = z.infer<typeof CollegeCompareSchema>;

export type CollegeCompareCollegeDetailsResponse = {
  CollegeID: string;
  CollegeName: string;
  CollegeTypeShortName: string;
  CollegeShortName: string;
  Fees: number | null;
  NIRFRank: number | null;
  HigherPackage: number | null;
  MedianPackage: number | null;
  AveragePackage: number | null;
  LowerPackage: number | null;
};

export type CollegeCompareResponse = {
  CutoffID: string;
  CollegeShortName: string;
  Fees: number;
  BranchProperName: string;
  NIRFRank: number | null;
  HigherPackage: number | null;
  MedianPackage: number | null;
  AveragePackage: number | null;
  LowerPackage: number | null;
  CategoryName: string;
  ReservationType: string;
  OpenRank: number;
  ClosingRank: number;
};
