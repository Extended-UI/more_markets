import { InformationCircleIcon } from '@heroicons/react/16/solid';
import React, { PropsWithChildren } from 'react';

interface InfoDetailGreyProps extends PropsWithChildren<{}> {
    className?: string;
    title: string;
}

const InfoDetailGrey: React.FC<InfoDetailGreyProps> = ({title, children, className }) => {
  return (
    <div className={` border border-[#343434] rounded-xl opacity-100 p-5  ${className}`}>
        <div className='text-[#888888] text-[14px]'> 
            {title}
        </div>
        <div className='text-[24px] mt-2' >
          {children}
        </div>        
    </div>
  );
};

export default InfoDetailGrey;