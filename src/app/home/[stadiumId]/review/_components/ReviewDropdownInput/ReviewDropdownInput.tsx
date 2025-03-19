'use client';

import styles from './ReviewDropdownInput.module.scss';
import classNames from 'classnames';
import { Fragment, useState } from 'react';
import useDropdown from '@/hooks/useDropdown';
import Dropdown from '@/components/Dropdown/Dropdown';
import Icon from '@/components/Icon/Icon';
import Splitter from '@/components/Splitter/Splitter';

interface ReviewDropdownInputProps {
  value: string;
  onChange: (value: { concertId: number; name: string }) => void;
  options: { concertId: number; name: string }[];
  placeholder?: string;
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

  const filterOptions = (input: string) => {
    setFilteredOptions(
      options.filter((option) => option.name.toLowerCase().includes(input.toLowerCase())),
    );
  };

  return (
    <Dropdown ref={dropdownRef}>
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
                filterOptions(inputValue);
                handleOpenDropdown();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            />
            <span>{isDropdownOpen ? <Icon icon="UpArrow" /> : <Icon icon="DownArrow" />}</span>
          </div>
        }
      />
      {isDropdownOpen && (
        <Dropdown.Menu className={styles.reviewDropdownMenu}>
          {filteredOptions.length > 0 &&
            filteredOptions.map((option, index) => (
              <Fragment key={option.concertId}>
                <Dropdown.Item
                  className={styles.reviewDropdownItem}
                  isSelected={value === option.name}
                  onClick={() => {
                    setInputValue(option.name);
                    onChange(option);
                    handleCloseDropdown();
                  }}
                >
                  {option.name}
                </Dropdown.Item>
                {index !== filteredOptions.length - 1 && <Splitter color="subGray7" />}
              </Fragment>
            ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default ReviewDropdownInput;
