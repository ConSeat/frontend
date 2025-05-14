import type { ReactNode } from 'react';

interface SingleLayoutProps {
  children: ReactNode;
}

const SingleLayout = ({ children }: SingleLayoutProps) => {
  return <>{children}</>;
};

export default SingleLayout;
