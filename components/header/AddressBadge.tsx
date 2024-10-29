import React from 'react';

const AddressBadge = () => {
  return (
    <button className="flex h-10 items-center border-[0.5px] border-gray-600  px-8  rounded-[5px] space-x-2" >
      <span className="w-5 h-5 bg-orange-500 rounded-full mr-2"></span>
      <span>0x1234...xxyz</span>
    </button>
  );
};

export default AddressBadge;