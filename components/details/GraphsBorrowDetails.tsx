import React from 'react';
import InfoDetailGrey from './InfoDetailGrey';
import InfoDetail from './InfoDetail';
import TotalVolumeToken from '../token/TotalVolumeToken';
import RatesGraphDetail from './RatesGraphDetail';

const GraphsBorrowDetails = () => {
  return (
    <div className='flex w-full flex-col gap-8'>

        <RatesGraphDetail ></RatesGraphDetail>
        <div className="flex justify-center w-full h-full">
            <RatesGraphDetail ></RatesGraphDetail>
            <RatesGraphDetail ></RatesGraphDetail>
        </div>
        <RatesGraphDetail ></RatesGraphDetail>
    </div>
    
  );
};

export default GraphsBorrowDetails;