interface SpacingProps {
  size: number;
}

const Spacing = ({ size }: SpacingProps) => {
  return (
    <div
      style={{
        flex: 'none',
        height: size,
      }}
    />
  );
};

export default Spacing;
