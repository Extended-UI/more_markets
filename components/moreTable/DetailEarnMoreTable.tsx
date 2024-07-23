"use client"

import { InvestmentData } from '@/types';
import React from 'react';
import Icon from '../FontAwesomeIcon';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import TableHeaderCell from './MoreTableHeader';
import ButtonDialog from '../buttonDialog/buttonDialog';
import VaultDeposit from '../modal/VaultDeposit';
import TotalVolumeToken from '../token/TotalVolumeToken';
import IconToken from '../token/IconToken';
import ListIconToken from '../token/ListIconToken';
import { useRouter } from 'next/navigation';
import { DetailEarnData } from '@/types/detailEarnData';

interface Props {
  
}

const DetailEarnMoreTable: React.FC<Props> = () => {


    const tableData: DetailEarnData[] = [
        {
          allocation: "16.8",
          supplyAmount: "3,288.62",
          supplyCurrency: "USDC",
          supplyValue: "$1.96M",
          collateral: ["usdc", "btc", "add", "ada"],
          liquidationLTV: "90% / 125%",
          credoraRating: "CCC+ / BBB",
          unsecuredBorrowAmount: "7,890.12",
          unsecuredBorrowValue: "$4.98M",
          unsecuredAPY: "16.8"
        },
        {
          allocation: "13.5",
          supplyAmount: "5,432.10",
          supplyCurrency: "USDT",
          supplyValue: "$3.25M",
          collateral: ["usdc", "btc", "add", "ada","ant"],
          liquidationLTV: "85% / 130%",
          credoraRating: "BB+ / AA-",
          unsecuredBorrowAmount: "6,543.21",
          unsecuredBorrowValue: "$3.67M",
          unsecuredAPY: "13.5"
        },
        {
          allocation: "17.5",
          supplyAmount: "7,654.32",
          supplyCurrency: "USDA",
          supplyValue: "$1.55M",
          collateral: ["usdc", "btc", "add", "ada"],
          liquidationLTV: "95% / 120%",
          credoraRating: "CC+ / A-",
          unsecuredBorrowAmount: "4,321.09",
          unsecuredBorrowValue: "$2.45M",
          unsecuredAPY: "17.5"
        },
        {
          allocation: "15.9",
          supplyAmount: "2,987.65",
          supplyCurrency: "USDC",
          supplyValue: "$5.02M",
          collateral: ["usdc", "btc", "add", "ada"],
          liquidationLTV: "92% / 128%",
          credoraRating: "CCC / BBB+",
          unsecuredBorrowAmount: "8,765.43",
          unsecuredBorrowValue: "$5.67M",
          unsecuredAPY: "15.9"
        },
        {
          allocation: "18.5",
          supplyAmount: "4,567.89",
          supplyCurrency: "USDT",
          supplyValue: "$2.89M",
          collateral: ["ant"],
          liquidationLTV: "88% / 123%",
          credoraRating: "B+ / AA",
          unsecuredBorrowAmount: "8,765.43",
          unsecuredBorrowValue: "$1.87M",
          unsecuredAPY: "18.5"
        },
        {
          allocation: "14.7",
          supplyAmount: "9,878.54",
          supplyCurrency: "USDT",
          supplyValue: "$6.34M",
          collateral: [ "btc", "add", "ada"],
          liquidationLTV: "93% / 127%",
          credoraRating: "BB / A+",
          unsecuredBorrowAmount: "3,210.98",
          unsecuredBorrowValue: "$3.99M",
          unsecuredAPY: "14.7"
        },
        {
          allocation: "15.9",
          supplyAmount: "1,234.56",
          supplyCurrency: "USDA",
          supplyValue: "$0.75M",
          collateral: ["usdc", "btc", "add", "ada"],
          liquidationLTV: "85% / 130%",
          credoraRating: "B / AA+",
          unsecuredBorrowAmount: "6,789.01",
          unsecuredBorrowValue: "$0.75M",
          unsecuredAPY: "15.9"
        }
      ];

      const router = useRouter();

      const goToDetail = (item :InvestmentData ) => {
        router.push('/earn/'+item.tokenSymbol);
      };
      return (
<div className="overflow-x-auto relative rounded-[15px] mb-16"  style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <table className="w-full text-sm text-left   border border-gray-800 " >
                <thead className="bg-[#212121] h-20  text-xs "     style={{ boxShadow: 'inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)' }}>
                <tr className="rounded-t-lg">
                    <th style={{ width: '200px' }} className="rounded-tl-lg"><TableHeaderCell title="Allocation" /></th>
                    <th style={{ width: '120px' }}  > <div className='flex justify-center'><TableHeaderCell title="Supply" /></div></th>
                    <th style={{ width: '200px' }}><div className='flex justify-center'><TableHeaderCell title="Collateral" /></div></th>
                    <th style={{ width: '200px' }}> <div className='flex justify-end'><TableHeaderCell title="Liquidation LTV" /> </div></th>
                    <th style={{ width: '200px' }}> <div className='flex justify-center'><TableHeaderCell title="Credora Rating" /> </div></th>
                    <th style={{ width: '200px' }}><div className='flex justify-end'><TableHeaderCell title="Unsecured Borrow" /></div></th>
                    <th style={{ width: '200px' }}><div className='flex justify-end'><TableHeaderCell title="Unsecured APY" /></div></th>
                </tr>
                </thead>
                <tbody className="bg-transparent">
                {tableData.map((item, index, arr) => (
                    <tr key={index} 
                        style={index === arr.length - 1 ? { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' } : undefined} 
                        className={`last:border-b-0 text-[12px]  cursor-pointer ${index % 2 === 0 ? 'bg-transparent' : 'dark:bg-[#191919]'}`}>
                       
                        <td className="py-4 px-6 items-center h-full  ">
                          <div className='flex gap-1 justify-center' >
                            <div className=' ' >{item.allocation}</div> %
                          </div>
                        </td>
                        <td className="py-4  items-center h-full ">
                          <div className='flex gap-1 justify-center gap-2' >
                            <div className=' ' >{item.supplyAmount}</div> 
                            <div>{item.supplyCurrency}</div> 
                            <TotalVolumeToken>{item.supplyValue}</TotalVolumeToken>
                          </div>
                        </td>                        
                        <td className="py-4  items-center h-full"><div className='flex justify-center'><ListIconToken className="w-6 h-6 " iconNames={item.collateral} ></ListIconToken></div></td>
                        
                        <td className="py-4 px-6 items-center flex  "><div className=' flex justify-center py-4 ' >{item.liquidationLTV}</div></td>
                        

                        <td className="py-4  items-center h-full ">
                            <div className='py-4 flex justify-center' >{item.credoraRating}</div>
                        </td>

                        <td className="py-4  items-center h-full ">
                          <div className='flex gap-1 justify-center gap-2' >
                            <div className=' ' >{item.unsecuredBorrowAmount}</div> 
                            <div>{item.supplyCurrency}</div> 
                            <TotalVolumeToken>{item.unsecuredBorrowValue}</TotalVolumeToken>
                          </div>
                        </td>
                        
                        <td className="py-4 px-6 items-center justify-end h-full  flex  "><div className='flex gap-1 justify-center' >
                            <div className=' ' >{item.unsecuredAPY}</div> %
                          </div></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      );
    };
export default DetailEarnMoreTable;
