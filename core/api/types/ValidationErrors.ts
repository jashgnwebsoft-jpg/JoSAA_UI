// types.ts
export interface ValidationErrors {
  [field: string]: string | string[] | boolean | { key: string; message: string };
}
