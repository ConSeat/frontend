'use client';

import styles from './Header.module.scss';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon/Icon';

const Header = () => {
  const router = useRouter();

  const handlePrevPage = () => {
    router.back();
  };

  const handleEditPage = () => {
    router.push('/mypage/edit');
  };

  return (
    <header className={styles.header}>
      <Icon icon="LeftArrow" onClick={handlePrevPage} />
      <h1 className={styles.title}>마이 페이지</h1>
      <Icon icon="Gear" onClick={handleEditPage} />
    </header>
  );
};

export default Header;
