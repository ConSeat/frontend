import styles from './ProgressBar.module.scss';
import React from 'react';

function ProgressBar({ steps, currentStep }) {
  const currentIndex = steps.indexOf(currentStep);
  const percent = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className={styles.progressBar}>
      <div className={styles.progressFill} style={{ width: `${percent}%` }} />
    </div>
  );
}

export default ProgressBar;
