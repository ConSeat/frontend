import styles from './Splitter.module.scss';

interface SplitterProps {
  height?: string;
  width?: string;
  color?: keyof typeof styles;
}

const Splitter = ({ height = '1px', width = '100%', color = 'sub-gray7' }: SplitterProps) => {
  const className = styles[`splitter-${color}`] || styles['splitter-sub-gray7'];

  return <div className={`${styles.splitter} ${className}`} style={{ height, width }} />;
};

export default Splitter;
