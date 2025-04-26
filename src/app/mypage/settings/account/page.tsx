import AccountHeader from './_components/AccountHeader/AccountHeader';
import EditSection from './_components/EditSection';
import styles from './account.module.scss';
import { HydrationBoundary } from '@tanstack/react-query';
import { memberQueries } from '@/apis/members/member.query';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';

const Page = async () => {
  const { dehydratedState } = await createPrefetchedQueryClient([memberQueries.info]);

  return (
    <div className={styles.layout}>
      <AccountHeader />
      <HydrationBoundary state={dehydratedState}>
        <EditSection />
      </HydrationBoundary>
    </div>
  );
};

export default Page;
