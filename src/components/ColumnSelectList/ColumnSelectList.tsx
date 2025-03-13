import styles from './ColumnSelectList.module.scss';
import classNames from 'classnames';
import { ReactNode } from 'react';

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
        [styles.select]: isSelected,
        [styles.unSelect]: isUnSelected,
      })}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

const ColumnSelectList = ({ children }: { children: ReactNode }) => {
  return <ul className={styles.selectItemList}>{children}</ul>;
};

ColumnSelectList.Item = Item;

export default ColumnSelectList;
