"use client";
import React, { useState } from 'react';
import InputTokenMax from '../../input/InputTokenMax';
import TotalVolumeToken from '../../token/TotalVolumeToken';
import MoreButton from '../../moreButton/MoreButton';
import ListIconToken from '@/components/token/ListIconToken';
import FormatPourcentage from '@/components/tools/formatPourcentage';

interface Props {
  title: string;
  token: string;
  balanceToken: number;
  balanceFlow: number;
  apy: number;
  ltv: string;
  totalDeposit: number;
  totalTokenAmount: number;
  credora: string;
  setAmount: (amount: number, borrow: number) => void;
  closeModal: () => void;
}

const VaultBorrowSet: React.FC<Props> = ({ credora, title, token, balanceToken, balanceFlow, apy, ltv, totalDeposit, totalTokenAmount, setAmount, closeModal }) => {
  const [deposit, setDeposit] = useState<number>(0);
  const [borrow, setBorrow] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit(parseFloat(event.target.value));
  };

  const handleSetMaxToken = (maxValue: number) => {
    setDeposit(maxValue);
  };


  const handleSetMaxFlow = (maxValue: number) => {
    setBorrow(maxValue);
  };


  const handleBorrow = () => {
    console.log("DEPOSIT")
    if (deposit > 0 && borrow > 0) {
      setAmount(deposit, borrow);
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
      // console.log('Deposit response:', data);
    } catch (error) {
      console.error('Error submitting deposit:', error);
    }
  };

  const balanceTokenString = balanceToken.toString();
  const balanceFlowString = balanceFlow.toString();

  return (
    <div className='more-bg-secondary w-full rounded-[12px]'>
      <form onSubmit={handleSubmit}>
        <div className="text-2xl  mb-10 px-8 pt-14 ">Borrow</div>
        <div className="text-l mb-1 px-8">Deposit {token} Collateral</div>
        <div className=' py-2 px-8'>
          <InputTokenMax type="number" value={deposit} onChange={handleInputChange} min="0" max={balanceTokenString}  placeholder={`Deposit ${token}`}  token={token} balance={balanceToken}  setMax={handleSetMaxToken}/>
        </div>
        <div className="text-right more-text-gray py-2 px-8">Balance: {balanceToken} {token}</div> 
        <div className="text-l mb-1 px-8 py-2 mt-3">Borrow FLOW</div>
        <div className=' px-8'>
          <InputTokenMax type="number" value={borrow} onChange={handleInputChange} min="0" max={balanceFlowString}  placeholder={`Deposit ${balanceFlow}`}  token="Flow" balance={balanceFlow}  setMax={handleSetMaxFlow}/>
        </div>
        <div className="text-right more-text-gray py-2 px-8">Balance: {balanceFlow} FLOW</div>                
        <div className="flex justify-end mt-7 mb-7 px-8">
          <div className='mr-5' ><MoreButton className='text-l  py-4' text="Cancel" onClick={closeModal} color="gray" /></div>
          <MoreButton className='text-l  py-4' text="Borrow" onClick={() => handleBorrow()} color="secondary" />
        </div>
        <div className='w-[50%] mx-15 flex justify-center mx-auto'>
          <div className='glowing-text-secondary w-full'></div>
        </div>        
        <div className='more-bg-primary px-8 rounded-b-[10px] py-2'>
          <div className="flex justify-between mt-5">        
            <div>1D Borrow APY:</div>
            <div className="">{apy}<span className="more-text-gray">%</span></div>
          </div>
          <div className="flex justify-between mt-5  ">        
            <div>Your Premium Liquidation LTV</div>
            <div className=""><FormatPourcentage value={apy}></FormatPourcentage> </div>
          </div>            
          <div className="flex justify-between mt-5">        
            <div>Available Liquidity</div>
            <div className="">{totalDeposit} <span className="more-text-gray">{token}</span> </div>
          </div>
          <div className="flex justify-between mt-5 pb-4 ">        
            <div>Your Credora Rating</div>
            <div className="">{credora}</div>
          </div>             
        </div>              
      </form>
    </div>
  );
};

export default VaultBorrowSet;
