import styles from './Header.module.scss';
import { stadiumDisplayName } from '@/utils/stadium';

interface HeaderProps {
  stadiumId: number;
}

const Header = ({ stadiumId }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <h1>{stadiumDisplayName(stadiumId)}</h1>
    </header>
  );
};

export default Header;
