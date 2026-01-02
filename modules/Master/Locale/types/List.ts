type FieldDetail = {
  Label?: string;
  Placeholder?: string;
  Enabled?: boolean;
  Title?: string;
};
export type FieldName = {
  [fieldName: string]: FieldDetail;
};
export type List = {
  LocaleID: number;
  TableName: string;
  Language?: string;
  Value: FieldName;
};
export type ListDisplay = {
  LocaleID: number;
  TableName: string;
  Language: string;
  Value: string;
};
