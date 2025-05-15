import type { ReactNode } from 'react';

interface AllLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const AllLayout = ({ children, modal }: AllLayoutProps) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default AllLayout;
