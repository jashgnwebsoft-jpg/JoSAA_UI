export const calculateFilterCount = (model: object): number =>
  Object.values(model).filter((v) => v !== null && v !== undefined && String(v).trim() !== '')
    .length;