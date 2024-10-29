import React, { useState } from "react";
import IconToken from "./IconToken";

interface ListIconTokenProps {
  iconNames: string[];
  className?: string;
}

const ListIconToken: React.FC<ListIconTokenProps> = ({
  iconNames,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false); // Track if any icon is hovered

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {iconNames.map((name, index) => (
        <div
          key={name + index}
          style={{
            marginLeft: index === 0 ? "0" : isHovered ? "2px" : "-3%", // Adjust all icons on hover
            transition: "margin-left 0.2s ease-in-out", // Smooth transition for margin-left
          }}
        >
          <IconToken className={className} tokenName={name} />
        </div>
      ))}
    </div>
  );
};

export default ListIconToken;
