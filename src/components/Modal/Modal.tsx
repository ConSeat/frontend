'use client';

import Spacing from '../Spacing/Spacing';
import styles from './Modal.module.scss';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { CloseCircle } from '@/assets';

interface ModalMainProps {
  children: ReactNode;
}

const ModalMain = ({ children }: ModalMainProps) => {
  return children;
};

interface ModalOverlayProps {
  className?: string;
  onClick: () => void;
}

const ModalOverlay = ({ className, onClick }: ModalOverlayProps) => {
  return <div className={classNames(styles.modalOverlay, className)} onClick={onClick}></div>;
};

interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

const ModalContent = ({ children, className }: ModalContentProps) => {
  return <div className={classNames(styles.modalContent, className)}>{children}</div>;
};

interface ModalTitleProps {
  title: string;
  onClose: () => void;
  showCloseButton?: boolean;
}

/**
 * @todo Icon 컴포넌트 생성
 * @todo width mixin 생성
 * @todo z-index mixin 생성
 */

const ModalTitle = ({ title, onClose, showCloseButton = true }: ModalTitleProps) => {
  return (
    <div className={styles.modalTitleContainer}>
      {showCloseButton && <Spacing direction="horizontal" size={36} />}
      <h1 className={styles.modalTitle}>{title}</h1>
      {showCloseButton && (
        <button onClick={onClose}>
          <CloseCircle />
        </button>
      )}
    </div>
  );
};

/**
 * Modal 컴포넌트에 Overlay와 Title을 합성하여 사용
 *
 * @example
 * <Modal>
 *   <Modal.Overlay />
 *   <Modal.Content>
 *    <Modal.Title title="모달 제목" onClose={() => {}} />
 *   </Modal.Content>
 * </Modal>
 */

const Modal = Object.assign(ModalMain, {
  Overlay: ModalOverlay,
  Content: ModalContent,
  Title: ModalTitle,
});

export default Modal;
