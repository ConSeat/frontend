'use client';

import styles from './ReviewDropdownInput.module.scss';
import classNames from 'classnames';
import { Fragment } from 'react';
import useDropdown from '@/hooks/common/useDropdown';
import Dropdown from '@/components/Dropdown/Dropdown';
import Icon from '@/components/Icon/Icon';
import Splitter from '@/components/Splitter/Splitter';
import type { StadiumConcertInfo } from '@/apis/stadium/stadium.api';

interface ReviewDropdownInputProps {
  value: string;
  onChange: (value: StadiumConcertInfo) => void;
  onInputChange: (value: string) => void;
  options: StadiumConcertInfo[];
  selectedId?: number;
  placeholder?: string;
}

const ReviewDropdownInput = ({
  value,
  onChange,
  onInputChange,
  options,
  placeholder,
  selectedId,
}: ReviewDropdownInputProps) => {
  const { isDropdownOpen, handleOpenDropdown, handleCloseDropdown, dropdownRef } = useDropdown();

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
              value={value}
              placeholder={placeholder}
              onChange={(e) => {
                const newValue = e.target.value;
                onInputChange(newValue);
              }}
              onFocus={handleOpenDropdown}
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
          {options.map((option, index) => (
            <Fragment key={option.concertId}>
              <Dropdown.Item
                className={styles.reviewDropdownItem}
                isSelected={selectedId === option.concertId}
                onClick={() => {
                  onChange(option);
                  handleCloseDropdown();
                }}
              >
                {option.concertName}
              </Dropdown.Item>
              {index !== options.length - 1 && <Splitter color="subGray7" />}
            </Fragment>
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default ReviewDropdownInput;
