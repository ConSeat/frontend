'use client';

import styles from './ReviewDropdown.module.scss';
import classNames from 'classnames';
import useDropdown from '@/hooks/useDropdown';
import Dropdown from '@/components/Dropdown/Dropdown';
import Splitter from '@/components/Splitter/Splitter';
import { DownArrow, UpArrow } from '@/assets';

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
          <button
            onClick={handleToggleDropdown}
            className={classNames(styles.reviewDropdownButton, {
              [styles.isOpen]: isDropdownOpen,
            })}
          >
            <span className={value ? '' : styles.placeholder}>{value || placeholder}</span>
            {isDropdownOpen ? <UpArrow /> : <DownArrow />}
          </button>
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
