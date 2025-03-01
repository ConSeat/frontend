import colors from '@/styles/color';

interface SplitterProps {
  height?: string;
  width?: string;
  color?: keyof typeof colors;
}

const Splitter = ({ height = '1px', width = '100%', color = 'subGray7' }: SplitterProps) => {
  return <div style={{ height, width, backgroundColor: colors[color] }}></div>;
};

export default Splitter;
