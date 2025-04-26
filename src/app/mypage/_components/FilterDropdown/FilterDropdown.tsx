import styles from './FilterDropdown.module.scss';
import classNames from 'classnames';
import { Fragment } from 'react';
import useDropdown from '@/hooks/common/useDropdown';
import Dropdown from '@/components/Dropdown/Dropdown';
import Icon from '@/components/Icon/Icon';
import Splitter from '@/components/Splitter/Splitter';

interface FilterDropdown {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const FilterDropdown = ({ value, options, onChange }: FilterDropdown) => {
  const { isDropdownOpen, handleToggleDropdown, dropdownRef } = useDropdown();

  return (
    <Dropdown ref={dropdownRef} className={styles.dropDownContainer}>
      <Dropdown.Trigger
        as={
          <button
            type="button"
            onClick={handleToggleDropdown}
            className={classNames(styles.reviewDropdownTrigger, {
              [styles.isOpen]: isDropdownOpen,
            })}
          >
            <span
              className={classNames(styles.reviewDropdownText, {
                [styles.placeholder]: !value,
              })}
            >
              {value}
            </span>
            {isDropdownOpen ? <Icon icon="UpArrow" /> : <Icon icon="DownArrow" />}
          </button>
        }
      />
      {isDropdownOpen && (
        <Dropdown.Menu className={styles.reviewDropdownMenu}>
          {options.map((option, index) => (
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
              {index !== options.length - 1 && <Splitter color="sub-gray6" />}
            </Fragment>
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default FilterDropdown;
