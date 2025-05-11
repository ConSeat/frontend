import styles from './MyPage.module.scss';
import MyHeader from './_components/MyHeader/MyHeader';
import UserInfoContainer from './_components/UserInfoContainer';
import { HydrationBoundary } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import ThirdBackground from '@/components/Background/ThirdBackground';
import { memberQueries } from '@/apis/members/member.query';
import { reviewQueries } from '@/apis/review/review.query';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';

interface MyPageLayoutProps {
  panel: ReactNode;
}

const layout = async ({ panel }: MyPageLayoutProps) => {
  const { dehydratedState } = await createPrefetchedQueryClient([
    memberQueries.info,
    memberQueries.bookmarkStadiums,
    reviewQueries.myReviewStadiums,
  ]);

  return (
    <div className={styles.layout}>
      <ThirdBackground />
      <div className={styles.pageLayout}>
        <MyHeader />
        <HydrationBoundary state={dehydratedState}>
          <UserInfoContainer />
          {panel}
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default layout;
