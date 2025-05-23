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
import { META } from '@/constants/metadata';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';
import { getMetadata } from '@/utils/getMetadata';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { stadiumId, seatingId } = await params;

  const { data: stadiumList } = await getStadiumList();
  const seatInfo = await getSeatingReviews(Number(seatingId));
  const stadium = stadiumList.active?.find((s) => s.stadiumId === Number(stadiumId));

  if (!stadium) notFound();

  const title = `[${stadium.stadiumName}] ${seatInfo.floorName} ${seatInfo.sectionName}${
    seatInfo.seatingName ? ` ${seatInfo.seatingName}` : ''
  } 시야`;
  const description = 'CON:SEAT에서 구역별 시야를 확인해보세요';
  const asPath = `${META.url}/home/${stadiumId}/single/${seatingId}`;
  const ogImage = seatInfo.reviews?.[0]?.images?.[0] || undefined;

  return getMetadata({
    title,
    description,
    asPath,
    ogImage,
  });
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
