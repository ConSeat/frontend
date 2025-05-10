import type { ReactNode } from 'react';
import ThirdBackground from '@/components/Background/ThirdBackground';

interface ContactLayoutProps {
  children: ReactNode;
}

const layout = ({ children }: ContactLayoutProps) => {
  return (
    <>
      <ThirdBackground />
      {children}
    </>
  );
};

export default layout;
