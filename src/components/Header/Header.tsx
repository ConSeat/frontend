'use client';

import Spacing from '../Spacing/Spacing';
import styles from './Header.module.scss';
import { useRouter } from 'next/navigation';
import { LeftArrow } from '@/assets';
import { stadiumDisplayName } from '@/utils/stadium';

interface HeaderProps {
  stadiumId: number;
}

const Header = ({ stadiumId }: HeaderProps) => {
  const router = useRouter();

  const handlePrevPage = () => {
    router.back();
  };

  return (
    <header className={styles.header}>
      <button onClick={handlePrevPage}>
        <LeftArrow />
      </button>
      <h1 className={styles.headerTitle}>{stadiumDisplayName(stadiumId)}</h1>
      <Spacing direction="horizontal" size={32} />
    </header>
  );
};

export default Header;
