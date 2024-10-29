import React, { PropsWithChildren } from 'react';

interface InfoDetailGreyProps extends PropsWithChildren<{}> {
    className?: string;
    title: string;
    icon?: React.ReactNode;  // Prop for passing an icon
}

const InfoDetailGrey: React.FC<InfoDetailGreyProps> = ({ title, icon, children, className }) => {
  return (
    <div className={`border border-[#343434] rounded-xl opacity-100 p-5 ${className}`}>
        <div className='text-[#888888] text-[14px] flex items-center'> 
          {icon && <div className="mr-2">{icon}</div>} 
          {title}
        </div>
        <div className='text-[24px] mt-2'>
          {children}
        </div>        
    </div>
  );
};

export default InfoDetailGrey;