'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import Popup from '@/components/Popup';
import Portal from '@/components/Portal';

interface PopupContext {
  showPopup: (data: PopupData) => void;
  hidePopup: () => void;
}

interface PopupData {
  title: string;
  subtitle: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const initPopupData = {
  title: '',
  subtitle: '',
  confirmText: '네',
  cancelText: '아니요',
  onConfirm: () => {},
  onCancel: undefined,
};

const PopupContext = createContext<PopupContext | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupData, setPopupData] = useState<PopupData>(initPopupData);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showPopup = (data: PopupData) => {
    setPopupData(data);
    setIsModalOpen(true);
  };

  const hidePopup = () => {
    setIsModalOpen(false);
    setPopupData(initPopupData);
  };

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}
      {isClient && (
        <Portal isOpen={isModalOpen}>
          <Modal>
            <Modal.Overlay onClick={hidePopup} />
            <Popup>
              <Popup.Title title={popupData.title} subtitle={popupData.subtitle} />
              <Popup.ButtonArea
                confirmText={popupData.confirmText ? popupData.confirmText : '네'}
                cancelText={popupData.cancelText ? popupData.cancelText : '아니요'}
                onConfirm={() => {
                  popupData.onConfirm();
                  hidePopup();
                }}
                onCancel={() => {
                  popupData.onCancel?.();
                  hidePopup();
                }}
              />
            </Popup>
          </Modal>
        </Portal>
      )}
    </PopupContext.Provider>
  );
};

export const usePopup = (): PopupContext => {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};
