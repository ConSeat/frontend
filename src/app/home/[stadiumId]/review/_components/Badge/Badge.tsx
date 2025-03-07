'use client';

import styles from './Badge.module.scss';
import classNames from 'classnames';

interface BadgeProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
  variant?: 'default' | 'dark';
}

const Badge = ({ text, onClick, isSelected, variant = 'default' }: BadgeProps) => {
  return (
    <button
      type="button"
      className={classNames(styles.badge, styles[variant], { [styles.select]: isSelected })}
      onClick={onClick}
    >
      <span className={styles.badgeText} aria-label={text}>
        {text}
      </span>
    </button>
  );
};

export default Badge;
