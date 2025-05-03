'use client';

import ButtonSection from '../ButtonSection/ButtonSection';
import styles from './SelectMenu.module.scss';
import React from 'react';
import { useState } from 'react';
import ColumnSelectList from '@/components/ColumnSelectList';
import Highlight from '@/components/Highlight/Highlight';
import Icon, { type IconType } from '@/components/Icon/Icon';
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
      <div className={styles.selectMenuContainer}>
        <PageExplanation>
          <PageExplanation.Title>
            선택한 공연장의
            <br />
            <Highlight>시야 정보</Highlight>를 확인해보세요
          </PageExplanation.Title>
        </PageExplanation>

        <ColumnSelectList>
          {FIND_VIEW_LIST.map(({ type, icon, title }) => (
            <ColumnSelectList.Item
              key={type}
              onClick={() => handleClickSelectItem(type as ViewType)}
              isSelected={type === viewType}
              isUnSelected={viewType && type !== viewType}
            >
              <Icon icon={icon as IconType} />
              <ColumnSelectList.Title>{title}</ColumnSelectList.Title>
            </ColumnSelectList.Item>
          ))}
        </ColumnSelectList>
      </div>

      <ButtonSection stadiumId={stadiumId} viewType={viewType} />
    </>
  );
};

export default SelectMenu;
