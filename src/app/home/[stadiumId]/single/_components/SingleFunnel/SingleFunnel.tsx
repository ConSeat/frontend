'use client';

import ProgressBar from '../../../_components/ProgressBar/ProgressBar';
import { SINGLE_FUNNEL_STEPS } from '../../_constants/funnelSteps';
import type { SingleFunnelData, Step } from '../../_types/funnel';
import SingleSeatingStep from '../SingleSeatingStep/SingleSeatingStep';
import SingleSectionStep from '../SingleSectionStep/SingleSectionStep';
import React from 'react';
import useFunnel from '@/hooks/common/useFunnel';
import Spacing from '@/components/Spacing/Spacing';

interface SingleFunnelProps {
  stadiumId: number;
}

const SingleFunnel = ({ stadiumId }: SingleFunnelProps) => {
  const { Funnel, step, setStep, data, setData } = useFunnel<Step, SingleFunnelData>({
    initialStep: SINGLE_FUNNEL_STEPS[0],
    initialData: {
      sectionId: 0,
      seatingId: 0,
    },
  });

  return (
    <>
      <ProgressBar steps={SINGLE_FUNNEL_STEPS} currentStep={step} />

      <Spacing size={45} />

      <Funnel currentStep={step}>
        <Funnel.Step name="Section">
          <SingleSectionStep
            stadiumId={stadiumId}
            setStep={setStep}
            data={data}
            setData={setData}
          />
        </Funnel.Step>

        <Funnel.Step name="Seating">
          <SingleSeatingStep
            stadiumId={stadiumId}
            setStep={setStep}
            data={data}
            setData={setData}
          />
        </Funnel.Step>
      </Funnel>
    </>
  );
};

export default SingleFunnel;
