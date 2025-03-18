'use client';

import ButtonSection from '../ButtonSection/ButtonSection';
import styles from './SelectMenu.module.scss';
import React from 'react';
import { useState } from 'react';
import ColumnSelectList from '@/components/ColumnSelectList';
import PageExplanation from '@/components/PageExplanation';
import { FIND_VIEW_LIST } from '@/constants/findView';
import type { ViewType } from '@/types/findView';

interface SelectMenuProps {
  stadiumId: string;
}

const SelectMenu = ({ stadiumId }: SelectMenuProps) => {
  const [viewType, setViewType] = useState<ViewType | undefined>(undefined);

  const handleClickSelectItem = (type: ViewType) => {
    setViewType(type);
  };

  return (
    <>
      <section className={styles.selectMenuSection}>
        <PageExplanation>
          <PageExplanation.Title>
            어떤 <span>시야</span>가<br />
            궁금하신가요?
          </PageExplanation.Title>
        </PageExplanation>

        <ColumnSelectList>
          {FIND_VIEW_LIST.map(({ type, Icon, title }) => (
            <ColumnSelectList.Item
              key={type}
              onClick={() => handleClickSelectItem(type as ViewType)}
              isSelected={type === viewType}
              isUnSelected={viewType && type !== viewType}
            >
              {Icon}
              <ColumnSelectList.Title>{title}</ColumnSelectList.Title>
            </ColumnSelectList.Item>
          ))}
        </ColumnSelectList>
      </section>

      <ButtonSection stadiumId={stadiumId} viewType={viewType} />
    </>
  );
};

export default SelectMenu;
