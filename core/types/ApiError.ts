// import { ValidationErrors } from "@gnwebsoft/ui";

// export interface ApiError {
//   type?: string;
//   title?: string;
//   status?: number;
//   traceId?: string;
//   errors?: ValidationErrors;
//   modelErrors?: boolean;
// }

export type ListResponse2<TListModel> = {
  Data: TListModel[];
  Total: number;
};