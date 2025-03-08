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
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <div className={styles.buttonBox}>
      <Button className={styles.noButton} onClick={onClose}>
        아니요
      </Button>
      <Button className={styles.yesButton} onClick={onConfirm}>
        네
      </Button>
    </div>
  );
};

Popup.Title = PopupTitle;
Popup.ButtonArea = PopupButtonArea;

export default Popup;
