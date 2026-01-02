import { ValidationErrors } from '@gnwebsoft/ui';
import { useCallback } from 'react';
import type { UseFormSetError, FieldValues, Path } from 'react-hook-form';
import { toast } from 'sonner';

import { ApiError } from '../api/types';

export interface SuccessMessage {
  create: string;
  update: string;
}

export interface ErrorMessage {
  noChanges: string;
  general: string;
}

export interface UseFormErrorHandlerOptions<TFieldValues extends FieldValues> {
  setError?: UseFormSetError<TFieldValues>;
  successMessage?: SuccessMessage;
  errorMessage?: ErrorMessage;
}

export type SuccessHandler = (isEditing: boolean, rowsAffected?: number) => boolean;
export type ErrorHandler = (processedError: ApiError) => void;

export type UseFormErrorHandlerReturn = {
  handleSuccess: SuccessHandler;
  handleError: ErrorHandler;
};

export interface UseDeleteHandlerOptions {
  successMessage?: string;
  errorMessage?: string;
}

/**
 * Hook to handle API errors in forms with standardized error handling and toast messages
 */
export const useFormErrorHandler = <TFieldValues extends FieldValues>({
  setError,
  successMessage = {
    create: 'Created successfully',
    update: 'Updated successfully',
  },
  errorMessage = {
    noChanges: 'No changes were made',
    general: 'Failed to save. Please try again.',
  },
}: UseFormErrorHandlerOptions<TFieldValues>): UseFormErrorHandlerReturn => {
  const getFieldError = useCallback(
    (fields: ValidationErrors | undefined, fieldName: string): string | undefined => {
      if (!fields || !fields[fieldName]) return undefined;

      const fieldError = fields[fieldName];

      if (typeof fieldError === 'string') {
        return fieldError;
      }

      if (Array.isArray(fieldError)) {
        return fieldError.join(', ');
      }

      if (typeof fieldError === 'object' && 'message' in fieldError) {
        return fieldError.message;
      }

      return undefined;
    },
    []
  );

  const handleSuccess = useCallback(
    (isEditing: boolean, rowsAffected?: number) => {
      if (rowsAffected !== undefined && rowsAffected > 0) {
        toast.success(isEditing ? successMessage.update : successMessage.create);
        return true;
      } else if (rowsAffected === 0) {
        toast.error(errorMessage.noChanges);
        return false;
      }
      // If rowsAffected is undefined, assume success
      toast.success(isEditing ? successMessage.update : successMessage.create);
      return true;
    },
    [successMessage, errorMessage]
  );

  const handleError = useCallback(
    (processedError: ApiError) => {
      if (processedError.type === 'validation_error' && processedError.errors && setError) {
        // Set field-specific errors using react-hook-form's setError (only if setError is provided)
        Object.keys(processedError.errors).forEach(fieldName => {
          const fieldError = getFieldError(processedError.errors, fieldName);
          if (fieldError) {
            setError(fieldName as Path<TFieldValues>, {
              type: 'server',
              message: fieldError,
            });
          }
        });

        // Show general validation error toast
        toast.error(processedError.title || 'Please check the form for validation errors');
      } else {
        // Show general error toast for non-validation errors or when setError is not available
        toast.error(processedError.title || errorMessage.general);
      }
    },
    [errorMessage.general, getFieldError, setError]
  );

  return {
    handleSuccess,
    handleError,
  };
};

/**
 * Convenience hook for delete operations that don't need form field validation
 * Uses useFormErrorHandler internally but with simplified options
 */
export const useDeleteHandler = ({
  successMessage = 'Deleted successfully',
  errorMessage = 'Failed to delete. Please try again.',
}: UseDeleteHandlerOptions = {}): UseFormErrorHandlerReturn => {
  return useFormErrorHandler({
    successMessage: {
      create: successMessage, // Not used for delete, but required for type
      update: successMessage,
    },
    errorMessage: {
      noChanges: 'No changes were made', // Not typically used for delete
      general: errorMessage,
    },
    // setError is omitted (undefined) for delete operations
  });
};
