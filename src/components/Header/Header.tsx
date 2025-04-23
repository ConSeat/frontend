'use client';

import styles from './Header.module.scss';

interface HeaderProps {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode;
}

const Header = ({ title, left, right }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>{left}</div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.right}>{right}</div>
    </header>
  );
};

export default Header;
