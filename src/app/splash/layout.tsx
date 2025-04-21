import type { ReactNode } from 'react';
import MainBackground from '@/components/Background/MainBackground';

interface SplashLayoutProps {
  children: ReactNode;
}

const layout = ({ children }: SplashLayoutProps) => {
  return (
    <div>
      <MainBackground />
      {children}
    </div>
  );
};

export default layout;
