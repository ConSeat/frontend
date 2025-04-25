import styles from './Popup.module.scss';
import { ReactNode } from 'react';
import Button from '@/components/Button/Button';

const Popup = ({ children }: { children: ReactNode }) => {
  return <div className={styles.popupLayout}>{children}</div>;
};

const PopupTitle = ({ title, subtitle }: { title?: string; subtitle?: string }) => {
  return (
    <div className={styles.popupTitleWrapper}>
      {title && <h2 className={styles.popupTitle}>{title}</h2>}
      {subtitle && <p className={styles.popupSubtitle}>{subtitle}</p>}
    </div>
  );
};

const PopupButtonArea = ({
  confirmText,
  cancelText,
  onCancel,
  onConfirm,
  type = 'confirm',
}: {
  confirmText: string;
  cancelText: string;
  onCancel: () => void;
  onConfirm: () => void;
  type?: 'confirm' | 'alert';
}) => {
  return (
    <div className={styles.buttonBox}>
      {type === 'confirm' && (
        <Button className={styles.noButton} onClick={onCancel}>
          {cancelText}
        </Button>
      )}
      <Button className={styles.yesButton} onClick={onConfirm}>
        {confirmText}
      </Button>
    </div>
  );
};

Popup.Title = PopupTitle;
Popup.ButtonArea = PopupButtonArea;

export default Popup;
