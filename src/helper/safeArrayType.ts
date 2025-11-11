export const safeArray = <T>(arr: T[] | undefined | null): T[] =>
  Array.isArray(arr) ? arr : [];
