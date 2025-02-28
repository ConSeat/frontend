'use client';

import styles from './Dropdown.module.scss';
import classNames from 'classnames';
import { ReactNode, forwardRef } from 'react';

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  children: ReactNode;
}

const DropdownComponent = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  { value, onChange, className, children },
  ref,
) {
  return (
    <div ref={ref} className={classNames(styles.dropdownContainer, className)}>
      {children}
    </div>
  );
});

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

const Dropdown = Object.assign(DropdownComponent, {
  Trigger,
  Menu,
  Modal,
  Item,
});

export default Dropdown;
