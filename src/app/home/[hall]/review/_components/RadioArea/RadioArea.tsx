import styles from './RadioArea.module.scss';
import { ChoiceCircle } from '@/assets';

interface RadioAreaProps {
  name: string;
  value: string;
  onChange: () => void;
  isLastLabel: boolean;
}

const RadioArea = ({ name, value, isLastLabel, onChange }: RadioAreaProps) => {
  return (
    <label className={styles.RadioArea}>
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

export default RadioArea;
