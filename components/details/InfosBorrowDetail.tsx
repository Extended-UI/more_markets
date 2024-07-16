import React from 'react';
import InfoDetailGrey from './InfoDetailGrey';
import InfoDetail from './InfoDetail';

const InfosBorrowDetails = () => {
  return (
    <div className='flex w-full flex-col'>
        <div className="flex  w-full">
            <InfoDetailGrey title='Total Deposit' className="flex-1 m-2"><span className='text-[#888888] font-[600] ' >$</span><span className='text-white'>1.94M</span> </InfoDetailGrey>
            <InfoDetailGrey title='Total Borrow' className="flex-1 m-2"><span className='text-[#888888] font-[600] ' >$</span><span className='text-white'>194.7M</span><span className='text-secondary text-[14px] ml-4'>(89.2%)</span> </InfoDetailGrey>
            <InfoDetailGrey title='Available Liquidity' className="flex-1 m-2"><span className='text-[#888888] font-[600] ' >$</span><span className='text-white'>194.7k</span> </InfoDetailGrey>
            <InfoDetailGrey title='1D Borrow APY' className="flex-1 m-2"><span className='text-white' >17.1</span><span className='text-[#888888] font-[600] '>%</span></InfoDetailGrey>
        </div>
        <div className="flex  w-full">
            <InfoDetail title='Credora Min/Avg' className="flex-1 m-2"><span className='text-white font-[600] ' >BBB/AA</span> </InfoDetail>
            <InfoDetail title='Unsecured Borrow' className="flex-1 m-2"><span className='text-[#888888] font-[600] ' >$</span><span className='text-white'>194.7k</span> </InfoDetail>
            <InfoDetail title='Unsecured Borrow APY' className="flex-1 m-2"><span className='text-white' >17.1</span><span className='text-[#888888] font-[600] '>%</span></InfoDetail>
            <InfoDetail title='Performance APY' className="flex-1 m-2"><span className='text-white' >20</span><span className='text-[#888888] font-[600] '>%</span></InfoDetail>
        </div>
    </div>
    
  );
};

export default InfosBorrowDetails;