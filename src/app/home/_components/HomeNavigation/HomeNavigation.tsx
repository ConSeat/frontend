'use client';

import styles from './HomeNavigation.module.scss';
import FAQPageLink from '@/components/FAQPageLink/FAQPageLink';
import MypageLink from '@/components/MypageLink';

const HomeNavigation = () => {
  return (
    <nav className={styles.homeNav}>
      <MypageLink />
      <FAQPageLink />
    </nav>
  );
};

export default HomeNavigation;
