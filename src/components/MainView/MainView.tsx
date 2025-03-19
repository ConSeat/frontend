import Icon from '../Icon/Icon';
import styles from './MainView.module.scss';
import React from 'react';

const MainView = () => {
  return (
    <div className={styles.mainViewLayout}>
      <Icon icon="LargeC" className={styles.svgC} />
      <Icon icon="LargeO" className={styles.svgO} />
      <Icon icon="LargeT" className={styles.svgT} />
    </div>
  );
};

export default MainView;
