import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Icon from '../FontAwesomeIcon';
interface Props {
    title: string;
    additionalClasses?: string;
  }
  
  const TableHeaderCell: React.FC<Props> = ({ title, additionalClasses }) => {
    return (
      <>
      <div className={`py-3 px-3 flex flex-row items-center gap-3 text-[#b0afb2] ${additionalClasses}`}>
        <div className="flex flex-col items-center">
          <Icon icon="caret-up" className="text-[#545454] text-m cursor-pointer" />
          <Icon icon="caret-down" className="text-[#545454] text-m cursor-pointer" />
        </div>
        {title}
        <InformationCircleIcon className="text-[#545454] cursor-pointer w-6 h-6" />
      </div>
      </>
    );
  };
  
  export default TableHeaderCell;