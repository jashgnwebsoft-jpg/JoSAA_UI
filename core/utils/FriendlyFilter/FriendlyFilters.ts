import { FriendlyFilterModel, FriendlyFilterRecord } from './types';

export const createFriendlyFilterValue = (
  label: string,
  value: string | number | boolean | Date | null
): FriendlyFilterModel => ({
  Label: label,
  Value: value,
});

export const createEmptyFriendlyFilter = (): FriendlyFilterModel =>
  createFriendlyFilterValue('All', null);

export const createFriendlyFilterRecord = <T>(
  filterModel: T,
  labelResolvers: Record<keyof T, (value: unknown) => string>
): FriendlyFilterRecord<T> => {
  const result = {} as FriendlyFilterRecord<T>;

  for (const key in filterModel) {
    const value = filterModel[key];
    const resolver = labelResolvers[key];
    const label = resolver ? resolver(value) : String(value || 'All');

    result[key] = createFriendlyFilterValue(
      label,
      value as string | number | boolean | Date | null
    );
  }

  return result;
};
