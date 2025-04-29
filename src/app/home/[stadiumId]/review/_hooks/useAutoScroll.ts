import { REVIEW } from '../_constants/review';
import { useEffect } from 'react';

export function useAutoScroll<Keys>(
  lastStep: number,
  sectionRefs: Record<string, HTMLDivElement | null>,
) {
  // 자동 스텝 변경 시 해당 섹션으로 스크롤
  useEffect(() => {
    const stepToKey: Record<number, Keys> = {
      [REVIEW.STEPS.SEAT_INFO_SELECT]: 'seatingId' as Keys,
      [REVIEW.STEPS.FEATURES_INFO_SELECT]: 'features' as Keys,
      [REVIEW.STEPS.DISTANCE_INFO_SELECT]: 'stageDistance' as Keys,
      [REVIEW.STEPS.OBSTRUCTIONS_SELECT]: 'obstructions' as Keys,
    } as const;

    const key = stepToKey[lastStep];
    if (key) {
      sectionRefs[key]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [lastStep, sectionRefs]);

  // 유효성 검사 실패 필드 배열을 받아 첫 번째에 해당하는 섹션으로 스크롤
  const scrollToInvalid = (invalidFields: Keys[]) => {
    if (invalidFields.length === 0) return;

    const firstKey = invalidFields[0];
    sectionRefs[firstKey]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return { scrollToInvalid };
}
