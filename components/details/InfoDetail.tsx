import React, { PropsWithChildren } from 'react';

interface InfoDetailProps extends PropsWithChildren<{}> {
  className?: string;
}

const InfoDetail: React.FC<InfoDetailProps> = ({ children, className }) => {
  return (
    <div className={`bg-[#212121] border border-[#343434] rounded-xl opacity-100 p-5 text-[#343434] ${className}`}>
      {children}
    </div>
  );
};

export default InfoDetail;