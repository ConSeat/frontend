import type { ReactNode } from 'react';

interface SingleLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const SingleLayout = ({ children, modal }: SingleLayoutProps) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default SingleLayout;
