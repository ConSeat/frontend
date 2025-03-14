import type { ReactNode } from 'react';

interface ReviewLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const ReviewLayout = ({ children, modal }: ReviewLayoutProps) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default ReviewLayout;
