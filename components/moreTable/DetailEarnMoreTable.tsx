"use client"

import { InvestmentData } from '@/types';
import React from 'react';
import Icon from '../FontAwesomeIcon';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import TableHeaderCell from './MoreTableHeader';
import ButtonDialog from '../buttonDialog/buttonDialog';
import VaultDeposit from '../modal/deposit/VaultDeposit';
import TotalVolumeToken from '../token/TotalVolumeToken';
import IconToken from '../token/IconToken';
import ListIconToken from '../token/ListIconToken';
import { useRouter } from 'next/navigation';
import { DetailEarnData } from '@/types/detailEarnData';
import FormatTokenMillion from '../tools/formatTokenMillion';
import FormatPourcentage from '../tools/formatPourcentage';
import FormatTwoPourcentage from '../tools/formatTwoPourcentage';

interface Props {
  
}

const DetailEarnMoreTable: React.FC<Props> = () => {


    const tableData: DetailEarnData[] = [
        {
          allocation: 16.8,
          supplyAmount: 3288.62,
          supplyCurrency: "USDC",
          supplyValue: 1.96,
          collateral: ["usdc", "btc", "add", "ada"],
          liquidationLTV: 130,
          liquidationLTV2: 80,
          credoraRating: "CCC+ / BBB",
          unsecuredBorrowAmount: 7890.12,
          unsecuredBorrowValue: 4.98,
          unsecuredAPY: 16.8
        },
        {
          allocation: 13.5,
          supplyAmount: 5432.10,
          supplyCurrency: "USDT",
          supplyValue: 3.25,
          collateral: ["usdc", "btc", "add", "ada","ant"],
          liquidationLTV: 130,
          liquidationLTV2: 80,
          credoraRating: "BB+ / AA-",
          unsecuredBorrowAmount: 6543.21,
          unsecuredBorrowValue: 3.67,
          unsecuredAPY: 13.5
        },
        {
          allocation: 17.5,
          supplyAmount: 7654.32,
          supplyCurrency: "USDA",
          supplyValue: 1.55,
          collateral: ["usdc", "btc", "add", "ada"],
          liquidationLTV: 130,
          liquidationLTV2: 80,
          credoraRating: "CC+ / A-",
          unsecuredBorrowAmount: 4321.09,
          unsecuredBorrowValue: 2.45,
          unsecuredAPY: 17.5
        },
        {
          allocation: 15.9,
          supplyAmount: 2987.65,
          supplyCurrency: "USDC",
          supplyValue: 5.02,
          collateral: ["usdc", "btc", "add", "ada"],
          liquidationLTV: 130,
          liquidationLTV2: 80,
          credoraRating: "CCC / BBB+",
          unsecuredBorrowAmount: 8765.43,
          unsecuredBorrowValue: 5.67,
          unsecuredAPY: 15.9
        },
        {
          allocation: 18.5,
          supplyAmount: 4567.89,
          supplyCurrency: "USDT",
          supplyValue: 2.89,
          collateral: ["ant"],
          liquidationLTV: 130,
          liquidationLTV2: 80,
          credoraRating: "B+ / AA",
          unsecuredBorrowAmount: 8765.43,
          unsecuredBorrowValue: 1.87,
          unsecuredAPY: 18.5
        },
        {
          allocation: 14.7,
          supplyAmount: 9878.54,
          supplyCurrency: "USDT",
          supplyValue: 6.34,
          collateral: [ "btc", "add", "ada"],
          liquidationLTV: 130,
          liquidationLTV2: 80,
          credoraRating: "BB / A+",
          unsecuredBorrowAmount: 3210.98,
          unsecuredBorrowValue: 3.99,
          unsecuredAPY: 14.7
        },
        {
          allocation: 15.9,
          supplyAmount: 1234.56,
          supplyCurrency: "USDA",
          supplyValue: 0.75,
          collateral: ["usdc", "btc", "add", "ada"],
          liquidationLTV: 130,
          liquidationLTV2: 80,
          credoraRating: "B / AA+",
          unsecuredBorrowAmount: 6789.01,
          unsecuredBorrowValue: 0.75,
          unsecuredAPY: 15.9
        }
      ];

      const router = useRouter();

      const goToDetail = (item :InvestmentData ) => {
        router.push('/earn/'+item.tokenSymbol);
      };
      return (
<div className="overflow-x-auto relative rounded-[15px] mb-16"  style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', position: 'relative', overflow: 'visible' }}>
        <table className="w-full text-sm text-left   border border-gray-800 " >
                <thead className="bg-[#212121] h-20  text-xs "     style={{ boxShadow: 'inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)' }}>
                <tr className="rounded-t-lg">
                    <th style={{ width: '140px' }} className="rounded-tl-lg  "><div className='flex justify-start'><TableHeaderCell title="Allocation" infoText="The percentage of total deposits allocated to the given market." /></div></th>
                    <th style={{ width: '200px' }}  > <div className='flex justify-start'><TableHeaderCell title="Deposits"  infoText="The total amount of tokens currently lent in the given market."/></div></th>
                    <th style={{ width: '200px' }}><div className='flex justify-start'><TableHeaderCell title="Collateral" infoText="The token(s) that borrowers must lock in order to borrow funds." /></div></th>
                    <th style={{ width: '200px' }}> <div className='flex justify-start'><TableHeaderCell title="Liquidation LTV" infoText="The standard maximum proportion of loan value to collateral value that borrowers must maintain in order to avoid liquidation." /> </div></th>
                    <th style={{ width: '200px' }}> <div className='flex justify-start'><TableHeaderCell title="Credora Rating" infoText="The weighted average and minimum S&P equivalent rating, issued by Credora for all premium borrowers across all markets in a vault. The rating represents the aggregate solvency of premium borrowers based on their holdings outside of MORE Markets." /> </div></th>
                    <th style={{ width: '200px' }}><div className='flex justify-start'><TableHeaderCell title="Unsecured Borrow" infoText="The total amount of credit (above the standard LTV)  issued by the given market to premium, rated borrowers." /></div></th>
                    <th style={{ width: '200px' }}><div className='flex justify-start'><TableHeaderCell title="Unsecured APY" infoText="The annualized rate you earn specifically from premium borrowers that have borrowed above the standard LTV." /></div></th>
                </tr>
                </thead>
                <tbody className="bg-transparent">
                {tableData.map((item, index, arr) => (
                    <tr key={index} 
                        style={index === arr.length - 1 ? { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' } : undefined} 
                        className={`last:border-b-0 text-[12px]  cursor-pointer ${index % 2 === 0 ? 'bg-transparent' : 'dark:bg-[#191919]'}`}>
                       
                        <td className="py-4 px-6 items-center h-full  ">
                          <div className='flex justify-start ' >
                            <FormatPourcentage value={item.allocation || 1.6} ></FormatPourcentage>
                          </div>
                        </td>
                        <td className="py-4  items-center h-full ">
                          <div className='flex justify-start' >
                            <FormatTokenMillion value={item.supplyAmount} token={item.supplyCurrency} totalValue={item.supplyValue} ></FormatTokenMillion> 
                          </div>
                        </td>                        
                        <td className="py-4  items-center h-full"><div className='flex justify-start'><ListIconToken className="w-6 h-6 " iconNames={item.collateral} ></ListIconToken></div></td>
                        
                        <td className="py-4 px-6 items-center  "><div className=' flex justify-start py-4 ' > <FormatTwoPourcentage value={item.liquidationLTV2} value2={item.liquidationLTV}></FormatTwoPourcentage> </div></td>
                        

                        <td className="py-4  items-center h-full ">
                            <div className='py-4 flex justify-start' >{item.credoraRating}</div>
                        </td>

                        <td className="py-4  items-center h-full ">
                          <FormatTokenMillion value={item.unsecuredBorrowAmount} token={item.supplyCurrency} totalValue={item.unsecuredBorrowValue} ></FormatTokenMillion> 
                        </td>
                        
                        <td className="py-4 px-6 items-center  h-full   ">
                          <div className='flex justify-start' >
                            <FormatPourcentage value={item.unsecuredAPY} ></FormatPourcentage>
                          </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      );
    };
export default DetailEarnMoreTable;
