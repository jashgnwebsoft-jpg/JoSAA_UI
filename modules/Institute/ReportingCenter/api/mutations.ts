// import { OperationResponse } from '@gnwebsoft/ui';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

// import { getGlobalApiClient } from '@core/api/createApiClient';
// import { ApiError, ApiResponse } from '@core/api/types';
// import { ErrorHandler, SuccessHandler } from '@core/hooks/useFormErrorHandler';
// import { EntityId } from '@core/hooks/useListView';

// import { endpoints } from './endpoints';
// import { universityQueries } from './query';
// import { useUniversityStore } from './store';

// const apiClient = getGlobalApiClient();

// export const useCreateUniversity = (handleSuccess: SuccessHandler, handleError: ErrorHandler) => {
//   const queryClient = useQueryClient();
//   const { postModel } = useUniversityStore();
//   return useMutation<ApiResponse<OperationResponse>, ApiError, InsertRequest>({
//     mutationFn: async (formData: InsertRequest) => {
//       return apiClient.post<OperationResponse>(endpoints.Insert, formData);
//     },
//     onError: error => {
//       handleError(error);
//     },
//     onSuccess: response => {
//       handleSuccess(false, response.data?.rowsAffected);
//       return { lastUpdated: Date.now() };
//     },
//     onSettled: (_response, _error, _variables) => {
//       queryClient.invalidateQueries({ queryKey: universityQueries.List(postModel).queryKey });
//     },
//   });
// };
// export const useUpdateUniversity = (handleSuccess: SuccessHandler, handleError: ErrorHandler) => {
//   const queryClient = useQueryClient();
//   const { postModel } = useUniversityStore();
//   return useMutation<ApiResponse<OperationResponse>, ApiError, UpdateRequest>({
//     mutationFn: async (formData: UpdateRequest) => {
//       return apiClient.put<OperationResponse>(endpoints.Update, formData);
//     },
//     onError: error => {
//       handleError(error);
//     },
//     onSuccess: response => {
//       handleSuccess(true, response.data?.rowsAffected);
//     },
//     onSettled: (data, error, variables) => {
//       queryClient.invalidateQueries({ queryKey: universityQueries.List(postModel).queryKey });
//       if (variables.UniversityID) {
//         queryClient.invalidateQueries({
//           queryKey: universityQueries.Get(variables.UniversityID).queryKey,
//         });
//       }
//     },
//   });
// };

// export const useDeleteUniversity = (handleSuccess: SuccessHandler, handleError: ErrorHandler) => {
//   const queryClient = useQueryClient();
//   const { postModel } = useUniversityStore();
//   return useMutation<ApiResponse<OperationResponse>, ApiError, EntityId>({
//     mutationFn: async (universityID: EntityId) => {
//       return apiClient.delete<OperationResponse>(endpoints.Delete(universityID));
//     },
//     onError: error => {
//       handleError(error);
//     },
//     onSuccess: response => {
//       handleSuccess(true, response.data?.rowsAffected);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: universityQueries.List(postModel).queryKey });
//     },
//   });
// };
