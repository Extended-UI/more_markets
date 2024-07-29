"use client";
import React, { useState } from 'react';
import InputTokenMax from '../input/InputTokenMax';
import TotalVolumeToken from '../token/TotalVolumeToken';
import MoreButton from '../moreButton/MoreButton';
import TokenAmount from '../token/TokenAmount';
import IconToken from '../token/IconToken';

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

const VaultDetail: React.FC<Props> = ({ title, token, balance, apy, ltv, totalDeposit, totalTokenAmount, curator, amount, validDeposit, closeModal }) => {

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
    <div className='more-bg-secondary rounded-[20px] h-full w-full'>
      <form onSubmit={handleSubmit}>
        <div className="mb-7 px-4 pt-5  text-xl">{title}</div>
        <div className="text-xl mb-1 px-4 pt-5 pb-5 ">Vault Strategy</div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-l flex items-center gap-2 flex mb-5 px-4"><span className="more-text-gray">Curator:</span>
              <IconToken  className='w-6 h-6' tokenName={token} ></IconToken>
              <span >{curator}</span>
          </div>
          <div className="text-l mb-5 px-4"><span className="more-text-gray">Liquidation LTV:</span> {ltv}</div>
        </div>
        <div className='px-4 my-4 text-gray'>
        This is a blurb that describes the strategy of the vault and any specific information that the curator might want to communicate to depositors.
        It can include things like the rationale, the risk tolerance, any calculations or other information that is helpful to the user. This text should be limited to 4 lines (however many characters that makes since this is about that.
        </div>        
        <div className='w-[50%] mx-15 flex justify-center mx-auto'>
          <div className='glowing-text-primary w-full'></div>
        </div>         
        <div className='more-bg-primary px-4 rounded-b-[10px] py-2'>
          <div className="flex justify-between mt-5">        
            <div>Vault Address:</div>
            <div>0x000000000000000000</div>
          </div>
          <div className="flex justify-between mt-5">        
            <div>Vault Deployment Date</div>
            <div className="">July 2024</div>
          </div>            
          <div className="flex justify-between mt-5">        
            <div>Guardian Address</div>
            <div>0x000000000000000000</div>
          </div>  
          <div className="flex justify-between mt-5 pb-4 ">        
            <div>Risk Curator Tumelock</div>
            <div>2 Days</div>
          </div>                                       
        </div>             
      </form>
    </div>
  );
};

export default VaultDetail;
