'use client';

import styles from './AllDropdownModal.module.scss';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useId } from 'react';
import useDropdown from '@/hooks/common/useDropdown';
import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import Icon from '@/components/Icon/Icon';

interface DropdownModalProps {
  label: string;
  isSelected: boolean;
  title?: string;
  subTitle?: string;
  children: ReactNode;
  onReset: () => void;
  onConfirm: () => void;
}

const AllDropdownModal = ({
  label,
  isSelected,
  title,
  subTitle,
  children,
  onReset,
  onConfirm,
}: DropdownModalProps) => {
  const { isDropdownOpen, handleToggleDropdown, dropdownRef } = useDropdown();
  const id = useId();

  return (
    <Dropdown>
      <Dropdown.Trigger
        as={
          <button
            className={classNames(styles.triggerButton, {
              [styles.selected]: isSelected,
            })}
            onClick={handleToggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-controls={`${id}-content`} // 고유 id 연결
          >
            {label}
            <Icon
              icon={isDropdownOpen ? 'UpArrow' : 'DownArrow'}
              color={isSelected ? 'black' : '#F8F9FA'}
            />
          </button>
        }
      />

      <Dropdown.Modal
        ref={dropdownRef}
        isOpen={isDropdownOpen}
        className={styles.modalBody}
        controls={
          <div className={styles.controls}>
            <Button type="reset" className={styles.reset} onClick={onReset}>
              <Icon icon="Reset" />
              초기화
            </Button>
            <Button
              type="submit"
              onClick={() => {
                handleToggleDropdown();
                onConfirm();
              }}
            >
              선택완료
            </Button>
          </div>
        }
      >
        <div
          id={`${id}-content`} // 고유 id 연결
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-title`}
          className={styles.modalBodyContent}
        >
          <div className={styles.modalTextContainer}>
            <p id={`${id}-title`} className={styles.modalTextTitle}>
              {title}
            </p>
            {subTitle && <span className={styles.modalTextSubTitle}>{subTitle}</span>}
          </div>

          {children}
        </div>
      </Dropdown.Modal>
    </Dropdown>
  );
};

export default AllDropdownModal;
