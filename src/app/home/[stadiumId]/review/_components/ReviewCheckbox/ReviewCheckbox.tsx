'use client';

import styles from './ReviewCheckbox.module.scss';
import classNames from 'classnames';
import React from 'react';

interface ReviewCheckboxProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
  variant?: 'default' | 'dark';
}

const ReviewCheckbox = React.memo(
  ({ text, onClick, isSelected, variant = 'default' }: ReviewCheckboxProps) => {
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
  },
);

ReviewCheckbox.displayName = 'ReviewCheckbox';

export default ReviewCheckbox;
