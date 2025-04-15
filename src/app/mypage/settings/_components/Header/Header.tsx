'use client';

import styles from './Header.module.scss';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon/Icon';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const router = useRouter();

  const handleClickClose = () => {
    router.back();
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <Icon icon="Close" size={24} onClick={handleClickClose} />
    </header>
  );
};

export default Header;
