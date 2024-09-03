import React from 'react'
import TotalVolumeToken from './TotalVolumeToken';

interface Props {    
    token: string;
    ltv: string;    
    totalTokenAmount: number;
    amount: number;
  }
  

  const BorrowTokenAmount: React.FC<Props> = ({ token, ltv, totalTokenAmount, amount }) => {
  return (    
      <div className="flex flex-row justify-between items-center h-20">
        <div className='text-2xl'>Borrow</div>        
        <div className="flex flex-row items-center">
            <div className="text-xl mr-2">{amount}</div>    
            <div className="text-xl mr-2 more-text-gray">{token}</div>                        
            <TotalVolumeToken>{totalTokenAmount}</TotalVolumeToken>
        </div>
    </div>
  )
}

export default BorrowTokenAmount
