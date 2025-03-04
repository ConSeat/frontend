'use client';

import styles from './ReviewDropdownInput.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import useDropdown from '@/hooks/useDropdown';
import Dropdown from '@/components/Dropdown/Dropdown';
import Splitter from '@/components/Splitter/Splitter';
import { DownArrow, UpArrow } from '@/assets';

interface ReviewDropdownInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

const ReviewDropdownInput = ({
  value,
  onChange,
  options,
  placeholder,
}: ReviewDropdownInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const { isDropdownOpen, handleOpenDropdown, handleCloseDropdown, dropdownRef } = useDropdown();

  const filterOptions = (value: string) => {
    setFilteredOptions(
      options.filter((option) => option.toLowerCase().includes(value.toLowerCase())),
    );
  };

  return (
    <Dropdown value={value} onChange={onChange} ref={dropdownRef}>
      <Dropdown.Trigger
        as={
          <div
            className={classNames(styles.reviewDropdownTrigger, {
              [styles.isOpen]: isDropdownOpen,
            })}
          >
            <input
              className={styles.reviewDropdownInput}
              type="text"
              value={inputValue}
              placeholder={placeholder}
              onChange={(e) => {
                const newValue = e.target.value;
                setInputValue(newValue);
                filterOptions(newValue);
              }}
              onFocus={() => {
                filterOptions(value);
                handleOpenDropdown();
              }}
            />
            <span>{isDropdownOpen ? <UpArrow /> : <DownArrow />}</span>
          </div>
        }
      />
      {isDropdownOpen && (
        <Dropdown.Menu className={styles.reviewDropdownMenu}>
          {filteredOptions.length > 0 &&
            filteredOptions.map((option) => (
              <>
                <Dropdown.Item
                  key={option}
                  className={styles.reviewDropdownItem}
                  isSelected={value === option}
                  onClick={() => {
                    setInputValue(option);
                    onChange(option);
                    handleCloseDropdown();
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

export default ReviewDropdownInput;
