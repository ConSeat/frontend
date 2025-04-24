'use client';

import type { FilterAction } from '../AllReviewContainer/AllReviewContainer';
import styles from './SortDropdown.module.scss';
import classNames from 'classnames';
import type { Dispatch } from 'react';
import useDropdown from '@/hooks/common/useDropdown';
import Dropdown from '@/components/Dropdown/Dropdown';
import Icon from '@/components/Icon/Icon';
import Splitter from '@/components/Splitter/Splitter';
import type { ListSort } from '@/types/review';

export const SortData: { name: string; value: ListSort }[] = [
  { name: '추천순', value: '' },
  { name: '최신순', value: 'modifiedAt' },
];

interface SortDropdownProps {
  sort: ListSort;
  dispatch: Dispatch<FilterAction>;
}

const SortDropdown = ({ sort, dispatch }: SortDropdownProps) => {
  const { isDropdownOpen, handleToggleDropdown, dropdownRef } = useDropdown();

  const handleClickItem = (value: ListSort) => {
    dispatch({
      type: 'SORT',
      payload: { sort: value },
    });
    handleToggleDropdown();
  };

  return (
    <Dropdown ref={dropdownRef} className={styles.dropdownContainer}>
      <Dropdown.Trigger
        as={
          <button
            type="button"
            onClick={handleToggleDropdown}
            className={classNames(styles.sortDropdownTrigger, {
              [styles.isOpen]: isDropdownOpen,
            })}
          >
            <span className={styles.sortDropdownText}>
              {SortData.find((option) => option.value === sort)?.name ?? ''}
            </span>
            <Icon icon={isDropdownOpen ? 'UpArrow' : 'DownArrow'} color="#ADB5BD" />
          </button>
        }
      />
      {isDropdownOpen && (
        <Dropdown.Menu className={styles.sortDropdownMenu}>
          {SortData.map((option, index) => (
            <div key={option.value} className={styles.sortDropdownItemWrapper}>
              <Dropdown.Item
                className={styles.sortDropdownItem}
                isSelected={sort === option.value}
                onClick={() => handleClickItem(option.value)}
              >
                {option.name}
              </Dropdown.Item>
              {index !== SortData.length - 1 && <Splitter color="sub-gray6" />}
            </div>
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default SortDropdown;
