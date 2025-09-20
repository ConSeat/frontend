import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

const LoadingSpinner = ({ size = 20, color = '#ffffff', className }: LoadingSpinnerProps) => {
  return (
    <div
      className={`${styles.spinner} ${className || ''}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderColor: `${color}33`, // 배경색 (투명도 20%)
        borderTopColor: color, // 메인 색상
      }}
    />
  );
};

export default LoadingSpinner;