/**
 * Field resolver types for different kinds of filter fields
 */
export type FieldType = 'dropdown' | 'boolean' | 'string' | 'date' | 'custom';

/**
 * Configuration for resolving a single field to a friendly label
 */
export interface FieldResolver<T = unknown> {
  type: FieldType;
  dataSource?: ComboBoxItem[];
  customResolver?: (value: T) => string;
  dateFormat?: string;
  booleanLabels?: {
    true: string;
    false: string;
    null: string;
  };
}

/**
 * Complete field resolver configuration for a filter model
 */
export type FieldResolverConfig<T> = {
  [K in keyof T]?: FieldResolver<T[K]>;
};

export type FriendlyFilterModel = {
  Label: string;
  Value: string | number | boolean | Date | null;
};

export type FriendlyFilterRecord<T> = Record<keyof T, FriendlyFilterModel>;

export interface ComboBoxItem {
  Value: string | number;
  Label: string;
}

export type ComboBoxResponse = ComboBoxItem[];
