import type { SingleFunnelData, Step } from '../../_types/funnel';
import styles from './SingleSectionStep.module.scss';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/Button/Button';
import ButtonContainer from '@/components/ButtonContainer/ButtonContainer';
import Highlight from '@/components/Highlight/Highlight';
import PageExplanation from '@/components/PageExplanation';
import Spacing from '@/components/Spacing/Spacing';
import StageView from '@/components/StageView';
import { parseBtnId } from '@/utils/parseBtnId';

interface SingleSectionStepProps {
  stadiumId: number;
  setStep: (step: Step) => void;
  data: Partial<SingleFunnelData>;
  setData: React.Dispatch<React.SetStateAction<Partial<SingleFunnelData>>>;
}

const SingleSectionStep = ({ stadiumId, setStep, data, setData }: SingleSectionStepProps) => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
          <StageView
            stageSVGSrc={`/stadium/${stadiumId}.svg`}
            selectedId={selectedId}
            onSelectSection={(id) => {
              setSelectedId(id);
              const { sectionId } = parseBtnId(id);
              setData((prev) => ({ ...prev, sectionId }));
            }}
          />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <ButtonContainer>
          <Button variant="secondary" onClick={() => router.push(`/home/${stadiumId}`)}>
            이전
          </Button>
          <Button
            variant={data.sectionId ? 'primary' : 'inactive'}
            disabled={!data.sectionId}
            onClick={() => {
              if (!selectedId) return;

              const { floorInfo } = parseBtnId(selectedId);

              if (floorInfo.includes('floor')) {
                setStep('Result');
              } else {
                setStep('Seating');
              }
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
