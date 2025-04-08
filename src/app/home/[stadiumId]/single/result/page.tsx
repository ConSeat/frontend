'use client';

import ProgressBar from '../../_components/ProgressBar/ProgressBar';
import SingleResultStep from '../_components/SingleResultStep/SingleResultStep';
import { SINGLE_FUNNEL_STEPS } from '../_constants/funnelSteps';
import { useParams, useSearchParams } from 'next/navigation';
import Spacing from '@/components/Spacing/Spacing';

const ResultPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const stadiumId = Number(params.stadiumId);
  const sectionId = Number(searchParams.get('sectionId'));
  const seatingId = Number(searchParams.get('seatingId'));

  if (!sectionId || !seatingId || !stadiumId) {
    return <p>잘못된 접근입니다.</p>;
  }

  return (
    <>
      <ProgressBar steps={SINGLE_FUNNEL_STEPS} currentStep="Result" />

      <Spacing size={45} />

      <SingleResultStep stadiumId={stadiumId} data={{ sectionId, seatingId }} />
    </>
  );
};

export default ResultPage;
