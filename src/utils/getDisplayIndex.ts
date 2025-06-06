export const getDisplayIndex = (currentIndex: number, originalsLength: number) => {
  if (currentIndex === 0) return originalsLength;
  if (currentIndex === originalsLength + 1) return 1;

  return currentIndex;
};
