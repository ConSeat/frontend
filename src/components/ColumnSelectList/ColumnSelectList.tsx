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
}

const Item = ({ children, onClick, isSelected, isUnSelected = false }: ItemProps) => {
  return (
    <li
      className={classNames(styles.selectItemLayout, {
        [styles.selected]: isSelected,
        [styles.unselected]: isUnSelected,
      })}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

const Title = ({ children }: { children: ReactNode }) => (
  <div className={styles.selectItemTitle}>{children}</div>
);

ColumnSelectList.Item = Item;
ColumnSelectList.Title = Title;

export default ColumnSelectList;
