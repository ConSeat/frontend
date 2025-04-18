'use client';

import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
  isOpen: boolean;
}

const Portal = ({ children, isOpen }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // 클라이언트에서 마운트 완료
    return () => setMounted(false); // cleanup
  }, []);

  if (!mounted || !isOpen || !children) return null;

  const portal = document.querySelector('#portal');
  if (!portal) return null;

  return ReactDOM.createPortal(children, portal);
};

export default Portal;
