interface BadgeProps {
  text: string;
  onClick: () => void;
  backgroundStyle: string;
  contentStyle: string;
}

const Badge = ({ text, onClick, backgroundStyle, contentStyle }: BadgeProps) => {
  return (
    <div className={backgroundStyle} onClick={onClick}>
      <span className={contentStyle} aria-label={text}>
        {text}
      </span>
    </div>
  );
};

export default Badge;
