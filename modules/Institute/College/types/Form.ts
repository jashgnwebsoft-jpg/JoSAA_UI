import { z } from 'zod';

export const FormSchema = z.object({
  UniversityID: z.string().nullish(),
  UniversityName: z
    .string({ message: 'Enter University Name' })
    .min(1, { message: 'Enter University Name' }),
  UniversityShortName: z.string().max(50, { message: 'Length Must be less than 50.' }).nullish(),
  LibraryUniversityCode: z.string().max(50, { message: 'Length Must be less than 50.' }).nullish(),
  Sequence: z.number().nullish(),
  Remarks: z.string().max(100, { message: 'Length Must be less than 100.' }).nullish(),
});

export type FormRequest = z.infer<typeof FormSchema>;
