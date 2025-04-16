import React from 'react';
import { SvgImage } from '../svgImage/SvgImage';

interface TabIconProps {
  focused: boolean;
  color: string;
  icon: {
    filled: any;
    outline: any;
  };
}

export const TabIcon: React.FC<TabIconProps> = ({ focused, color, icon }) => {
  return (
    <SvgImage
      source={focused ? icon.filled : icon.outline}
      width={20}
      height={20}
      {...(!focused && { stroke: color })}
    />
  );
};