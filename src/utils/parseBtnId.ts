export const parseBtnId = (id: string) => {
  const parts = id.split('_');
  const sectionId = Number(parts.pop());
  const sectionName = parts.slice(1).join('_');
  return { sectionName, sectionId };
};
