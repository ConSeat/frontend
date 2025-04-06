import styles from './HomeNavigation.module.scss';
import Link from 'next/link';
import Icon from '@/components/Icon/Icon';
import { MY_PAGE_QUERY, VIEW_TAP } from '@/constants/myPage';

const HomeNavigation = () => {
  return (
    <nav className={styles.homeNav}>
      <Link href={`/mypage?${MY_PAGE_QUERY}=${VIEW_TAP}`}>
        <Icon icon="DefaultProfile" />
      </Link>
      <Link href="#">
        <Icon icon="QnA" />
      </Link>
    </nav>
  );
};

export default HomeNavigation;
