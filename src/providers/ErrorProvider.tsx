'use client';

import { createContext, useContext, useState } from 'react';

type ErrorContextType = {
  error: Error | null;
  setError: (error: Error | null) => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<Error | null>(null);

  return <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>;
};

export const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (!context) throw new Error('useErrorContext must be used within ErrorProvider');

  return context;
};
