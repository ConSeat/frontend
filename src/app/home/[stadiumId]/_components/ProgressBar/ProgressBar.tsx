import styles from './ProgressBar.module.scss';
import React from 'react';

interface ProgressBarProps {
  steps: string[];
  currentStep: string;
}

function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  const currentIndex = steps.indexOf(currentStep);
  const percent = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className={styles.progressBar}>
      <div className={styles.progressFill} style={{ width: `${percent}%` }} />
    </div>
  );
}

export default ProgressBar;
