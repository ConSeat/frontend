'use client';

import styles from './AllCheckbox.module.scss';
import classNames from 'classnames';

interface AllCheckboxProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
}

const AllCheckbox = ({ text, onClick, isSelected }: AllCheckboxProps) => {
  return (
    <label
      className={classNames(styles.allCheckbox, {
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
      <span className={styles.allCheckboxText} aria-label={text}>
        {text}
      </span>
    </label>
  );
};

export default AllCheckbox;
