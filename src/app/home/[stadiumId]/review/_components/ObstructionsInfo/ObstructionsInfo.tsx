'use client';

import Badge from '../Badge';
import styles from './ObstructionsInfo.module.scss';
import { OBSTRUCTIONS_INFO, REVIEW } from '@/constants/review';
import type { ReviewDispatch } from '@/types/review';

interface ObstructionsInfoProps {
  data: number[];
  dispatch: ReviewDispatch;
}

const ObstructionsInfo = ({ data, dispatch }: ObstructionsInfoProps) => {
  const toggleObstructionsInfo = (info: number) => {
    dispatch({
      type: REVIEW.ACTIONS.OBSTRUCTIONS_SELECT,
      payload: { obstruction: info },
    });
  };

  return (
    <div className={styles.obstructionsInfoSection}>
      {OBSTRUCTIONS_INFO.map((info) => (
        <Badge
          key={info.obstructionId}
          text={info.name}
          onClick={() => toggleObstructionsInfo(info.obstructionId)}
          variant="dark"
          isSelected={data.includes(info.obstructionId)}
        />
      ))}
    </div>
  );
};

export default ObstructionsInfo;
