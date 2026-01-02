export interface FilterLabel<TFilterModel> {
  Value: string;
  Label: string;
  Parent: keyof TFilterModel;
}