"use client";
import React, { useState } from 'react';
import InputTokenMax from '../../input/InputTokenMax';
import TotalVolumeToken from '../../token/TotalVolumeToken';
import MoreButton from '../../moreButton/MoreButton';
import TokenAmount from '../../token/TokenAmount';
import PositionChangeToken from '@/components/token/PositionChangeToken';
import MoreToggle from '@/components/moreToggle/MoreToggle';
import FormatTwoPourcentage from '@/components/tools/formatTwoPourcentage';
import IconToken from '@/components/token/IconToken';

interface Props {
  title: string;
  token: string;
  curator: string;
  balance: number;
  apy: number;
  ltv: string;
  totalWithdraw: number;
  totalTokenAmount: number;
  amount: number;
  validWithdraw: () => void;
  closeModal: () => void;
}

const VaultWithdrawTransaction: React.FC<Props> = ({ title, token, balance, apy, ltv, totalWithdraw, totalTokenAmount, curator, amount, validWithdraw, closeModal }) => {

  const [deposit, setWithdraw] = useState<number>(0);


  const handleWithdraw = () => {    
    validWithdraw();
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
    <div className='more-bg-secondary rounded-[20px] h-full w-full px-4'>
      <form onSubmit={handleSubmit}>
        <div className="mb-10 px-4 pt-5  text-xl">Review Transaction</div>
        <div className="text-l mb-1 px-4 pt-5 ">{title}</div>
        <div className="flex flex-row justify-between mt-4 items-center">
          <div className="flex gap-2 text-l mb-5  px-4 items-center"> <span className="more-text-gray">Curator:</span><IconToken className='w-6 h-6' tokenName='abt' ></IconToken> <span >{curator}</span></div>
          <div className="flex gap-2 text-l mb-5 px-4"><span className="more-text-gray">Liquidation LTV:</span> <FormatTwoPourcentage value={90} value2={125} ></FormatTwoPourcentage> </div>
        </div>
        <div className='more-bg-primary px-8 rounded-t-[5px] '>
          <TokenAmount title="Withdraw" token={token} amount={amount} ltv={ltv} totalTokenAmount={totalTokenAmount} />
        </div>   
        <div className='more-bg-primary rounded-b-[5px] mt-[1px] py-8 px-8 '>
          <div className='text-grey pb-4' > Position Change </div>
          <PositionChangeToken title="Collateral"  value={amount} token={token} value2={0} ></PositionChangeToken>
        </div>  
        
        <div className='flex flex-row justify-between items-center h-20 pl-2 pr-8 pt-4 ' >
          Unwrap USDC
          <MoreToggle  ></MoreToggle>
        </div>

        <div className="py-5 px-2">By confirming this transaction, you agree to the <a className='underline' href="#goto">Terms of Use</a> and the services provisions relating to the MORE Protocol Vault.</div>
        <div className="flex justify-end py-5  rounded-b-[20px] px-4">
          <div className='mr-5'><MoreButton className='text-2xl py-2' text="Cancel" onClick={closeModal} color="gray" /></div>
          <MoreButton className='text-2xl py-2' text="Confirm" onClick={() => handleWithdraw()} color="primary" />
        </div>              
      </form>
    </div>
  );
};

export default VaultWithdrawTransaction;
