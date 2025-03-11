'use client';

import styles from './Modal.module.scss';
import { useRouter } from 'next/navigation';

interface ModalProps {
  children: React.ReactNode;
  overlayStyle: 'blur' | 'default';
}

const Modal = ({ children, overlayStyle }: ModalProps) => {
  const router = useRouter();

  return (
    <>
      <div
        className={styles[overlayStyle]}
        onClick={() => {
          router.back();
        }}
      />
      {children}
    </>
  );
};

export default Modal;
