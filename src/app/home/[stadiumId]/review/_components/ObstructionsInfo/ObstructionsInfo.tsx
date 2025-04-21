'use client';

import { REVIEW } from '../../_constants/review';
import ReviewCheckbox from '../ReviewCheckbox';
import styles from './ObstructionsInfo.module.scss';
import React from 'react';
import { useFetchStadiumObstructions } from '@/hooks/queries/useFetchStadium';
import type { ReviewDispatch } from '@/types/review';

interface ObstructionsInfoProps {
  data: number[];
  dispatch: ReviewDispatch;
}

const ObstructionsInfo = ({ data, dispatch }: ObstructionsInfoProps) => {
  const { data: obstructions } = useFetchStadiumObstructions();
  const fetchedObstructions = [
    ...(obstructions?.data.obstructions ?? []),
    { obstructionId: -1, name: '없음' },
  ];

  const toggleObstructionsInfo = (info: number) => {
    dispatch({
      type: REVIEW.ACTIONS.OBSTRUCTIONS_SELECT,
      payload: { obstruction: info },
    });
  };

  return (
    <div className={styles.obstructionsInfoSection}>
      {fetchedObstructions.map((info) => (
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
