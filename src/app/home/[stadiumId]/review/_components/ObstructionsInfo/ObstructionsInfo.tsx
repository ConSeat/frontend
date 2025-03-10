'use client';

import ReviewCheckbox from '../ReviewCheckbox';
import styles from './ObstructionsInfo.module.scss';
import React from 'react';
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
        <ReviewCheckbox
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

export default React.memo(ObstructionsInfo);
