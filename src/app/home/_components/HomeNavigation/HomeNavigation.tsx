'use client';

import styles from './HomeNavigation.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import { MY_PAGE_QUERY, VIEW_TAP } from '@/constants/myPage';
import { isLoggedIn } from '@/utils/requireLogin';

const HomeNavigation = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const checkLogin = async () => {
      const result = await isLoggedIn();
      setIsLogin(result);
    };
    checkLogin();
  }, []);

  return (
    <nav className={styles.homeNav}>
      <Link href={isLogin ? `/mypage?${MY_PAGE_QUERY}=${VIEW_TAP}` : `/signin`}>
        <Icon icon="DefaultProfile" />
      </Link>
      <Link href="#">
        <Icon icon="QnA" />
      </Link>
    </nav>
  );
};

export default HomeNavigation;
