import React, { forwardRef } from 'react';

// ----------------------
// Shared types
// ----------------------
export type DataModalButtons = {
  onSubmit?: () => void;
  onCancel?: () => void;
  isPending?: boolean;
  isSuccess?: boolean;
};

export type DataModalComponentProps<TData> = {
  data?: TData;
  isEditing?: boolean;
  ref?: React.Ref<DataModalButtons>; // 👈 put ref into props
};

// ----------------------
// Project-specific HOC
// ----------------------
export function withDataModal<TData>(
  component: (props: DataModalComponentProps<TData>) => React.ReactElement | null
) {
  return forwardRef<DataModalButtons, DataModalComponentProps<TData>>(
    (props, ref) => component({ ...props, ref })
  );
}
