import { REVIEW } from '../../_constants/review';
import ReviewRadioButton from '../ReviewRadioButton';
import styles from './DistanceInfoSelect.module.scss';
import React from 'react';
import { type DistanceInfoKey, ReviewDispatch } from '@/types/review';

interface DistanceInfoSelectProps {
  name: DistanceInfoKey;
  options: readonly string[];
  dispatch: ReviewDispatch;
}

const DistanceInfoSelect = ({ name, options, dispatch }: DistanceInfoSelectProps) => {
  const handleChangeInput = (key: DistanceInfoKey, value: number) => {
    dispatch({
      type: REVIEW.ACTIONS.DISTANCE_INFO_SELECT,
      payload: { [key]: value },
    });
  };

  return (
    <div className={styles.distanceLayout}>
      <div className={styles.radioGroup}>
        {options.map((option, valueIdx) => (
          <ReviewRadioButton
            key={valueIdx}
            name={name}
            value={option}
            onChange={() => handleChangeInput(name, valueIdx)}
            isLastLabel={valueIdx === options.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(DistanceInfoSelect);
