export const toggleSetItem = <T extends string>(
  set: Set<T | unknown>,
  item: T,
): Set<T | unknown> => {
  const newSet = new Set<T | unknown>(set);

  if (newSet.has(item)) {
    newSet.delete(item);
  } else {
    newSet.add(item);
  }

  return newSet;
};
