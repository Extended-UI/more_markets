import React from 'react';
import InfoDetail from './InfoDetail'; // Adjust the path as necessary

const InfosEarnDetails = () => {
  return (
    <div className="flex justify-between w-full">
      <InfoDetail className="flex-1 m-2"><span className='text-white' >90</span><span className='text-grey'>%</span> </InfoDetail>
      <InfoDetail className="flex-1 m-2"><span className='text-white' >90</span><span className='text-grey'>%</span></InfoDetail>
      <InfoDetail className="flex-1 m-2"><span className='text-white' >90</span><span className='text-grey'>%</span></InfoDetail>
      <InfoDetail className="flex-1 m-2"><span className='text-white' >90</span><span className='text-grey'>%</span></InfoDetail>
    </div>
  );
};

export default InfosEarnDetails;