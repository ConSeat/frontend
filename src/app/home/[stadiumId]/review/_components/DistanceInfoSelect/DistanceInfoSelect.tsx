import { REVIEW } from '../../_constants/review';
import ReviewRadioButton from '../ReviewRadioButton';
import styles from './DistanceInfoSelect.module.scss';
import React from 'react';
import { type DistanceInfoKey, type DistanceValue, ReviewDispatch } from '@/types/review';

interface DistanceInfoSelectProps {
  name: DistanceInfoKey;
  options: readonly { value: DistanceValue; name: string }[];
  dispatch: ReviewDispatch;
}

const DistanceInfoSelect = ({ name, options, dispatch }: DistanceInfoSelectProps) => {
  const handleChangeInput = (key: DistanceInfoKey, value: DistanceValue) => {
    dispatch({
      type: REVIEW.ACTIONS.DISTANCE_INFO_SELECT,
      payload: { [key]: value },
    });
  };

  return (
    <div className={styles.distanceLayout}>
      <div className={styles.radioGroup}>
        {options.map((option, index) => (
          <ReviewRadioButton
            key={option.value}
            name={name}
            value={option.name}
            onChange={() => handleChangeInput(name, option.value)}
            isLastLabel={index === options.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(DistanceInfoSelect);
