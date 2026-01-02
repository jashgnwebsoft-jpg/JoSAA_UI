import { z } from 'zod';

export const FilterSchema = z.object({
  Language: z.string().nullish(),
});

export type FilterModel = z.infer<typeof FilterSchema>;
