'use client';

import { useErrorContext } from './ErrorProvider';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  isServer,
} from '@tanstack/react-query';
import React from 'react';

function makeQueryClient(setError) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        throwOnError: true,
        staleTime: 60 * 1000,
        networkMode: 'online',
      },
      mutations: {
        networkMode: 'always',
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        setError(error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        setError(error);
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient(setError) {
  if (isServer) {
    return makeQueryClient(setError);
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient(setError);
    return browserQueryClient;
  }
}

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const { setError } = useErrorContext();
  const queryClient = getQueryClient(setError);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
