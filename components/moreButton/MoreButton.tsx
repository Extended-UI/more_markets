// components/Button.tsx
"use client";
import React, { CSSProperties, ReactNode, useEffect, useState } from "react";

interface ButtonProps {
    text: string;
    onClick: () => void;
    color: "primary" | "secondary" | "grey" | string;
    className?: string;
}

const MoreButton: React.FC<ButtonProps> = ({
    text,
    onClick,
    color,
    className,
}) => {
    // Use state to store the color dynamically
    const [myColor, setMyColor] = useState("#737373");

    useEffect(() => {
        switch (color) {
            case "primary":
                setMyColor("#F58420");
                break;
            case "secondary":
                setMyColor("#F58420");
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
        width: "auto",
        whiteSpace: "nowrap",
    };
    // Combining default class with any additional classes provided
    const classes = `  min-h-10 border   px-4 rounded-[5px] ${className || ""}`;

    return (
        <button
            type="submit"
            onClick={(e) => {
                onClick();
            }}
            className={classes}
            style={defaultStyle}
        >
            {text}
        </button>
    );
};

export default MoreButton;
