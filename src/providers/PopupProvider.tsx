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
  onConfirm: () => void;
}

const PopupContext = createContext<PopupContext | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupData, setPopupData] = useState<PopupData>({
    title: '',
    subtitle: '',
    onConfirm: () => {},
  });
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
    setPopupData({ title: '', subtitle: '', onConfirm: () => {} });
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
                onConfirm={() => {
                  popupData.onConfirm();
                  hidePopup();
                }}
                onClose={hidePopup}
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
