import { NONE_SELECT } from '../_constants/info';
import type { ReviewData } from '@/types/review';

export const getInvalidFields = (data: ReviewData): (keyof ReviewData)[] => {
  const invalids: (keyof ReviewData)[] = [];

  if (data.concertId === NONE_SELECT) invalids.push('concertId');
  if (data.seatingId === NONE_SELECT) invalids.push('seatingId');
  if (data.features.length === 0) invalids.push('features');
  if (data.images.length === 0) invalids.push('images');
  if (data.stageDistance === '') invalids.push('stageDistance');
  if (data.thrustStageDistance === '') invalids.push('thrustStageDistance');
  if (data.screenDistance === '') invalids.push('screenDistance');
  if (data.obstructions.length === 0) invalids.push('obstructions');
  if (data.contents.trim() === '') invalids.push('contents');

  return invalids;
};
