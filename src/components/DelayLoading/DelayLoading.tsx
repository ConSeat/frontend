'use client';

import { useEffect, useState } from 'react';

interface DelayLoadingProps {
  delay?: number;
  children: React.ReactNode;
}

const DelayLoading = ({ delay = 500, children }: DelayLoadingProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return show ? <>{children}</> : null;
};

export default DelayLoading;
