import React from 'react'
import TotalVolumeToken from './TotalVolumeToken';
import IconToken from './IconToken';
import FormatTokenMillion from '../tools/formatTokenMillion';

interface Props {    
    title: string;
    token: string;
    ltv: string;    
    totalTokenAmount: number;
    amount: number;
  }
  

  const TokenAmount: React.FC<Props> = ({ title, token, ltv, totalTokenAmount, amount }) => {
  return (    
      <div className="flex flex-row justify-between items-center h-20">
        <div className='text-xl'>{title}</div>        
        <div className="flex flex-row items-center">
            <IconToken tokenName={token}  className='mr-4 w-6'></IconToken>
            <FormatTokenMillion value={amount} token={token} totalValue={totalTokenAmount} ></FormatTokenMillion>
        </div>
    </div>
  )
}

export default TokenAmount
