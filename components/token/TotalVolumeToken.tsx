import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  totalDanger?: boolean;
}

const TotalVolumeToken: React.FC<Props> = ({ children, totalDanger }) => {
  return (
    <span
      className="badge py-4 badge-outline "
      style={{
        backgroundColor: totalDanger ? "#422d2c" : "#262626",
        color: totalDanger ? "#ae6461" : "#888888",
      }}
    >
      ${children}M
    </span>
  );
};

export default TotalVolumeToken;
