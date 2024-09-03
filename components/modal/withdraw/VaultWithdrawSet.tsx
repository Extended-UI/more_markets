"use client";
import React, { useState } from 'react';
import InputTokenMax from '../../input/InputTokenMax';
import TotalVolumeToken from '../../token/TotalVolumeToken';
import MoreButton from '../../moreButton/MoreButton';
import FormatNumber from '../../tools/formatNumber';
import { ArrowLongRightIcon } from '@heroicons/react/20/solid';
import FormatTwoPourcentage from '@/components/tools/formatTwoPourcentage';

interface Props {
  title: string;
  token: string;
  balance: number;
  apy: number;
  ltv: string;
  totalWithdraw: number;
  totalTokenAmount: number;
  setAmount: (amount: number) => void;
  closeModal: () => void;
}

const VaultWithdrawSet: React.FC<Props> = ({ title, token, balance, apy, ltv, totalWithdraw, totalTokenAmount, setAmount, closeModal }) => {
  const [deposit, setWithdraw] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWithdraw(parseFloat(event.target.value));
  };

  const handleSetMax = (maxValue: number) => {
    setWithdraw(maxValue);
  };


  const handleWithdraw = () => {
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
      // console.log('Withdraw response:', data);
    } catch (error) {
      console.error('Error submitting deposit:', error);
    }
  };


  const balanceString = balance.toString();

  return (
    <div className='more-bg-secondary w-full pt-8 rounded-[20px]'>
      <form onSubmit={handleSubmit}>
        <div className="text-3xl mb-10 px-4 pt-5 ">{title}</div>
        <div className="text-l mb-5 px-4">Withdraw {token}</div>
        <div className='w-full flex justify-center'>
          <div className='w-[95%] flex justify-center' >
            <InputTokenMax type="number" value={deposit} onChange={handleInputChange} min="0" max={balanceString}  placeholder={`Withdraw ${token}`}  token={token} balance={balance}  setMax={handleSetMax}/>
          </div>
        </div>
        <div className="flex justify-end mt-7 mb-7 px-4">
          <div className='mr-5'><MoreButton className='text-2xl py-2' text="Cancel" onClick={closeModal} color="gray" /></div>
          <MoreButton className='text-2xl py-2' text="Withdraw" onClick={() => handleWithdraw()} color="primary" />
        </div>
        <div className='w-[50%] mx-15 flex justify-center mx-auto'>
          <div className='glowing-text-primary w-full'></div>
        </div>
        <div className='flex items-center justify-between more-bg-primary px-4 rounded-b-[10px] py-12 px-8 '>
          <div className='flex items-center gap-2'>
              Deposit <ArrowLongRightIcon className='w-4 h-4' ></ArrowLongRightIcon> Deposit APY / Projected Deposit APY           
          </div>
          <FormatTwoPourcentage value={apy} value2={apy} ></FormatTwoPourcentage>
        </div>              
      </form>
    </div>
  );
};

export default VaultWithdrawSet;
