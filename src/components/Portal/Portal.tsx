'use client';

import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
  isOpen: boolean;
}

const Portal = ({ children, isOpen }: PortalProps) => {
  const portal = typeof window !== 'undefined' && document.querySelector('#portal');

  if (!isOpen || !portal || !children) return null;

  return ReactDOM.createPortal(children, portal);
};

export default Portal;
