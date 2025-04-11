import type { SingleFunnelData, Step } from '../../_types/funnel';
import styles from './SingleSectionStep.module.scss';
import { useRouter } from 'next/navigation';
import React, { type Dispatch, type SetStateAction } from 'react';
import Button from '@/components/Button/Button';
import ButtonContainer from '@/components/ButtonContainer/ButtonContainer';
import Highlight from '@/components/Highlight/Highlight';
import PageExplanation from '@/components/PageExplanation';
import Spacing from '@/components/Spacing/Spacing';
import StageView from '@/components/StageView';

interface SingleSectionStepProps {
  stadiumId: number;
  setStep: (step: Step) => void;
  data: Partial<SingleFunnelData>;
  setData: Dispatch<SetStateAction<Partial<SingleFunnelData>>>;
}

const SingleSectionStep = ({ stadiumId, setStep, setData }: SingleSectionStepProps) => {
  const router = useRouter();

  return (
    <>
      <div className={styles.singleSectionStepLayout}>
        <div className={styles.pageExplanationContainer}>
          <PageExplanation>
            <PageExplanation.Title>
              시야를 확인할
              <br />
              <Highlight>구역</Highlight>을 선택해주세요
            </PageExplanation.Title>
            <PageExplanation.Subtitle>손가락으로 좌석표를 확대해보세요</PageExplanation.Subtitle>
          </PageExplanation>
        </div>

        <Spacing size={32} />

        <div className={styles.stageViewContainer}>
          <StageView stageSVGSrc={`/stadium/${stadiumId}.svg`} />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <ButtonContainer>
          <Button variant="secondary" onClick={() => router.push(`/home/${stadiumId}`)}>
            이전
          </Button>
          <Button
            // TODO: 구역 선택 기능이 추가되면 주석 해제
            // variant={data.sectionId ? 'primary' : 'inactive'}
            // disabled={!data.sectionId}
            onClick={() => {
              setStep('Seating');
              setData((prev) => ({ ...prev, sectionId: 1 }));
            }}
          >
            다음
          </Button>
        </ButtonContainer>
      </div>
    </>
  );
};

export default SingleSectionStep;
