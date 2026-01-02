import { z } from 'zod';

export const ListSchema = z.object({});

export type ListRequest = z.infer<typeof ListSchema>;

export type ListResponse = {
  WebsiteID: string;
  WebsiteTitle: string;
  WebsiteUrl: string;
};
