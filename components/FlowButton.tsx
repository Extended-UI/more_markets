import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const FlowButton = () => {
  return (
    <button className="flex h-10 items-center border-[0.5px] border-gray-600 text-white pl-8  rounded-[5px] space-x-2" style={{ backgroundColor: '#212121' }}>
      <div className='px-4' > 
      <span>Flow</span>
      </div>
      <div className='h-full border-l  flex border-gray-600 items-center justify-center px-2' >
        <ChevronDownIcon className="w-4 h-4" />
      </div>
    </button>
  );
};

export default FlowButton;