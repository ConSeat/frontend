'use client';

import Portal from '../Portal';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';
import React, { type HTMLAttributes, ReactNode, type Ref } from 'react';

// DropdownMain
interface DropdownProps {
  className?: string;
  children?: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

const DropdownMain = ({ className, children, ref }: DropdownProps) => {
  return (
    <div ref={ref} className={classNames(styles.dropdownContainer, className)}>
      {children}
    </div>
  );
};

// DropdownTrigger
// 사용하는 곳에서 aria-haspopup / aria-expanded / aria-controls 구현
interface DropdownTriggerProps {
  as: ReactNode;
}

const DropdownTrigger = ({ as }: DropdownTriggerProps) => {
  return as;
};

// DropdownMenu
interface DropdownMenuProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

const DropdownMenu = ({ children, className, ...props }: DropdownMenuProps) => {
  return (
    <ul className={classNames(styles.dropdownMenu, className)} {...props}>
      {children}
    </ul>
  );
};

// DropdownModal
interface DropdownModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  controls?: ReactNode;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

const DropdownModal = ({ isOpen, controls, children, ref, ...props }: DropdownModalProps) => {
  return (
    <Portal isOpen={isOpen}>
      <div className={styles.overlayWrapper}>
        <div className={styles.overlay} />
        <div ref={ref} className={styles.modalContent} {...props}>
          {children}
          {controls && <>{controls}</>}
        </div>
      </div>
    </Portal>
  );
};

// DropdownItem
interface DropdownItemProps extends HTMLAttributes<HTMLLIElement> {
  children: string;
  isSelected: boolean;
}

const DropdownItem = ({ children, isSelected, className, ...props }: DropdownItemProps) => {
  return (
    <li
      className={classNames(styles.dropdownItem, className, { selected: isSelected })}
      role="option"
      aria-selected={isSelected}
      {...props}
    >
      {children}
    </li>
  );
};

const Dropdown = Object.assign(DropdownMain, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Modal: DropdownModal,
  Item: DropdownItem,
});

export default Dropdown;
