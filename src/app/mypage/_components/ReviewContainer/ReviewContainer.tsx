'use client';

import styles from './ReviewContainer.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFetchMemberInfo } from '@/hooks/queries/useFetchMember';
import { REVIEW_TAP, VIEW_TAP } from '@/constants/myPage';

const ReviewContainer = ({ children }) => {
  const pathname = usePathname();
  const { data: memberInfo } = useFetchMemberInfo();

  const tabType = pathname.split('/')[2];

  return (
    <div className={styles.collectionContainer}>
      <div className={styles.reviewTap}>
        <div
          className={classNames(styles.tap, {
            [styles.active]: tabType === VIEW_TAP,
          })}
        >
          <Link href="/mypage/view">관심시야 {memberInfo?.favoriteCount}</Link>
        </div>
        <div
          className={classNames(styles.tap, {
            [styles.active]: tabType === REVIEW_TAP,
          })}
        >
          <Link href="/mypage/review">내후기 {memberInfo?.myReviewCount}</Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ReviewContainer;
