'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RootPage = () => {
  const router = useRouter();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('visited');

    if (!hasVisited) {
      sessionStorage.setItem('visited', 'true');
      router.replace('/splash');
    } else {
      router.replace('/home');
    }
  }, []);

  return null;
};

export default RootPage;
