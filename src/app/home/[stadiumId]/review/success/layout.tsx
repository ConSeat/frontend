import type { ReactNode } from 'react';
import MainBackground from '@/components/Background/MainBackground';

interface SuccessLayoutProps {
  children: ReactNode;
}

const SuccessLayout = ({ children }: SuccessLayoutProps) => {
  return (
    <>
      <MainBackground />
      {children}
    </>
  );
};

export default SuccessLayout;
