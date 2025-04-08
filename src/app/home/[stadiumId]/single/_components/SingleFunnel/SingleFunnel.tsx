'use client';

import ProgressBar from '../../../_components/ProgressBar/ProgressBar';
import SingleResultStep from '../SingleResultStep/SingleResultStep';
import SingleSeatingStep from '../SingleSeatingStep/SingleSeatingStep';
import SingleSectionStep from '../SingleSectionStep/SingleSectionStep';
import React from 'react';
import useFunnel from '@/hooks/useFunnel';
import Spacing from '@/components/Spacing/Spacing';

interface SingleFunnelProps {
  stadiumId: number;
}

type Step = 'Section' | 'Seating' | 'Result';

interface SingleFunnelData {
  sectionId: number;
  seatingId: number;
}

const SingleFunnel = ({ stadiumId }: SingleFunnelProps) => {
  const { Funnel, step, setStep, data, setData } = useFunnel<Step, SingleFunnelData>({
    initialStep: 'Section',
    initialData: {
      sectionId: 0,
      seatingId: 0,
    },
  });

  return (
    <>
      <ProgressBar steps={['Section', 'Seating', 'Result']} currentStep={step} />

      <Spacing size={45} />

      <Funnel currentStep={step}>
        <Funnel.Step name="Section">
          <SingleSectionStep
            stadiumId={stadiumId}
            step={step}
            setStep={setStep}
            data={data}
            setData={setData}
          />
        </Funnel.Step>

        <Funnel.Step name="Seating">
          <SingleSeatingStep
            stadiumId={stadiumId}
            step={step}
            setStep={setStep}
            data={data}
            setData={setData}
          />
        </Funnel.Step>

        <Funnel.Step name="Result">
          <SingleResultStep stadiumId={stadiumId} />
        </Funnel.Step>
      </Funnel>
    </>
  );
};

export default SingleFunnel;
