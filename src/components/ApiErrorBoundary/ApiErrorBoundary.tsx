'use client';

import styles from './ApiErrorBoundary.module.scss';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import { ReactNode, useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Button from '@/components/Button/Button';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  queryKey: QueryKey;
}

const Fallback = ({ error, resetErrorBoundary, queryKey }: FallbackProps) => {
  const queryClient = useQueryClient();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      queryClient.invalidateQueries({ queryKey });
      queryClient.resetQueries({ queryKey, exact: true });
      hasInitialized.current = true;
    }
  }, [queryClient, queryKey]);

  return (
    <div className={styles.fallbackContainer}>
      <h2 className={styles.fallbackTitle}>요청을 처리하지 못했어요.</h2>
      <p className={styles.errorMessage}>{error.message}</p>
      <Button variant="primary" onClick={resetErrorBoundary}>
        다시 시도
      </Button>
    </div>
  );
};

interface ApiErrorBoundaryProps {
  children: ReactNode;
  queryKey: QueryKey;
  resetKey?: string[];
}

const ApiErrorBoundary = ({ children, queryKey, resetKey }: ApiErrorBoundaryProps) => {
  const queryClient = useQueryClient();

  return (
    <ErrorBoundary
      resetKeys={resetKey ? [window.location.pathname, ...resetKey] : [window.location.pathname]}
      onReset={() => {
        queryClient.invalidateQueries({ queryKey });
        queryClient.resetQueries({ queryKey, exact: true });
      }}
      fallbackRender={({ error, resetErrorBoundary }) => {
        const handleReset = () => {
          queryClient.invalidateQueries({ queryKey });
          queryClient.resetQueries({ queryKey, exact: true });
          resetErrorBoundary();
        };

        return <Fallback error={error} resetErrorBoundary={handleReset} queryKey={queryKey} />;
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ApiErrorBoundary;
