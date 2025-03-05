import styles from './RadioLabel.module.scss';
import { ChoiceCircle } from '@/assets';

interface RadioLabelProps {
  name: string;
  value: string;
  onChange: () => void;
  isLastLabel: boolean;
}

const RadioLabel = ({ name, value, isLastLabel, onChange }: RadioLabelProps) => {
  return (
    <label className={styles.radioLabel}>
      <input
        type="radio"
        name={name}
        value={value}
        className={styles.radioInput}
        onChange={onChange}
      />
      <ChoiceCircle className={styles.radioIcon} />
      <div className={styles.radioText}>{value}</div>
      {!isLastLabel && <div className={styles.radioSplitter} />}
    </label>
  );
};

export default RadioLabel;
