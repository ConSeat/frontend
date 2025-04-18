import type { ReactNode } from 'react';
import MainBackground from '@/components/Background/MainBackground';

interface SigninLayoutProps {
  children: ReactNode;
}

const layout = ({ children }: SigninLayoutProps) => {
  return (
    <div>
      <MainBackground />
      {children}
    </div>
  );
};

export default layout;
