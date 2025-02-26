import styles from './Header.module.scss';
import { getDisplayName } from '@/utils/hallName';

interface HeaderProps {
  hall: string;
}

const Header = ({ hall }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <h1>{getDisplayName(hall)}</h1>
    </header>
  );
};

export default Header;
