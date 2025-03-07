'use client';

import styles from './ReviewDropdown.module.scss';
import classNames from 'classnames';
import { Fragment } from 'react';
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
            type="button"
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
            <Fragment key={option}>
              <Dropdown.Item
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
            </Fragment>
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default ReviewDropdown;
