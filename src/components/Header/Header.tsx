'use client';

import styles from './Header.module.scss';
import { type HTMLAttributes } from 'react';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode;
}

const Header = ({ title, left, right, ...props }: HeaderProps) => {
  return (
    <header className={styles.header} {...props}>
      <div className={styles.left}>{left}</div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.right}>{right}</div>
    </header>
  );
};

export default Header;
