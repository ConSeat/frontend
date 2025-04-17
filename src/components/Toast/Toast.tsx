'use client';

import styles from './Toast.module.scss';

interface ToastProps {
  type?: 'default' | 'warning' | 'error';
  text: string;
}

const Toast = ({ type = 'default', text }: ToastProps) => {
  const emoji = {
    default: '🔗',
    warning: '⚠️',
    error: '🚫',
  };

  return (
    <div className={styles.toastLayout}>
      <div className={styles.text}>{`${emoji[type]} ${text}`}</div>
    </div>
  );
};

export default Toast;
