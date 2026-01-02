// React Hooks with ApiResponse format
import { useCallback } from 'react';

import { ApiError } from './types';

// Export factory methods and types
export {
  createApiClient,
  getGlobalApiClient,
  setGlobalApiClient,
  resetGlobalApiClient,
} from './createApiClient';
export type { ApiClientConfig } from './createApiClient';
export { ApiClient } from './ApiClient';

// Helper hook for form validation errors
export function useValidationErrors(error: ApiError | null) {
  const getFieldError = useCallback(
    (field: string): string | null => {
      if (!error?.errors || !error.errors[field]) return null;

      const fieldError = error.errors[field];

      if (typeof fieldError === 'string') return fieldError;
      if (Array.isArray(fieldError)) return fieldError[0];
      if (typeof fieldError === 'object' && 'message' in fieldError) {
        return fieldError.message;
      }

      return null;
    },
    [error]
  );

  const hasFieldError = useCallback(
    (field: string): boolean => {
      return !!getFieldError(field);
    },
    [getFieldError]
  );

  const getAllErrors = useCallback((): Record<string, string> => {
    if (!error?.errors) return {};

    const result: Record<string, string> = {};

    Object.entries(error.errors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        result[key] = value;
      } else if (Array.isArray(value)) {
        result[key] = value.join(', ');
      } else if (typeof value === 'object' && value && 'message' in value) {
        result[key] = value.message;
      }
    });

    return result;
  }, [error]);

  return {
    getFieldError,
    hasFieldError,
    getAllErrors,
    hasErrors: error?.errors,
  };
}
