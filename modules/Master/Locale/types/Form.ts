import { z } from 'zod';

export const fieldDetailSchema = z.object({
  Label: z.string().min(1, 'Label is required'),
  Placeholder: z.string().min(1, 'Placeholder is required'),
  Enabled: z.boolean(),
});
export type FieldDetail = z.infer<typeof fieldDetailSchema>;

export const tableSchema = z.record(z.string(), fieldDetailSchema);
export type TableFields = z.infer<typeof tableSchema>;

export const FormSchema = z.object({
  LocaleID: z.coerce.number().nullish(),
  TableName: z.string().max(250, { message: 'Must be 250 or fewer characters long' }),
  Language: z.string().max(100, { message: 'Must be 100 or fewer characters long' }),
  Value: tableSchema,
});

export type FormModel = z.infer<typeof FormSchema>;

export const TableFormSchema = z.object({
  LocaleID: z.number().nullish(),
  TableName: z
    .string({ message: 'Enter Table Name' })
    .max(250, { message: 'Must be 250 or fewer characters long' }),
  Language: z
    .string({ message: 'Select Language' })
    .max(100, { message: 'Must be 100 or fewer characters long' }),
  Value: z.string(),
});

export type TableFormModel = z.infer<typeof TableFormSchema>;
