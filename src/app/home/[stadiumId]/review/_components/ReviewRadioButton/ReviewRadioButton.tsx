import styles from './ReviewRadioButton.module.scss';
import Icon from '@/components/Icon/Icon';

interface ReviewRadioButtonProps {
  name: string;
  value: string;
  onChange: () => void;
  isLastLabel: boolean;
}

const ReviewRadioButton = ({ name, value, isLastLabel, onChange }: ReviewRadioButtonProps) => {
  return (
    <label className={styles.radioArea}>
      <input
        type="radio"
        name={name}
        value={value}
        className={styles.radioInput}
        onChange={onChange}
      />
      <Icon icon="ChoiceCircle" className={styles.radioIcon} />
      <div className={styles.radioText}>{value}</div>
      {!isLastLabel && <div className={styles.radioSplitter} />}
    </label>
  );
};

export default ReviewRadioButton;
