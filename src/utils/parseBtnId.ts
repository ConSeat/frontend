export const parseBtnId = (id: string) => {
  const parts = id.split('_');
  const sectionId = Number(parts.pop());
  const floorInfo = parts.slice(1).join('_');
  return { floorInfo, sectionId };
};
