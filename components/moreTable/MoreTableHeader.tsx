import React, { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Icon from '../FontAwesomeIcon';

interface Props {
  title: string;
  additionalClasses?: string;
  infoText: string;
}

const TableHeaderCell: React.FC<Props> = ({ title, additionalClasses, infoText }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className={`relative px-3 flex flex-row items-center gap-3 text-[10px] ${additionalClasses}`}>
      <div className="flex flex-col items-center">
        <Icon icon="caret-up" className="text-[#545454] text-m cursor-pointer" />
        <Icon icon="caret-down" className="text-[#545454] text-m cursor-pointer" />
      </div>
      {title}
      <div
        className="relative"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <InformationCircleIcon className="text-[#545454] cursor-pointer w-6 h-6" />
        {isTooltipVisible && (
          <div className="absolute w-[400px] bottom-full mb-2 p-2 bg-[#212121] text-white text-s rounded shadow-lg max-w-xs break-words whitespace-normal z-10">
            {infoText}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableHeaderCell;
