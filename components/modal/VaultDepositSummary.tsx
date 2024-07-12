"use client";
import React, { useState } from 'react';
import InputTokenMax from '../input/InputTokenMax';
import TotalVolumeToken from '../token/TotalVolumeToken';
import MoreButton from '../moreButton/MoreButton';
import Icon from '../FontAwesomeIcon';
import DepositTokenAmount from '../token/DepositTokenAmount';

interface Props {
  title: string;
  token: string;
  balance: number;
  apy: number;
  ltv: string;
  totalDeposit: number;
  totalTokenAmount: number;
  processDone: () => void;
}

const VaultDeposit: React.FC<Props> = ({ title, token, balance, apy, ltv, totalDeposit, totalTokenAmount, processDone }) => {

  
  return (
    <div className='more-bg-secondary h-full rounded-[20px]'>      
        <div className="text-xl mb-10 px-4 pt-5">Transaction Confirmation</div>
        <div className="text-l mb-5 px-4"><span><Icon icon="circle-check" className="text-secondary text-xl cursor-pointer mr-5" /></span>Execute the following actions</div>
        <div className='more-bg-primary px-4 mx-5'> 
          <DepositTokenAmount token={token} amount={14.56} ltv={ltv} totalTokenAmount={totalTokenAmount} />
        </div>        
        <div className="text-l my-5 px-4"><span><Icon icon="circle" className="text-xl cursor-pointer mr-5" /></span>Transaction 0×47b3...bv87 has been successfully executed.</div>
        <div className='more-bg-primary px-4  py-2  rounded-b-[20px]'>
          <div className='mx-10 my-5 p-2 text-secondary border border-secondary border-dashed border-1 rounded-xl'>Confirming transaction... Browse MORE vaults while you wait.</div>                  
        </div>              
    </div>
  );
};

export default VaultDeposit;
