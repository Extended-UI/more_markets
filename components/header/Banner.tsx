import React from 'react';

const Banner = (Props: { setHasBanner: (arg0: boolean) => void; }) => {


  return (
    <div className='text-white py-[14px] bg-[#723CEB] text-center fixed top-0 w-full z-50 flex justify-between items-center' style={{ padding: "14px 5%" }}>
      <div></div>
      <div style={{ maxWidth: "1380px", margin: "0 auto" }} className='text-[14px]'>
        MORE Markets is now live on Flow Crescendo Mainnet! <span className='hidden xxl:inline'>While we’re excited to share this with you, please be aware there are potential risks with smart contracts. </span> <a href='#' className='underline text-white font-bold'>Read the full announcement here</a>
      </div>
      <div className='text-[#141414] bg-[#612ecf] hover:bg-[#a886f3] h-[28px] w-[28px] rounded-full cursor-pointer flex justify-center items-center ml-5' onClick={()=>Props.setHasBanner(false)}>
        X
      </div>
    </div>
  );
};

export default Banner;