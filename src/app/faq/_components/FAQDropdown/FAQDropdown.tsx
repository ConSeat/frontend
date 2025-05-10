'use client';

import styles from './FAQDropdown.module.scss';
import React from 'react';
import useDropdown from '@/hooks/common/useDropdown';
import Dropdown from '@/components/Dropdown/Dropdown';
import Icon from '@/components/Icon/Icon';

interface FAQDropdownProps {
  title: string;
  content: string;
}

const FAQDropdown = ({ title, content }: FAQDropdownProps) => {
  const { isDropdownOpen, handleToggleDropdown } = useDropdown();

  return (
    <Dropdown className={styles.dropdownContainer}>
      <Dropdown.Trigger
        as={
          <button
            type="button"
            onClick={handleToggleDropdown}
            className={styles.faqDropdownTrigger}
          >
            <span className={styles.faqDropdownText}>{title}</span>
            <Icon icon={isDropdownOpen ? 'UpArrow' : 'DownArrow'} color="#6C757D" />
          </button>
        }
      />
      {isDropdownOpen && <div className={styles.faqDropdownContent}>{content}</div>}
    </Dropdown>
  );
};

export default FAQDropdown;
