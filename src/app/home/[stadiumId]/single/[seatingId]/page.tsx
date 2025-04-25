import ProgressBar from '../../_components/ProgressBar/ProgressBar';
import { SINGLE_FUNNEL_STEPS } from '../_constants/funnelSteps';
import SingleResult from './_components/SingleResult';
import { HydrationBoundary } from '@tanstack/react-query';
import Spacing from '@/components/Spacing/Spacing';
import { seatingReviewQueries } from '@/apis/review/seating.query';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';

const ResultPage = async ({ params }) => {
  const { stadiumId } = await params;
  const { seatingId } = await params;
  const { dehydratedState } = await createPrefetchedQueryClient([
    seatingReviewQueries.seating(seatingId),
  ]);

  if (!stadiumId || !seatingId) {
    return <p>잘못된 접근입니다.</p>;
  }

  return (
    <>
      <ProgressBar steps={SINGLE_FUNNEL_STEPS} currentStep="Result" />

      <Spacing size={45} />
      <HydrationBoundary state={dehydratedState}>
        <SingleResult stadiumId={stadiumId} seatingId={seatingId} />
      </HydrationBoundary>
    </>
  );
};

export default ResultPage;
