import styles from './MyPage.module.scss';
import MyHeader from './_components/MyHeader/MyHeader';
import UserInfoContainer from './_components/UserInfoContainer';
import { HydrationBoundary } from '@tanstack/react-query';
import { memberQueries } from '@/apis/members/member.query';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';

const MyPage = async () => {
  const { dehydratedState } = await createPrefetchedQueryClient([memberQueries.info]);

  return (
    <div className={styles.pageLayout}>
      <MyHeader />
      <div className={styles.userInfoArea}>
        <HydrationBoundary state={dehydratedState}>
          <UserInfoContainer />
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default MyPage;
