'use client';

import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  if (!isOpen) return null;

  const portal = document.getElementById('portal');

  if (portal === null) {
    console.error(
      'Portal element not found. Please ensure there is a <div id="portal"> in your layout.',
    );
    return null;
  }

  return createPortal(
    <>
      <div className={styles.overLay} onClick={onClose} />
      {children}
    </>,
    portal,
  );
};

export default Modal;
