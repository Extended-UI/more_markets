import React from 'react';
import TotalVolumeToken from '../token/TotalVolumeToken';
import FormatNumber from './formatNumber';

interface Props {
    token?: string;
    value: number;  
    totalValue: number;  
    totalDanger?: boolean;
    currency?: string;
}


const FormatTokenMillion: React.FC<Props> = ({ token, value, totalValue, totalDanger, currency }) => {
    // Vous pouvez ajouter une vérification ici si besoin
    return  <div className='flex gap-1 justify-center items-center gap-2  ' >
                <div className=' ' ><span className='text-grey'>{currency}</span><FormatNumber value={value} ></FormatNumber></div> 
                <div className='text-grey ' >{token}</div> 
                <TotalVolumeToken totalDanger={totalDanger} >{totalValue}</TotalVolumeToken>
            </div>
}

export default FormatTokenMillion;
