'use client';

import styles from './Header.module.scss';
import { type HTMLAttributes } from 'react';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

const Header = ({ left, center, right, ...props }: HeaderProps) => {
  return (
    <header className={styles.header} {...props}>
      <div className={styles.left}>{left}</div>
      <h1 className={styles.center}>{center}</h1>
      <div className={styles.right}>{right}</div>
    </header>
  );
};

export default Header;
