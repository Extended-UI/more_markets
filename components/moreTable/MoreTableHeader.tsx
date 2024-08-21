import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Icon from '../FontAwesomeIcon';

interface Props {
  title: string;
  additionalClasses?: string;
  infoText: string;
}

const TableHeaderCell: React.FC<Props> = ({ title, additionalClasses, infoText }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top - 10, // Adjust as needed
      left: rect.left + rect.width / 2, // Center horizontally
    });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div className={`relative px-3 flex flex-row items-center gap-3 text-[10px] ${additionalClasses}`}>
      <div className="flex flex-col items-center">
        <Icon icon="caret-up" className="text-[#545454] text-m cursor-pointer" />
        <Icon icon="caret-down" className="text-[#545454] text-m cursor-pointer" />
      </div>
      {title}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <InformationCircleIcon className="text-[#545454] cursor-pointer w-6 h-6" />
        {isTooltipVisible &&
          createPortal(
            <div
              style={{ top: tooltipPosition.top, left: tooltipPosition.left, transform: 'translateX(-50%)' }}
              className="fixed p-2 bg-[#212121] text-white text-[12px] rounded shadow-lg z-50 max-w-xs break-words whitespace-normal"
            >
              {infoText}
            </div>,
            document.body
          )}
      </div>
    </div>
  );
};

export default TableHeaderCell;
