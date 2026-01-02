import { z } from 'zod';

export const LatestNewsSchema = z.object({});

export type LatestNewsRequest = z.infer<typeof LatestNewsSchema>;

export type LatestNewsResponse = {
  NewsID: string;
  NewsTitle: string;
  FromDate: string | null;
  ToDate: string | null;
  Description: string | null;
  NewsText: string | null;
  NewsURL: string | null;
  NewsCategory: string | null;
  NewsNewsViewCountURL: number | null;
};

export const NewsByIDSchema = z.object({
  NewsID: z.string(),
});

export type NewsByIDRequest = z.infer<typeof NewsByIDSchema>;

export type NewsByIDResponse = {
  NewsID: string;
  NewsTitle: string;
  FromDate: string | null;
  ToDate: string | null;
  Description: string | null;
  NewsText: string | null;
  NewsURL: string | null;
  NewsCategory: string | null;
  NewsNewsViewCountURL: number | null;
};
