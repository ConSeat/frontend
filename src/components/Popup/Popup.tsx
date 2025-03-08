import styles from './Popup.module.scss';
import Button from '@/components/Button/Button';

interface Popup {
  subtitle: string;
  bodyText: string;
  onClose: () => void;
  onClick: () => void;
}

const Popup = ({ subtitle, bodyText, onClose, onClick }: Popup) => {
  return (
    <div className={styles.popupLayout}>
      <div className={styles.popupTextBox}>
        <div className={styles.subtitle}>{subtitle}</div>
        <div className={styles.bodyText}>{bodyText}</div>
      </div>
      <div className={styles.buttonBox}>
        <Button className={styles.noButton} onClick={onClose}>
          아니요
        </Button>
        <Button className={styles.yesButton} onClick={onClick}>
          네
        </Button>
      </div>
    </div>
  );
};

export default Popup;
