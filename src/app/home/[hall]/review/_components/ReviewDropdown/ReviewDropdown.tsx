'use client';

import ReviewDropdownButton from '../ReivewDropdownButton/ReviewDropdownButton';
import styles from './ReviewDropdown.module.scss';
import useDropdown from '@/hooks/useDropdown';
import Dropdown from '@/components/Dropdown/Dropdown';
import Splitter from '@/components/Splitter/Splitter';

interface ReviewDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

const ReviewDropdown = ({ value, onChange, options, placeholder }: ReviewDropdownProps) => {
  const { isDropdownOpen, handleToggleDropdown, dropdownRef } = useDropdown();

  return (
    <Dropdown value={value} onChange={onChange} ref={dropdownRef}>
      <Dropdown.Trigger
        as={
          <ReviewDropdownButton
            value={value}
            placeholder={placeholder}
            isDropdownOpen={isDropdownOpen}
            handleToggleDropdown={handleToggleDropdown}
          />
        }
      />
      {isDropdownOpen && (
        <Dropdown.Menu className={styles.reviewDropdownMenu}>
          {options.map((option) => (
            <>
              <Dropdown.Item
                key={option}
                className={styles.reviewDropdownItem}
                isSelected={value === option}
                onClick={() => {
                  onChange(option);
                  handleToggleDropdown();
                }}
              >
                {option}
              </Dropdown.Item>
              <Splitter color="subGray7" />
            </>
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default ReviewDropdown;
