import { z } from 'zod';

export const ListSchema = z.object({});

export type ListRequest = z.infer<typeof ListSchema>;

export type ListResponse = {
  DocumentID: string;
  DocumentTitle: string | null;
  DocumentSubTitle: string | null;
  URL: string | null;
};
