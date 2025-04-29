'use client';

import styles from './Header.module.scss';
import { type HTMLAttributes, useCallback } from 'react';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode;
}

const Header = ({ title, left, right, ...props }: HeaderProps) => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        scrollToTop();
      }
    },
    [scrollToTop],
  );

  return (
    <header
      className={styles.header}
      onClick={scrollToTop}
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
      {...props}
    >
      <div className={styles.left}>{left}</div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.right}>{right}</div>
    </header>
  );
};

export default Header;
