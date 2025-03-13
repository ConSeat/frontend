import styles from './FindViewItem.module.scss';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface FindViewItemProps {
  children: ReactNode;
  onClick: () => void;
  isSelected: boolean;
  isUnSelected: boolean;
  subtitle: string;
}

const FindViewItem = ({
  children,
  onClick,
  isSelected,
  isUnSelected,
  subtitle,
}: FindViewItemProps) => {
  return (
    <li
      className={classNames(styles.findViewLayout, {
        [styles.select]: isSelected,
        [styles.unSelect]: isUnSelected,
      })}
      onClick={onClick}
    >
      {children}
      <div
        className={classNames(styles.findViewSubtitle, {
          [styles.select]: isSelected,
        })}
      >
        {subtitle}
      </div>
    </li>
  );
};

export default FindViewItem;
