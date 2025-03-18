import styles from './HomeNavigation.module.scss';
import Link from 'next/link';
import { DefaultProfile, QnA } from '@/assets';

const HomeNavigation = () => {
  return (
    <nav className={styles.homeNav}>
      <Link href="/mypage">
        <DefaultProfile />
      </Link>
      <Link href="#">
        <QnA />
      </Link>
    </nav>
  );
};

export default HomeNavigation;
