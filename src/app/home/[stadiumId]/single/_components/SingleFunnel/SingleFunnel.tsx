'use client';

import styles from './SingleFunnel.module.scss';
import React from 'react';
import useFunnel from '@/hooks/useFunnel';
import Button from '@/components/Button/Button';
import Spacing from '@/components/Spacing/Spacing';

interface SingleFunnelProps {
  stadiumId: number;
}

const SingleFunnel = ({ stadiumId }: SingleFunnelProps) => {
  const { Funnel, currentStep, setStep, data, setData } = useFunnel<
    'Section' | 'Seating' | 'Result',
    {
      sectionId: number;
      seatingId: number;
    }
  >('Section');

  return (
    <>
      <div>네비게이션바 (stadiumId: {stadiumId})</div>
      <Spacing size={32} />
      <main className={styles.singleFunnelLayout}>
        <Funnel currentStep={currentStep}>
          <Funnel.Step name="Section">
            <div>섹션 선택 영역</div>
            <Button
              onClick={() => {
                setData((prev) => ({ ...prev, sectionId: 10 }));
                setStep('Seating');
              }}
            >
              좌석 선택으로
            </Button>
          </Funnel.Step>

          <Funnel.Step name="Seating">
            <div>좌석 선택 영역</div>
            <Button
              onClick={() => {
                setData((prev) => ({ ...prev, seatingId: 42 }));
                setStep('Result');
              }}
            >
              결과 보기로
            </Button>
          </Funnel.Step>

          <Funnel.Step name="Result">
            <div>결과 페이지</div>
            <p>선택된 섹션: {data.sectionId}</p>
            <p>선택된 좌석: {data.seatingId}</p>
            <Button onClick={() => setStep('Section')}>처음으로</Button>
          </Funnel.Step>
        </Funnel>
      </main>
    </>
  );
};

export default SingleFunnel;
