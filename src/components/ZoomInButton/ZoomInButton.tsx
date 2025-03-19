import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ZoomInButton.module.scss';
import React from 'react';

interface ZoomInButtonProps {
  onClick: () => void;
}

const ZoomInButton = ({ onClick }: ZoomInButtonProps) => {
  return (
    <Button className={styles.searchButton} type="button" onClick={onClick}>
      <Icon icon="Search" />
    </Button>
  );
};

export default ZoomInButton;
