import { z } from 'zod';

export const BranchWisePlacementListPageSchema = z.object({
  CollegeID: z.string().nullish(),
  Year: z.string().nullish(),
});

export type BranchWisePlacementListPageRequest = z.infer<typeof BranchWisePlacementListPageSchema>;

export type BranchWisePlacementListPageResponse = {
  BranchWisePlacementID: string;
  BranchCode: string;
  BranchName: string;
  NumberOfStudentRegistered: number | null;
  NumberOfStudentPlaced: number | null;
  PlacementRatio: number | null;
  HigherPackage: number | null;
  MedianPackage: number | null;
  AveragePackage: number | null;
  LowerPackage: number | null;
};
