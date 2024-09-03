import React from 'react';
import InfoDetailGrey from './InfoDetailGrey';
import InfoDetail from './InfoDetail';
import TotalVolumeToken from '../token/TotalVolumeToken';

const LiquidationInfo = () => {
  return (
    <div className='flex w-full flex-col overflow-visible'>
        <h1 className="text-2xl mt-16 mb-8 ">Liquidations</h1>
        <div className="flex  w-full overflow-x-auto" style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', // Works in Firefox
            msOverflowStyle: 'none', // Works in IE and Edge
            width: 'calc(100% + 2rem)', position: 'relative', left: '0'
        }}> 
            <InfoDetailGrey infoText='' title='Unrealized Bad Dept' className="flex-1 m-2 min-w-[220px]"><span className='text-[#888888] font-[600] ' >$</span><span className=''>9,46K</span> </InfoDetailGrey>
            <InfoDetailGrey infoText='' title='Realized Bad Dept' className="flex-1 m-2 min-w-[220px]"><span className='text-[#888888] font-[600] ' >$</span><span className=''>194.7k</span> </InfoDetailGrey>
            <InfoDetailGrey infoText='' title='Outstanding Debt Tokens' className="flex-1 m-2 min-w-[240px]"><div className="flex "> <span className='' >171,554.01</span><div className='text-[18px] flex items-center' ><TotalVolumeToken>1.66M</TotalVolumeToken></div></div></InfoDetailGrey>
            <InfoDetailGrey infoText='' title='Premium/Discount' className="flex-1 m-2 min-w-[220px]"><span className='' >+4</span><span className='text-[#888888] font-[600] '>%</span><span className='text-secondary text-[14px] ml-4'>1,04$</span></InfoDetailGrey>
        </div>
    </div>
    
  );
};

export default LiquidationInfo;