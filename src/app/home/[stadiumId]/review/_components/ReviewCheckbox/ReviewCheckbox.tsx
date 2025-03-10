'use client';

import styles from './ReviewCheckbox.module.scss';
import classNames from 'classnames';

interface ReviewCheckboxProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
  variant?: 'default' | 'dark';
}

const ReviewCheckbox = ({
  text,
  onClick,
  isSelected,
  variant = 'default',
}: ReviewCheckboxProps) => {
  return (
    <label
      className={classNames(styles.reviewCheckbox, styles[variant], {
        [styles.select]: isSelected,
      })}
    >
      <input
        type="checkbox"
        className={styles.hiddenCheckbox}
        checked={isSelected}
        onChange={onClick}
        aria-hidden="true"
      />
      <span className={styles.reviewCheckboxText} aria-label={text}>
        {text}
      </span>
    </label>
  );
};

export default ReviewCheckbox;
