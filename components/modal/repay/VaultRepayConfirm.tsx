"use client";
import React, { useState } from 'react';
import InputTokenMax from '../../input/InputTokenMax';
import TotalVolumeToken from '../../token/TotalVolumeToken';
import MoreButton from '../../moreButton/MoreButton';
import Icon from '../../FontAwesomeIcon';
import TokenAmount from '@/components/token/TokenAmount';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  title: string;
  token: string;
  balance: number;
  apy: number;
  ltv: string;
  amount: number;
  totalRepay: number;
  totalTokenAmount: number;
  processDone: () => void;
  closeModal: () => void;
}

const VaultRepayConfirm: React.FC<Props> = ({ title, token, balance, apy, ltv, totalRepay, totalTokenAmount, processDone, closeModal, amount }) => {

  
  return (
    <div className='more-bg-secondary h-full rounded-[20px] py-8'>      
        <div className="text-4xl mb-10 px-4 pt-5 ">Transaction Confirmation</div>
        <div className="flex items-center text-2xl mb-5 px-4"><span><CheckCircleIcon  className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5" /></span>Approve the bundler to spend 0.19 USDmax (via permit) </div>
        <div className="flex items-center text-2xl mb-5 px-4"><span><CheckCircleIcon  className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5" /></span>Bundle the following action </div>


        <div className='more-bg-primary rounded-[5px] mb-5 py-8 px-4 mx-5 '> 
            Repay 0.50 USDC from USDmax
        </div>        
        
        <div className="flex items-center text-2xl mb-5 px-4"><span><CheckCircleIcon  className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5" /></span>Transaction 0x7854...854xs has been succefully executed</div>
        <div className="flex justify-end py-5  rounded-b-[20px] px-4">
          <div className='mr-5'><MoreButton className='text-2xl py-2' text="Done" onClick={closeModal} color="secondary" /></div>
        </div>              
    </div>
  );
};

export default VaultRepayConfirm;
