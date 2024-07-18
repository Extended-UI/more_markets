import React from 'react';
import InfoDetailGrey from './InfoDetailGrey';
import InfoDetail from './InfoDetail';
import TotalVolumeToken from '../token/TotalVolumeToken';
import RatesGraphDetail from './RatesGraphDetail';
import BIRGraphBorrowDetail from './BIRGraphBorrowDetail';
import UnsecuredGraphBorrowDetail from './UnsecuredGraphBorrow';

const GraphsBorrowDetails = () => {
  return (
    <div className='flex w-full flex-col gap-8'>

        <RatesGraphDetail ></RatesGraphDetail>
        <div className="flex w-full h-full overflow-hidden">
            <div className="flex-1 overflow-hidden mr-4">
                <BIRGraphBorrowDetail />
            </div>
            <div className="flex-1 overflow-hidden ml-4">
                <UnsecuredGraphBorrowDetail />
            </div>
        </div>
        <RatesGraphDetail ></RatesGraphDetail>
    </div>
    
  );
};

export default GraphsBorrowDetails;