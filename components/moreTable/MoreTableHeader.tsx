import React, { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Icon from "../FontAwesomeIcon";

interface Props {
  title: string;
  additionalClasses?: string;
  infoText: string;
}

const TableHeaderCell: React.FC<Props> = ({
  title,
  additionalClasses,
  infoText,
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div
      className={`relative flex flex-row items-center justify-start gap-3 text-[12px] font-medium ${additionalClasses}`}
    >
      <div className="flex flex-col items-center mr-2">
        <Icon
          icon="caret-up"
          className="text-[#545454] text-m cursor-pointer"
        />
        <Icon
          icon="caret-down"
          className="text-[#545454] text-m cursor-pointer"
        />
      </div>
      {title}
      <div
        className="relative"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <InformationCircleIcon className="text-[#545454] cursor-pointer w-6 h-6" />
        {isTooltipVisible && (
          <div
            // style={{ top: "-5px", left: "16px" }}
            className="absolute w-[400px] bottom-full mb-2 bg-[#212121] text-[#E0DFE3] text-s rounded-xl shadow-lg max-w-xs break-words whitespace-normal z-[999] leading-5 p-4 font-medium"
          >
            {infoText}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableHeaderCell;
