"use client";
import React, { useState } from 'react';
import InputTokenMax from '../../input/InputTokenMax';
import TotalVolumeToken from '../../token/TotalVolumeToken';
import MoreButton from '../../moreButton/MoreButton';
import Icon from '../../FontAwesomeIcon';
import TokenAmount from '@/components/token/TokenAmount';
import BorrowTokenAmount from '../../token/BorrowTokenAmount';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  title: string;
  token: string;
  balance: number;
  apy: number;
  ltv: string;
  totalDeposit: number;
  totalTokenAmount: number;
  amount: number;
  borrow: number;
  processDone: () => void;
  closeModal: () => void;
}

const VaultBorrowSummary: React.FC<Props> = ({ title, token, balance, apy, ltv, totalDeposit, totalTokenAmount, amount, borrow, processDone, closeModal }) => {



  const handleCancel = () => {
    console.log("CANCEL")
  };


  
  return (
    <div className='more-bg-secondary h-full rounded-[20px]'>      
        <div className="text-xl mb-10 px-4 pt-5 ">Transaction Confirmation</div>
        <div className="text-l flex mb-5 px-4"><span><CheckCircleIcon  className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5" /></span>Authorize the MORE to execute multiple actions in a single transaction when updating your positions</div>
        <div className="text-l flex mb-5 px-4"><span><CheckCircleIcon  className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5" /></span>Approve the bundler to spend 12.35 {token} (via permit)</div>   
        <div className="text-l flex mb-5 px-4"><span><CheckCircleIcon  className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5" /></span>Execute the following actions</div>                
        <div className='more-bg-primary px-4 mx-5'> 
          <TokenAmount title="Deposit" token={token} amount={amount} ltv={ltv} totalTokenAmount={totalTokenAmount} />
        </div>   
        <div className='more-bg-primary px-4 mx-5'> 
          <BorrowTokenAmount token={title} amount={borrow} ltv={ltv} totalTokenAmount={totalTokenAmount} />
        </div>                        
        <div className="text-l my-5 px-4"><span><Icon icon="circle" className="text-xl cursor-pointer mr-5" /></span>Transaction 0×47b3...bv87 has been successfully executed.</div>
        <div className='more-bg-primary px-4  py-2  rounded-b-[20px]' onClick={closeModal}>
          <div className='mx-10 my-5 p-2 text-secondary border border-secondary border-dashed border-1 rounded-xl'>Confirming transaction... Browse MORE vaults while you wait.</div>                  
        </div>              
    </div>
  );
};

export default VaultBorrowSummary;
