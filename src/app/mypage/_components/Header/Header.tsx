'use client';

import styles from './Header.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon/Icon';

const Header = () => {
  const router = useRouter();

  const handlePrevPage = () => {
    router.back();
  };

  return (
    <header className={styles.header}>
      <Icon icon="LeftArrow" onClick={handlePrevPage} />
      <h1 className={styles.title}>마이 페이지</h1>
      <Link href="/mypage/settings/service">
        <Icon icon="Gear" />
      </Link>
    </header>
  );
};

export default Header;
