'use client';

import { type ReactElement, ReactNode, isValidElement, useState } from 'react';

// Step 정의
interface StepProps {
  name: string;
  children: ReactNode;
}

const Step = ({ children }: StepProps) => {
  return children;
};

// Step 타입 가드
const isStepElement = (element: ReactNode): element is ReactElement<StepProps, typeof Step> => {
  return isValidElement(element) && element.type === Step;
};

// Funnel 컴포넌트
interface FunnelProps<TStep extends string> {
  children: ReactNode;
  currentStep: TStep;
}

const Funnel = <TStep extends string>({ children, currentStep }: FunnelProps<TStep>) => {
  const stepsArray = Array.isArray(children) ? children : [children];

  const targetStep = stepsArray.find(
    (child): child is ReactElement<StepProps, typeof Step> =>
      isStepElement(child) && child.props.name === currentStep,
  );

  return <>{targetStep}</>;
};

Funnel.Step = Step;

// useFunnel 훅
const useFunnel = <T extends string, D extends object>(config: {
  initialStep: T;
  initialData?: Partial<D>;
}) => {
  const [step, setStep] = useState<T>(config.initialStep);
  const [data, setData] = useState<Partial<D>>(config.initialData ?? {});

  return {
    Funnel,
    step,
    setStep,
    data,
    setData,
  };
};

export default useFunnel;
