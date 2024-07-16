import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { PropsWithChildren } from 'react';

interface InfoDetailGreyProps extends PropsWithChildren<{}> {
    className?: string;
    title: string;
}

const InfoDetailGrey: React.FC<InfoDetailGreyProps> = ({title, children, className }) => {
  return (
    <div className={`bg-[#212121] border border-[#343434] rounded-xl opacity-100 p-5 text-[#343434] ${className}`}>
        <div className='flex text-[#888888] text-[14px] items-center gap-2'> 
            {title}
            <InformationCircleIcon className="text-[#545454] cursor-pointer w-6 h-6" />
        </div>
        <div className='text-[30px] mt-2' >
          {children}
        </div>        
    </div>
  );
};

export default InfoDetailGrey;