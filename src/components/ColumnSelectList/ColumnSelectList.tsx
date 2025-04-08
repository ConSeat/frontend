import styles from './ColumnSelectList.module.scss';
import classNames from 'classnames';
import { ReactNode } from 'react';

const ColumnSelectList = ({ children }: { children: ReactNode }) => {
  return <ul className={styles.selectItemList}>{children}</ul>;
};

interface ItemProps {
  children: ReactNode;
  onClick: () => void;
  isSelected: boolean;
  isUnSelected?: boolean;
  disabled?: boolean;
}

const Item = ({
  children,
  onClick,
  isSelected,
  isUnSelected = false,
  disabled = false,
}: ItemProps) => {
  return (
    <li className={styles.selectItemWrapper}>
      <button
        type="button"
        className={classNames(styles.selectItemLayout, {
          [styles.selected]: isSelected,
          [styles.unselected]: isUnSelected,
        })}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </li>
  );
};

const Title = ({ children }: { children: ReactNode }) => (
  <div className={styles.selectItemTitle}>{children}</div>
);

ColumnSelectList.Item = Item;
ColumnSelectList.Title = Title;

export default ColumnSelectList;
