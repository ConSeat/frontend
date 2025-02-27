'use client';

import styles from './page.module.scss';
import { useState } from 'react';
import useDropdown from '@/hooks/useDropdown';
import Dropdown from '@/components/Dropdown/Dropdown';

const ReviewPage = () => {
  const [selected, setSelected] = useState<string>('');
  const { isDropdownOpen, handleToggleDropdown, dropdownRef } = useDropdown();

  const options = [
    '2024 NCT CONCERT',
    'NCT WISH 2025 - 서울',
    '2025 SVT 9TH FAN MEETING 〈SEVENTEEN in CARAT LAND',
    '2023 MONSTA X 7TH OFFICIAL FANCLUB MONBEBE FAN－CONCERT 〈MX FRIENDS',
    '텐(NCT) 2025 - 서울',
  ];

  return (
    <div>
      <Dropdown value={selected} onChange={setSelected} ref={dropdownRef}>
        <Dropdown.Trigger
          as={<button onClick={handleToggleDropdown}>{selected || '안녕'}</button>}
        />
        {isDropdownOpen && (
          <Dropdown.Menu>
            {['Option 1', 'Option 2', 'Option 3'].map((option) => (
              <Dropdown.Item
                key={option}
                isSelected={selected === option}
                onClick={() => setSelected(option)}
              >
                {option}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
      </Dropdown>
    </div>
  );
};

export default ReviewPage;
