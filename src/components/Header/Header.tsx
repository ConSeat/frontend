'use client';

import Icon from '../Icon/Icon';
import Spacing from '../Spacing/Spacing';
import styles from './Header.module.scss';
import { useRouter } from 'next/navigation';
import type { StadiumInfo } from '@/types/stadium';

interface HeaderProps {
  stadium: StadiumInfo;
}

const Header = ({ stadium }: HeaderProps) => {
  const router = useRouter();

  const handlePrevPage = () => {
    router.back();
  };

  return (
    <header className={styles.header}>
      <Icon icon="LeftArrow" onClick={handlePrevPage} />
      <h1 className={styles.headerTitle}>{stadium.stadiumName}</h1>
      <Spacing direction="horizontal" size={32} />
    </header>
  );
};

export default Header;
