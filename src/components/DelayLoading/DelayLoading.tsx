'use client';

import PageLoading from '../PageLoading';
import { useEffect, useState } from 'react';

export default function DelayLoading({ delay = 500 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return show ? <PageLoading /> : null;
}
