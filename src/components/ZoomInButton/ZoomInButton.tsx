import Button from '../Button/Button';
import styles from './ZoomInButton.module.scss';
import React from 'react';
import { Search } from '@/assets';

interface ZoomInButtonProps {
  onClick: () => void;
}

const ZoomInButton = ({ onClick }: ZoomInButtonProps) => {
  return (
    <Button className={styles.searchButton} type="button" onClick={onClick}>
      <Search />
    </Button>
  );
};

export default ZoomInButton;
