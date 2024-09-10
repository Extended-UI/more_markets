import React from "react";
import Icon from "../FontAwesomeIcon";

const FlowButton = () => {
  return (
    <button
      className="flex h-10 items-center border-[0.5px] border-gray-600   rounded-[5px] space-x-2"
      style={{ backgroundColor: "#212121" }}
    >
      <div className="px-5 flex h-full items-center">
        <div className="w-5 h-5 bg-[#13EF8B] rounded-full mr-2 "></div>
        <span>Flow</span>
      </div>
      <div className="h-full border-l  flex border-gray-600 items-center justify-center px-2">
        <Icon
          icon="caret-down"
          className="text-[#888888] text-xl cursor-pointer"
        />
      </div>
    </button>
  );
};

export default FlowButton;
