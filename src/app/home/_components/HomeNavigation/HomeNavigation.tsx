'use client';

import styles from './HomeNavigation.module.scss';
import FAQPageLink from '@/components/FAQPageLink/FAQPageLink';
import MypageLink from '@/components/MypageLink';

const HomeNavigation = () => {
  return (
    <nav className={styles.homeNav}>
      <div className={styles.itemWrapper}>
        <MypageLink />
      </div>
      <div className={styles.itemWrapper}>
        <FAQPageLink />
      </div>
    </nav>
  );
};

export default HomeNavigation;
