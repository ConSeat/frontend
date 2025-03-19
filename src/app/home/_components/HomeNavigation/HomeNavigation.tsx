import styles from './HomeNavigation.module.scss';
import Link from 'next/link';
import Icon from '@/components/Icon/Icon';

const HomeNavigation = () => {
  return (
    <nav className={styles.homeNav}>
      <Link href="/mypage">
        <Icon icon="DefaultProfile" />
      </Link>
      <Link href="#">
        <Icon icon="QnA" />
      </Link>
    </nav>
  );
};

export default HomeNavigation;
