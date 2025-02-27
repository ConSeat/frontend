'use client';

import styles from './Dropdown.module.scss';
import classNames from 'classnames';
import { ReactNode, forwardRef } from 'react';

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}

// ✅ `DropdownComponent`를 `forwardRef`로 감싸서 ref를 사용할 수 있도록 변경
const DropdownComponent = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  { value, onChange, children },
  ref,
) {
  return <div ref={ref}>{children}</div>;
});

// ✅ 하위 컴포넌트 추가
const Trigger = ({ as }: { as: ReactNode }) => {
  return as;
};

const Menu = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <ul className={classNames(styles.dropdownMenu, className)}>{children}</ul>;
};

const Modal = ({
  isOpen,
  controls,
  children,
  className,
}: {
  isOpen: boolean;
  controls?: ReactNode;
  children: ReactNode;
  className?: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className={classNames(styles.dropdownModal, className)}>
      {controls && <>{controls}</>}
      <ul className={styles.dropdownList}>{children}</ul>
    </div>
  );
};

const Item = ({
  children,
  isSelected,
  onClick,
  className,
}: {
  children: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <li
      className={classNames(styles.dropdownItem, className, { selected: isSelected })}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

// ✅ `DropdownComponent`에 하위 컴포넌트 추가
const Dropdown = Object.assign(DropdownComponent, {
  Trigger,
  Menu,
  Modal,
  Item,
});

// ✅ `Dropdown`을 그대로 export
export default Dropdown;
