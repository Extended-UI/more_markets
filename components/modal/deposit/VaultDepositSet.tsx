"use client";
import React, { useState } from 'react';
import InputTokenMax from '../../input/InputTokenMax';
import TotalVolumeToken from '../../token/TotalVolumeToken';
import MoreButton from '../../moreButton/MoreButton';
import FormatNumber from '../../tools/formatNumber';
import ListIconToken from '@/components/token/ListIconToken';
import IconToken from '@/components/token/IconToken';
import FormatTokenMillion from '@/components/tools/formatTokenMillion';

interface Props {
  title: string;
  token: string;
  balance: number;
  apy: number;
  ltv: string;
  totalDeposit: number;
  totalTokenAmount: number;
  setAmount: (amount: number) => void;
  closeModal: () => void;
}

const VaultDepositSet: React.FC<Props> = ({ title, token, balance, apy, ltv, totalDeposit, totalTokenAmount, setAmount, closeModal }) => {
  const [deposit, setDeposit] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit(parseFloat(event.target.value));
  };

  const handleSetMax = (maxValue: number) => {
    setDeposit(maxValue);
  };


  const handleDeposit = () => {
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
      // console.log('Deposit response:', data);
    } catch (error) {
      console.error('Error submitting deposit:', error);
    }
  };


  const balanceString = balance.toString();

  return (
    <div className='more-bg-secondary w-full rounded-[20px]'>
      <form onSubmit={handleSubmit}>
        <div className="text-4xl mb-10 px-4 pt-10 ">{title}</div>
        <div className="text-l mb-5 px-4">Deposit {token}</div>
        <div className=' px-4'>
          <InputTokenMax type="number" value={deposit} onChange={handleInputChange} min="0" max={balanceString}  placeholder={`Deposit ${token}`}  token={token} balance={balance}  setMax={handleSetMax}/>
        </div>
        <div className="text-right more-text-gray px-4 mt-4">Balance: {balance} {token}</div>        
        <div className="flex justify-end mt-7 mb-7 px-4">
          <div className='mr-5 '><MoreButton className='text-2xl py-2' text="Cancel" onClick={closeModal} color="gray" /></div>
          <MoreButton className='text-2xl py-2'  text="Deposit" onClick={() => handleDeposit()} color="primary" />
        </div>
        <div className='w-[50%] mx-15 flex justify-center mx-auto'>
          <div className='glowing-text-primary w-full'></div>
        </div>
        <div className='more-bg-primary px-4 rounded-b-[10px] py-2'>
          <div className="flex justify-between mt-10">        
            <div>APY:</div>
            <div>{apy}<span className="more-text-gray">%</span></div>
          </div>
          <div className="flex justify-between mt-10">        
            <div>Total Deposits</div>
            <div >
              <FormatTokenMillion value={totalDeposit} totalValue={totalTokenAmount} token={token} ></FormatTokenMillion>
            </div>
          </div>
          <div className="flex justify-between mt-10 pb-4 ">        
            <div>Liquidation LTV</div>
            <div className="text-primary">{ltv}</div>
          </div>  
        </div>              
      </form>
    </div>
  );
};

export default VaultDepositSet;
