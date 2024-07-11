// components/Button.tsx
import React, { CSSProperties, ReactNode } from 'react';

interface ButtonProps {
  text: ReactNode;  // Using ReactNode allows passing any renderable content
  onClick: () => void;
  color: string;
  className?: string;
}

const MoreButton: React.FC<ButtonProps> = ({ text, onClick, color, className }) => {
  // Default styles that can be overridden by the style prop
  const defaultStyle: CSSProperties = {
    borderColor: color,   
    backgroundColor: `${color}1A`,
    color: color,
    opacity: 0.9,
  };

  // Combining default class with any additional classes provided
  const classes = `btn text-[12px] px-3 py-2 rounded-[5px] ${className || ''}`;

  return (
    <button
      onClick={onClick}
      className={classes}
      style={defaultStyle}
    >
      {text}
    </button>
  );
};

export default MoreButton;
