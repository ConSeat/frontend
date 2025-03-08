export const toggleItem = (arr: number[], value: number): number[] => {
  return arr.includes(value) ? arr.filter((item) => item !== value) : [...arr, value];
};
