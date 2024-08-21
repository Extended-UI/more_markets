"use client";
import React, { useState } from 'react';
import InputTokenMax from '../../input/InputTokenMax';
import TotalVolumeToken from '../../token/TotalVolumeToken';
import MoreButton from '../../moreButton/MoreButton';
import TokenAmount from '@/components/token/TokenAmount';
import IconToken from '@/components/token/IconToken';
import FormatTwoPourcentage from '@/components/tools/formatTwoPourcentage';

interface Props {
  title: string;
  token: string;
  curator: string;
  balance: number;
  apy: number;
  ltv: string;
  totalDeposit: number;
  totalTokenAmount: number;
  amount: number;
  validDeposit: () => void;
  closeModal: () => void;
}

const VaultDepositConfirm: React.FC<Props> = ({ title, token, balance, apy, ltv, totalDeposit, totalTokenAmount, curator, amount, validDeposit, closeModal }) => {

  const [deposit, setDeposit] = useState<number>(0);


  const handleDeposit = () => {    
    validDeposit();
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
      // console.log('Deposit response:', data);
    } catch (error) {
      console.error('Error submitting deposit:', error);
    }
  };

  const balanceString = balance.toString();

  return (
    <div className='more-bg-secondary rounded-[12px] h-full w-full'>
      <form onSubmit={handleSubmit}>
        <div className="mb-10 px-8 pt-14  text-2xl ">Review Transaction</div>
        
        <div className="text-xl mb-1 px-8 pb-8  ">{title}</div>

        <div className="flex flex-row justify-between items-center mb-12 ">
          <div className=" flex items-center gap-2 flex  px-8">
            <span className="more-text-gray">Curator:</span>
            <IconToken  className='w-6 h-6' tokenName={token} ></IconToken>
            <span >{curator}</span>
          </div>
          <div className="flex items-center  gap-2 text-2xl mb-5 px-8"><span className="more-text-gray">Liquidation LTV:</span> <FormatTwoPourcentage value={apy} value2={apy} ></FormatTwoPourcentage> </div>
        </div>
        <div className='more-bg-primary rounded-[5px] mx-5 px-8 '>
          <TokenAmount title="Deposit" token={token} amount={amount} ltv={ltv} totalTokenAmount={totalTokenAmount} />
        </div>        
        <div className="py-12 px-5  leading-normal">By confirming this transaction, you agree to the <a className='underline' href="#goto">Terms of Use</a> and the services provisions relating to the MORE Protocol Vault.</div>
        <div className="flex justify-end py-8 more-bg-primary rounded-b-[20px] px-8">
          <div className='mr-5'><MoreButton className='text-xl px-2 py-4' text="Cancel" onClick={closeModal} color="gray" /></div>
          <MoreButton className='text-xl py-4' text="Deposit" onClick={() => handleDeposit()} color="primary" />
        </div>              
      </form>
    </div>
  );
};

export default VaultDepositConfirm;
