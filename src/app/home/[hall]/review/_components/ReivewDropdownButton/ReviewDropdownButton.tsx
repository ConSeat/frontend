import styles from './ReviewDropdownButton.module.scss';
import classNames from 'classnames';
import { DownArrow, UpArrow } from '@/assets';

interface ReviewDropdownButtonProps {
  value: string;
  placeholder: string;
  isDropdownOpen: boolean;
  handleToggleDropdown: () => void;
}

const ReviewDropdownButton = ({
  value,
  placeholder,
  isDropdownOpen,
  handleToggleDropdown,
}: ReviewDropdownButtonProps) => {
  return (
    <button
      onClick={handleToggleDropdown}
      className={classNames(styles.reviewDropdownButton, {
        [styles.isOpen]: isDropdownOpen,
      })}
    >
      <span className={value ? '' : styles.placeholder}>{value || placeholder}</span>
      {isDropdownOpen ? <UpArrow /> : <DownArrow />}
    </button>
  );
};

export default ReviewDropdownButton;
