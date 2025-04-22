import type { ReactNode } from 'react';
import MainBackground from '@/components/Background/MainBackground';

interface CompleteLayoutProps {
  children: ReactNode;
}

const CompleteLayout = ({ children }: CompleteLayoutProps) => {
  return (
    <>
      <MainBackground />
      {children}
    </>
  );
};

export default CompleteLayout;
