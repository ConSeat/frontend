'use client';

import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const portal = typeof window !== 'undefined' && document.querySelector('#portal');

  return portal && children ? ReactDOM.createPortal(children, portal) : null;
};

export default Portal;
