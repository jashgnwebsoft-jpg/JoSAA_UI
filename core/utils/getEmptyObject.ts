export function getEmptyObject<T extends object>(data: T, defaultValues: Partial<T> = {}): T {
  const obj: any = {};

  for (const key of Object.keys(data)) {
    const value = (data as any)[key];
    const type = typeof value;

    if (type === 'number') {
      obj[key] = 0;
    } else if (type === 'string' || type === 'boolean') {
      obj[key] = null;
    } else if (value instanceof Date) {
      obj[key] = null;
    } else {
      obj[key] = null;
    }
  }

  return { ...obj, ...defaultValues } as T;
}
