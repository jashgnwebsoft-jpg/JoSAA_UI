import { z } from 'zod';

export const IntakeCutOffListSchema = z.object({
  QuotaID: z.string().nullish(),
  CollegeID: z.string().nullish(),
});

export type IntakeCutoffListRequest = z.infer<typeof IntakeCutOffListSchema>;

export type IntakeCutoffListResponse = {
  IntakeCutoffID: string;
  BranchName: string;
  BranchWebName: string;
  ReservationType: string | null;
  IntakeOpen: number;
  IntakeOpenPWD: number;
  IntakeGENEWS: number;
  IntakeGENEWSPWD: number;
  IntakeSC: number;
  IntakeSCPWD: number;
  IntakeST: number;
  IntakeSTPWD: number;
  IntakeOBCNCL: number;
  IntakeOBCNCLPWD: number;
  IntakeTotal: number;
  IntakeSeatCapacity: number;
};
