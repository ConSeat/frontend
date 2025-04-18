import type { ReactNode } from 'react';
import MainBackground from '@/components/Background/MainBackground';

interface CallbackLayoutProps {
  children: ReactNode;
}

const layout = ({ children }: CallbackLayoutProps) => {
  return (
    <div>
      <MainBackground />
      {children}
    </div>
  );
};

export default layout;
