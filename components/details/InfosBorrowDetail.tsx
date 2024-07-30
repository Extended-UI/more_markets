import React from 'react';
import InfoDetailGrey from './InfoDetailGrey';
import InfoDetail from './InfoDetail';

const InfosBorrowDetails = () => {
  return (
    <div className='flex w-full flex-col overflow-visible'>
        <div className="flex  w-full overflow-x-auto" style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', // Works in Firefox
            msOverflowStyle: 'none', // Works in IE and Edge
            width: 'calc(100% + 2rem)', position: 'relative', left: '0'
        }}>
            <InfoDetailGrey title='Total Deposit' className="flex-1 m-2 min-w-[180px]"><span className='text-[#888888] font-[600] ' >$</span><span className=''>1.94M</span> </InfoDetailGrey>
            <InfoDetailGrey title='Total Borrow' className="flex-1 m-2 min-w-[220px]"><span className='text-[#888888] font-[600] ' ></span><span className=''>194.7M</span><span className='text-secondary text-[14px] ml-4'>(89.2%)</span> </InfoDetailGrey>
            <InfoDetailGrey title='Available Liquidity' className="flex-1 m-2 min-w-[180px]"><span className='text-[#888888] font-[600] ' >$</span><span className=''>194.7k</span> </InfoDetailGrey>
            <InfoDetailGrey title='1D Borrow APY' className="flex-1 m-2 min-w-[180px]"><span className='' >17.1</span><span className='text-[#888888] font-[600] '>%</span></InfoDetailGrey>
        </div>
        <h1 className="text-2xl mt-16 mb-8">Open a position</h1>
        <div className="flex  w-full overflow-x-auto" style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', // Works in Firefox
            msOverflowStyle: 'none', // Works in IE and Edge
            width: 'calc(100% + 2rem)', position: 'relative', left: '0'
        }}>
            <InfoDetail title='Your Credora Rating'  className="flex-1 m-2 min-w-[200px]"><span className=' font-[600] ' >BBB/AA</span> </InfoDetail>
            <InfoDetail title='Unsecured Loan Limit' className="flex-1 m-2 min-w-[200px]"><span className='' >17.1</span><span className='text-[#888888] font-[600] '>%</span></InfoDetail>
            <InfoDetail title='Your LiquidationLTV' className="flex-1 m-2 min-w-[200px]"><span className='text-[#888888] font-[600] ' >$</span><span className=''>194.7k</span> </InfoDetail>
            <InfoDetail title='1D Unsecured APY' className="flex-1 m-2 min-w-[200px]"><span className='' >20</span><span className='text-[#888888] font-[600] '>%</span></InfoDetail>
        </div>
    </div>
    
  );
};

export default InfosBorrowDetails;