'use client';

import styles from './HomeNavigation.module.scss';
import Link from 'next/link';
import Icon from '@/components/Icon/Icon';
import MypageLink from '@/components/MypageLink';

const HomeNavigation = () => {
  return (
    <nav className={styles.homeNav}>
      <MypageLink />
      <Link href="#">
        <Icon icon="QnA" />
      </Link>
    </nav>
  );
};

export default HomeNavigation;
