'use client';

import styles from './SeatDropdown.module.scss';
import classNames from 'classnames';
import { useId } from 'react';
import useDropdown from '@/hooks/common/useDropdown';
import Dropdown from '@/components/Dropdown/Dropdown';
import Icon from '@/components/Icon/Icon';
import Splitter from '@/components/Splitter/Splitter';

// 추가

interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SeatDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder: string;
  disabled?: boolean;
}

const SeatDropdown = ({ value, onChange, options, placeholder, disabled }: SeatDropdownProps) => {
  const { isDropdownOpen, handleToggleDropdown, dropdownRef } = useDropdown();
  const id = useId();

  return (
    <Dropdown ref={dropdownRef} className={styles.dropdownContainer}>
      <Dropdown.Trigger
        as={
          <button
            id={`${id}-button`}
            type="button"
            onClick={handleToggleDropdown}
            className={classNames(styles.seatDropdownTrigger, {
              [styles.isOpen]: isDropdownOpen,
              [styles.disable]: disabled,
            })}
            disabled={disabled}
            aria-expanded={isDropdownOpen}
            aria-controls={`${id}-listbox`}
          >
            <span className={styles.seatDropdownText}>{value || placeholder}</span>
            {isDropdownOpen ? <Icon icon="UpArrow" /> : <Icon icon="DownArrow" />}
          </button>
        }
      />

      {isDropdownOpen && (
        <Dropdown.Menu
          className={styles.seatDropdownMenu}
          id={`${id}-listbox`}
          aria-labelledby={`${id}-button`}
        >
          {options.map((option, index) => (
            <div key={option.value} className={styles.seatDropdownItemWrapper}>
              <Dropdown.Item
                className={classNames(styles.seatDropdownItem, {
                  [styles.disabled]: option.disabled,
                })}
                isSelected={value === option.value}
                onClick={() => {
                  if (!option.disabled) {
                    onChange(option.value);
                    handleToggleDropdown();
                  }
                }}
                aria-selected={value === option.value}
              >
                {option.label}
              </Dropdown.Item>
              {index !== options.length - 1 && <Splitter color="sub-gray6" />}
            </div>
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default SeatDropdown;
