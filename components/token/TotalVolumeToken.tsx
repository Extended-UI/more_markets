import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  totalDanger?: boolean;
}

const TotalVolumeToken: React.FC<Props> = ({ children, totalDanger }) => {
  return (
    <span
      className="badge py-4 badge-outline ml-3 text-base"
      style={{
        backgroundColor: totalDanger ? "#422d2c" : "#343434",
        color: totalDanger ? "#ae6461" : "#888888",
      }}
    >
      ${children}
    </span>
  );
};

export default TotalVolumeToken;
