'use client';

import styles from './HomeNavigation.module.scss';
import MypageLink from '@/components/MypageLink';
import QAPageLink from '@/components/QAPageLink/QAPageLink';

const HomeNavigation = () => {
  return (
    <nav className={styles.homeNav}>
      <MypageLink />
      <QAPageLink />
    </nav>
  );
};

export default HomeNavigation;
