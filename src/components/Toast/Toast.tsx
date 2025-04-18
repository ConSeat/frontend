'use client';

import styles from './Toast.module.scss';

export type ToastType = 'default' | 'warning' | 'error';

interface ToastProps {
  type?: ToastType;
  text: string;
  onClose: () => void;
}

const Toast = ({ type = 'default', text, onClose }: ToastProps) => {
  const emoji = {
    default: '🔗',
    warning: '⚠️',
    error: '🚫',
  };

  return (
    <div className={styles.toastLayout} onAnimationEnd={onClose}>
      <div className={styles.text}>{`${emoji[type]} ${text}`}</div>
    </div>
  );
};

export default Toast;
