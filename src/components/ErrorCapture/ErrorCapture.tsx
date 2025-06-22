'use client';

import { useEffect } from 'react';
import { useErrorContext } from '@/providers/ErrorProvider';
import { useToast } from '@/providers/ToastProvider';
import ApiRequestError from '@/utils/ApiRequestError';
import { logError } from '@/utils/logError';

const ErrorCapture = () => {
  const { error } = useErrorContext();
  const { activateToast } = useToast();

  useEffect(() => {
    if (!error) return;

    logError(error);

    const isApiRequestError = error instanceof ApiRequestError;
    const strategy = isApiRequestError ? error.strategy : 'errorBoundary';

    // 전략에 따른 처리
    if (strategy === 'toast') {
      activateToast(error.message, 'Warning');
    } else {
      throw error;
    }
  }, [error]);

  return null;
};

export default ErrorCapture;
