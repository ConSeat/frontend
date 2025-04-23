import ProgressBar from '../../_components/ProgressBar/ProgressBar';
import { SINGLE_FUNNEL_STEPS } from '../_constants/funnelSteps';
import SingleResult from './_components/SingleResult';
import Spacing from '@/components/Spacing/Spacing';

const ResultPage = async ({ params }) => {
  const { stadiumId } = await params;
  const { seatingId } = await params;
  console.log(stadiumId, seatingId);
  if (!seatingId) {
    return <p>잘못된 접근입니다.</p>;
  }

  return (
    <>
      <ProgressBar steps={SINGLE_FUNNEL_STEPS} currentStep="Result" />

      <Spacing size={45} />

      <SingleResult stadiumId={stadiumId} data={{ seatingId }} />
    </>
  );
};

export default ResultPage;
