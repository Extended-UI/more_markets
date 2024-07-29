"use client";
import React, { useState } from 'react';
import InputTokenMax from '../../input/InputTokenMax';
import TotalVolumeToken from '../../token/TotalVolumeToken';
import MoreButton from '../../moreButton/MoreButton';
import FormatNumber from '../../tools/formatNumber';
import { ArrowLongRightIcon } from '@heroicons/react/20/solid';
import FormatTwoPourcentage from '@/components/tools/formatTwoPourcentage';
import ListIconToken from '@/components/token/ListIconToken';
import MoreToggle from '@/components/moreToggle/MoreToggle';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  title: string;
  token: string;
  balance: number;
  apy: number;
  ltv: string;
  totalAdd: number;
  totalTokenAmount: number;
  setAmount: (amount: number) => void;
  closeModal: () => void;
}

const VaultAddSet: React.FC<Props> = ({ title, token, balance, apy, ltv, totalAdd, totalTokenAmount, setAmount, closeModal }) => {
  const [deposit, setAdd] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdd(parseFloat(event.target.value));
  };

  const handleSetMax = (maxValue: number) => {
    setAdd(maxValue);
  };


  const handleAdd = () => {
    console.log("DEPOSIT")
    if (deposit > 0) {
      setAmount(deposit);
    }    
  };

  const handleCancel = () => {
    console.log("CANCEL")
  };



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log('Submitting deposit:', deposit);
      // Simulate an API call
      // const response = await fetch('/api/deposit', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token, deposit }),
      // });
      // const data = await response.json();
      // console.log('Add response:', data);
    } catch (error) {
      console.error('Error submitting deposit:', error);
    }
  };


  const balanceString = balance.toString();

  return (
    <div className='more-bg-secondary w-full pt-8 rounded-[20px]'>
      <form onSubmit={handleSubmit}>
        <div className="text-2xl mb-10 px-4 pt-5 ">{title}</div>
        <div className='flex items-center mb-10 px-8 gap-2' >
          <ListIconToken iconNames={["usdc", "abt"]} className='w-7 h-7' ></ListIconToken>
          <div className="text-l   flex items-center'"> {token} / USDA</div>
        </div>
        <div className="text-l mb-5 px-4">Deposit {token} Collateral</div>
        <div className='flex justify-start px-4'>
          <div className='flex flex-col justify-start  gap-2 h-20   pt-4 ' >
           <div className='flex gap-4' >Allow stEth wrapping  <InformationCircleIcon className="text-[#545454] cursor-pointer w-6 h-6" /> </div> 
            <MoreToggle  ></MoreToggle>
          </div>
          <div className='flex flex-col justify-start ml-[20%] gap-2 h-20  pr-8 pt-4 ' >
           <div className='flex gap-4' >Allow ETH Stacking  <InformationCircleIcon className="text-[#545454] cursor-pointer w-6 h-6" /> </div> 
            <MoreToggle  ></MoreToggle>
          </div>
        </div>
        
        <div className='w-full flex flex-col justify-center mt-10'>
          <div className='mx-4 flex justify-center' >
            <InputTokenMax type="number" value={deposit} onChange={handleInputChange} min="0" max={balanceString}  placeholder={`Add ${token}`}  token={token} balance={balance}  setMax={handleSetMax}/>
          </div>
          <div className="text-right more-text-gray px-4 mt-4">Balance: {balance} {token}</div>        

        </div>
        <div className="flex justify-end mt-7 mb-7 px-4">
          <div className='mr-5'><MoreButton className='text-2xl py-2' text="Cancel" onClick={closeModal} color="gray" /></div>
          <MoreButton className='text-2xl py-2' text="Confirm" onClick={() => handleAdd()} color="primary" />
        </div>
        <div className='w-[50%] mx-15 flex justify-center mx-auto'>
          <div className='glowing-text-primary w-full'></div>
        </div>
        <div className='flex  w-full flex-col items-center justify-start more-bg-primary px-8 rounded-b-[10px] py-10 px-8 gap-4 '>
          <div className="flex w-full justify-between ">        
            <div>Borrow APY / Projected Borrow APY</div>
            <div><span className="more-text-gray">n/a</span></div>
          </div>
          <div className="flex w-full justify-between ">        
            <div>LTV / Liquidation LTV</div>
            <div><span className="more-text-gray">n/a</span></div>
          </div>
          <div className="flex w-full justify-between ">        
            <div>Collateral {token} </div>
            <div><span className="more-text-gray">n/a</span></div>
          </div>
          <div className="flex w-full justify-between ">        
            <div>Loan USDA</div>
            <div><span className="more-text-gray">n/a</span></div>
          </div> 
          

        </div>         
      </form>
    </div>
  );
};

export default VaultAddSet;
