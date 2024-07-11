// components/Button.tsx
import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';


interface ButtonProps {
    text: string;
    onClick: () => void;
    color: 'primary' | 'secondary' | 'grey' | string;
    className?: string;
  }
  
  const MoreButton: React.FC<ButtonProps> = ({ text, onClick, color, className }) => {
    // Use state to store the color dynamically
    const [myColor, setMyColor] = useState("#737373");
  
    useEffect(() => {
      console.log('Initial color', color);
      switch (color) {
          case "primary":
              setMyColor("#cf711e");
              break;
          case "secondary":
              setMyColor("#1c8dd3");
              break;
          case "grey":
              setMyColor("#737373");
              break;
          default:
              setMyColor(color); // If color is not one of the predefined values, use it directly.
              break;
      }
    }, [color]); // Dependency array ensures this effect runs only when `color` prop changes
  
    // Style object that uses `myColor`
    const defaultStyle: CSSProperties = {
      borderColor: myColor,
      backgroundColor: `${myColor}1A`,
      color: myColor,
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
