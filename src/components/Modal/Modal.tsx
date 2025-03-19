'use client';

import Icon from '../Icon/Icon';
import Spacing from '../Spacing/Spacing';
import styles from './Modal.module.scss';
import classNames from 'classnames';
import type { ReactNode } from 'react';

interface ModalMainProps {
  children: ReactNode;
}

const ModalMain = ({ children }: ModalMainProps) => {
  return children;
};

interface ModalOverlayProps {
  onClick: () => void;
  className?: string;
}

const ModalOverlay = ({ onClick, className }: ModalOverlayProps) => {
  return <div className={classNames(styles.modalOverlay, className)} onClick={onClick}></div>;
};

interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

const ModalContent = ({ children, className }: ModalContentProps) => {
  return <div className={classNames(styles.modalContent, className)}>{children}</div>;
};

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  showCloseButton?: boolean;
}

const ModalHeader = ({ title, onClose, showCloseButton = true }: ModalHeaderProps) => {
  return (
    <div className={styles.modalHeaderContainer}>
      {showCloseButton && <Spacing direction="horizontal" size={36} />}
      <h1 className={styles.modalTitle}>{title}</h1>
      {showCloseButton && <Icon icon="Close" size={19} onClick={onClose} />}
    </div>
  );
};

/**
 * Modal 컴포넌트에 Overlay와 Content를 합성하여 사용
 *
 * @example
 * <Modal>
 *   <Modal.Overlay onClose={() => {}} />
 *   <Modal.Content>
 *    <Modal.Header title="모달 제목" onClose={() => {}} />
 *   </Modal.Content>
 * </Modal>
 */

const Modal = Object.assign(ModalMain, {
  Overlay: ModalOverlay,
  Content: ModalContent,
  Header: ModalHeader,
});

export default Modal;
