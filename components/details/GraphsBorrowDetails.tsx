import React from 'react';
import InfoDetailGrey from './InfoDetailGrey';
import InfoDetail from './InfoDetail';
import TotalVolumeToken from '../token/TotalVolumeToken';
import RatesGraphDetail from './RatesGraphDetail';
import BIRGraphBorrowDetail from './BIRGraphBorrowDetail';
import UnsecuredGraphBorrowDetail from './UnsecuredGraphBorrow';
import ExploreGraphBorrowDetail from './ExploreGraphBorrowDetail';

const GraphsBorrowDetails = () => {
  return (
    <div className='flex w-full flex-col mt-8 gap-8'>
        <div className='w-full'  >
            <RatesGraphDetail ></RatesGraphDetail>
        </div>

        <div className="flex w-full h-full overflow-hidden">
            <div className="flex-1 overflow-hidden mr-4">
                <BIRGraphBorrowDetail />
            </div>
            <div className="flex-1 overflow-hidden ml-4">
                <UnsecuredGraphBorrowDetail />
            </div>
        </div>
        <div className='w-full'  >
            <ExploreGraphBorrowDetail ></ExploreGraphBorrowDetail>
        </div>
    </div>
    
  );
};

export default GraphsBorrowDetails;