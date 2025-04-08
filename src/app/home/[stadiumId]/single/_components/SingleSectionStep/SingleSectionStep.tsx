import styles from './SingleSectionStep.module.scss';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '@/components/Button/Button';
import ButtonContainer from '@/components/ButtonContainer/ButtonContainer';
import PageExplanation from '@/components/PageExplanation';
import Spacing from '@/components/Spacing/Spacing';
import StageView from '@/components/StageView';

const SingleSectionStep = ({ stadiumId, step, setStep, data, setData }) => {
  const router = useRouter();

  return (
    <>
      <div className={styles.singleSectionStepLayout}>
        <div className={styles.pageExplanationContainer}>
          <PageExplanation>
            <PageExplanation.Title>
              시야를 확인할
              <br />
              <span>구역</span>을 선택해주세요
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
            // variant={data.sectionId ? 'primary' : 'inactive'}
            // disabled={!data.sectionId}
            onClick={() => setStep('Seating')}
          >
            다음
          </Button>
        </ButtonContainer>
      </div>
    </>
  );
};

export default SingleSectionStep;
