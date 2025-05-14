'use client';

import styles from './FAQDropdown.module.scss';
import classNames from 'classnames';
import React, { type ReactNode } from 'react';
import useDropdown from '@/hooks/common/useDropdown';
import Dropdown from '@/components/Dropdown/Dropdown';
import Icon from '@/components/Icon/Icon';

interface FAQDropdownProps {
  question: string;
  answer: ReactNode;
}

export const AnswerBold = ({ children }: { children: ReactNode }) => {
  return <span className={styles.bold}>{children}</span>;
};

export const AnswerOfficialLink = () => {
  return (
    <a
      className={styles.officialLink}
      href="https://x.com/con_see_at"
      target="_blank"
      rel="noopener noreferrer"
    >
      X(@con_see_at)
    </a>
  );
};

export const AnswerMail = () => {
  return (
    <a className={styles.mail} href="mailto:conseat@gmail.com" rel="noopener noreferrer">
      conseeat@gmail.com
    </a>
  );
};

const FAQDropdown = ({ question, answer }: FAQDropdownProps) => {
  const { isDropdownOpen, handleToggleDropdown } = useDropdown();

  return (
    <Dropdown className={styles.dropdownContainer}>
      <Dropdown.Trigger
        as={
          <button
            type="button"
            onClick={handleToggleDropdown}
            className={classNames(styles.faqDropdownTrigger, {
              [styles.isOpen]: isDropdownOpen,
            })}
          >
            <span className={styles.faqDropdownText}>{question}</span>
            <Icon icon={isDropdownOpen ? 'UpArrow' : 'DownArrow'} color="#6C757D" />
          </button>
        }
      />
      {isDropdownOpen && <div className={styles.faqDropdownContent}>{answer}</div>}
    </Dropdown>
  );
};

export default FAQDropdown;
