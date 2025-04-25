import ProgressBar from '../../_components/ProgressBar/ProgressBar';
import { SINGLE_FUNNEL_STEPS } from '../_constants/funnelSteps';
import SingleResult from './_components/SingleResult';
import { HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import Spacing from '@/components/Spacing/Spacing';
import { seatingReviewQueries } from '@/apis/review/seating.query';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';

const ResultPage = async ({ params }) => {
  const { stadiumId, seatingId } = await params;
  const { dehydratedState } = await createPrefetchedQueryClient([
    seatingReviewQueries.seating(seatingId),
  ]);

  if (!stadiumId || !seatingId) {
    notFound();
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
