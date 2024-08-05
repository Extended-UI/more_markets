import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { PropsWithChildren, useState } from 'react';

interface InfoDetailGreyProps extends PropsWithChildren<{}> {
  className?: string;
  title: string;
  infoText: string; // Add this prop to receive the info text
}

const InfoDetailGrey: React.FC<InfoDetailGreyProps> = ({ title, children, className, infoText }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className={` t-8 bg-[#212121] border border-[#343434] rounded-xl opacity-100 p-5 relative  overflow-visible ${className}`}>
      <div className='flex text-[#888888] text-[14px] items-center gap-2 relative  overflow-visible'>
        {title}
        <div
          className="relative"
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <InformationCircleIcon className="cursor-pointer w-6 h-6" />
          {isTooltipVisible && (
            <div className="absolute bottom-full w-[400px] mb-2 p-2 bg-[#212121] text-white text-s rounded shadow-lg max-w-xs break-words whitespace-normal z-50">
              {infoText}
            </div>
          )}
        </div>
      </div>
      <div className='text-[30px] mt-2'>
        {children}
      </div>
    </div>
  );
};

export default InfoDetailGrey;
