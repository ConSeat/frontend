import ProgressBar from '../../_components/ProgressBar/ProgressBar';
import { SINGLE_FUNNEL_STEPS } from '../_constants/funnelSteps';
import SingleResult from './_components/SingleResult';
import { HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Spacing from '@/components/Spacing/Spacing';
import { getSeatingReviews } from '@/apis/review/seating.api';
import { seatingReviewQueries } from '@/apis/review/seating.query';
import { getStadiumList } from '@/apis/stadium/stadium.api';
import type { StadiumInfo } from '@/types/stadium';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';

type Props = {
  params: { stadiumId: string; seatingId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stadiumId, seatingId } = params;
  const { data: stadiumData } = await getStadiumList();
  const data = await getSeatingReviews(Number(seatingId));

  const stadium = stadiumData.active?.find((s: StadiumInfo) => s.stadiumId === Number(stadiumId));

  const title =
    `${stadium?.stadiumName}` +
    `${data.floorName} ${data.sectionName}` +
    (data.seatingName ? ` ${data.seatingName}` : '');
  const description = '구역별 콘서트 시야를 확인해보세요';

  return { title, description };
}

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
