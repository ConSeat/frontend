'use client';

import styles from './ReviewContainer.module.scss';
import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import { useFetchMemberInfo } from '@/hooks/queries/useFetchMember';
import { REVIEW_TAP, VIEW_TAP } from '@/constants/myPage';

const ReviewContainer = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: memberInfo } = useFetchMemberInfo();

  const tabType = pathname.split('/')[2];

  const handleRouteView = () => {
    router.push(`/mypage/view`);
  };

  const handleRouteReView = () => {
    router.push(`/mypage/review`);
  };

  return (
    <div className={styles.collectionContainer}>
      <div className={styles.reviewTap}>
        <div
          className={classNames(styles.tap, {
            [styles.active]: tabType === VIEW_TAP,
          })}
          onClick={handleRouteView}
        >
          관심시야 {memberInfo?.favoriteCount}
        </div>
        <div
          className={classNames(styles.tap, {
            [styles.active]: tabType === REVIEW_TAP,
          })}
          onClick={handleRouteReView}
        >
          내후기 {memberInfo?.myReviewCount}
        </div>
      </div>
      {children}
    </div>
  );
};

export default ReviewContainer;
