'use client';

import Icon from '../Icon/Icon';
import styles from './Toast.module.scss';
import colors from '@/styles/color';

export type ToastType = 'Info' | 'Success' | 'Warning' | 'LinkCopy';

interface ToastProps {
  type?: ToastType;
  text: string;
  onClose: () => void;
}

const Toast = ({ type = 'Info', text, onClose }: ToastProps) => {
  return (
    <div className={styles.toastLayout} onAnimationEnd={onClose}>
      <Icon icon={type} size={20} color={colors.mainMint1} />
      <div className={styles.text}>{`${text}`}</div>
    </div>
  );
};

export default Toast;
