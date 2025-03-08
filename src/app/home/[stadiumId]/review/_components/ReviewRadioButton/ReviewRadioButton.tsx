import styles from './ReviewRadioButton.module.scss';
import React from 'react';
import { ChoiceCircle } from '@/assets';

interface ReviewRadioButtonProps {
  name: string;
  value: string;
  onChange: () => void;
  isLastLabel: boolean;
}

const ReviewRadioButton = React.memo(
  ({ name, value, isLastLabel, onChange }: ReviewRadioButtonProps) => {
    return (
      <label className={styles.radioArea}>
        <input
          type="radio"
          name={name}
          value={value}
          className={styles.radioInput}
          onChange={onChange}
        />
        <ChoiceCircle className={styles.radioIcon} />
        <div className={styles.radioText}>{value}</div>
        {!isLastLabel && <div className={styles.radioSplitter} />}
      </label>
    );
  },
);

ReviewRadioButton.displayName = 'ReviewRadioButton';

export default ReviewRadioButton;
