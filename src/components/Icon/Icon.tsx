import styles from './Icon.module.scss';
import classNames from 'classnames';
import React from 'react';
import * as icons from '@/assets';

export type IconType = keyof typeof icons;

export interface IconProps {
  icon: IconType;
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const Icon = ({ icon, size, color, className, onClick }: IconProps) => {
  const SVGIcon = icons[icon];
  const shouldOverrideColor = color !== undefined;
  console.log(className);

  return (
    <span
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-disabled={!onClick}
      className={classNames(
        styles.iconContainer,
        { [styles.overrideColor]: shouldOverrideColor },
        className,
      )}
      style={{ color }}
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <SVGIcon {...(size ? { width: size, height: size } : {})} />
    </span>
  );
};

export default Icon;
