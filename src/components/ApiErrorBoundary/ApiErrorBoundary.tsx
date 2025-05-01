'use client';

import styles from './ApiErrorBoundary.module.scss';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Button from '@/components/Button/Button';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  queryKey: QueryKey;
}

const Fallback = ({ error, resetErrorBoundary, queryKey }: FallbackProps) => {
  const queryClient = useQueryClient();

  const handleReset = () => {
    queryClient.invalidateQueries({ queryKey });
    resetErrorBoundary();
  };

  return (
    <div className={styles.fallbackContainer}>
      <h2 className={styles.fallbackTitle}>요청을 처리하지 못했어요.</h2>
      <p className={styles.errorMessage}>{error.message}</p>
      <Button variant="primary" onClick={handleReset}>
        다시 시도
      </Button>
    </div>
  );
};

interface ApiErrorBoundaryProps {
  children: ReactNode;
  queryKey: QueryKey;
  resetKey?: string;
}

const ApiErrorBoundary = ({ children, queryKey, resetKey }: ApiErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      resetKeys={[resetKey]}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <Fallback error={error} resetErrorBoundary={resetErrorBoundary} queryKey={queryKey} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
export default ApiErrorBoundary;
