'use client';

import { useEffect } from 'react';
import { useErrorContext } from '@/providers/ErrorProvider';
import { useToast } from '@/providers/ToastProvider';

const ErrorCapture = () => {
  const { error } = useErrorContext();
  const { activateToast } = useToast();

  useEffect(() => {
    if (!error) return;

    const isSplashPage = window.location.pathname === '/splash';
    if (isSplashPage) return;

    activateToast(error.message, 'Warning');
  }, [error]);

  return <></>;
};

export default ErrorCapture;
