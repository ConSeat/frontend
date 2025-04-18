import Icon from '../Icon/Icon';
import styles from './Background.module.scss';
import React from 'react';

const MainBackground = () => {
  return (
    <div className={styles.wrapper}>
      <Icon icon="LargeC" className={styles.mainC} />
      <Icon icon="LargeO" className={styles.mainO} />
      <Icon icon="LargeT" className={styles.mainT} />
    </div>
  );
};

export default MainBackground;
