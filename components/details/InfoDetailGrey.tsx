import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React, { PropsWithChildren, useState } from "react";

interface InfoDetailGreyProps extends PropsWithChildren<{}> {
  className?: string;
  title: string;
  infoText: string; // Add this prop to receive the info text
}

const InfoDetailGrey: React.FC<InfoDetailGreyProps> = ({
  title,
  children,
  className,
  infoText,
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div
      className={`inforDetailsCard t-8 bg-[#212121] border border-[#343434] rounded-[16px] opacity-100 px-10 py-7 relative  overflow-visible ${className}`}
    >
      <div className="flex text-[#888888] text-[16px] items-center gap-2 relative  overflow-visible">
        {title}
        {infoText.length > 0 && (
          <div
            className="relative"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <InformationCircleIcon className="cursor-pointer w-6 h-6" />
            {isTooltipVisible && (
              <div className="absolute w-[400px] bottom-full mb-2 bg-[#212121] text-[#E0DFE3] text-s rounded-xl shadow-lg max-w-xs break-words whitespace-normal z-[999] leading-5 p-4 font-medium text-[12px]">
                {infoText}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="text-[30px] font-semibold mt-2 truncate">{children}</div>
    </div>
  );
};

export default InfoDetailGrey;
