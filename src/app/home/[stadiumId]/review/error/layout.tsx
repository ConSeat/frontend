import type { ReactNode } from 'react';
import MainBackground from '@/components/Background/MainBackground';

interface ErrorLayoutProps {
  children: ReactNode;
}

const ErrorLayout = ({ children }: ErrorLayoutProps) => {
  return (
    <>
      <MainBackground />
      {children}
    </>
  );
};

export default ErrorLayout;
