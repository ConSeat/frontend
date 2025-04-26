'use client';

import { ReactNode, createContext, useContext, useState } from 'react';
import Portal from '@/components/Portal';
import Toast, { ToastType } from '@/components/Toast/Toast';

interface ToastContextType {
  activateToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('Info');

  const activateToast = (message: string, type: ToastType) => {
    setIsOpen(true);
    setMessage(message);
    setType(type);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <ToastContext.Provider value={{ activateToast }}>
      <Portal isOpen={isOpen}>
        <Toast type={type} text={message} onClose={onClose} />
      </Portal>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};
