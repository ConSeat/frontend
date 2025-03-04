'use client';

import styles from './Badge.module.scss';
import classNames from 'classnames';

interface BadgeProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
}

const Badge = ({ text, onClick, isSelected }: BadgeProps) => {
  return (
    <button
      type="button"
      className={classNames(styles.badge, { [styles.select]: isSelected })}
      onClick={onClick}
    >
      <span className={styles.badgeText} aria-label={text}>
        {text}
      </span>
    </button>
  );
};

export default Badge;
