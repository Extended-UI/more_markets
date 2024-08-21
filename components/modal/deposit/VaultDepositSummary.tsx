"use client";
import React, { useState } from 'react';
import InputTokenMax from '../../input/InputTokenMax';
import TotalVolumeToken from '../../token/TotalVolumeToken';
import MoreButton from '../../moreButton/MoreButton';
import Icon from '../../FontAwesomeIcon';
import TokenAmount from '@/components/token/TokenAmount';

interface Props {
  title: string;
  token: string;
  balance: number;
  apy: number;
  ltv: string;
  amount: number;
  totalDeposit: number;
  totalTokenAmount: number;
  processDone: () => void;
  closeModal: () => void;
}

const VaultDepositSummary: React.FC<Props> = ({ title, token, balance, apy, ltv, totalDeposit, totalTokenAmount, processDone, closeModal, amount }) => {

  
  return (
    <div className='more-bg-secondary h-full pt-14 rounded-[12px]'>      
        <div className="text-2xl   mb-10 px-8  ">Transaction Confirmation</div>
        <div className="text-xl mb-5 px-8"><span><Icon icon="circle-check" className="text-secondary text-xl cursor-pointer mr-5" /></span>Execute the following actions</div>
        <div className='more-bg-primary px-8 mx-5  '> 
          <TokenAmount title="Deposit" token={token} amount={amount} ltv={ltv} totalTokenAmount={totalTokenAmount} />
        </div>        
        <div className="text-xl  my-10 px-8"><span><Icon icon="circle" className="text-xl cursor-pointer mr-5" /></span>Transaction 0×47b3...bv87 has been successfully executed.</div>
        <div className='more-bg-primary   py-2  rounded-b-[20px]' onClick={closeModal}>
          <div className='mx-8 my-5 p-4 text-secondary border border-secondary border-dashed border-1 rounded-xl'>Confirming transaction... Browse MORE vaults while you wait.</div>                  
        </div>              
    </div>
  );
};

export default VaultDepositSummary;
