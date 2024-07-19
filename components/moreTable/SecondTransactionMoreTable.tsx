"use client"

import React, { useEffect, useState } from 'react';
import { DetailEarnData } from '@/types/detailEarnData';
import TableHeaderCell from './MoreTableHeader';
import usePagination from '@/hooks/usePagination';
import Pagination from '../pagination/Pagination';
import TotalVolumeToken from '../token/TotalVolumeToken';

interface Props {
  
}

const SecondTransactionsMoreTable: React.FC<Props> = () => {


    const tableData: DetailEarnData[] = [
        {
            allocation: "orange",
            supplyAmount: "3,288.62",
            supplyCurrency: "USDC",
            supplyValue: "$1.96M",
            collateral: ["usdc", "btc", "add", "ada"],
            liquidationLTV: "Borrow",
            credoraRating: "CCC+ / BBB",
            unsecuredBorrowAmount: "7,890.12",
            unsecuredBorrowValue: "$4.98M",
            unsecuredAPY: "56 minutes ago"
          },
          {
            allocation: "green",
            supplyAmount: "5,432.10",
            supplyCurrency: "USDT",
            supplyValue: "$3.25M",
            collateral: ["usdc", "btc", "add", "ada","ant"],
            liquidationLTV: "Repay",
            credoraRating: "BB+ / AA-",
            unsecuredBorrowAmount: "6,543.21",
            unsecuredBorrowValue: "$3.67M",
            unsecuredAPY: "12 hours ago"
          },
          
      ];
      const itemsPerPage = 5;

      const { currentPage, totalPages, goToNextPage, goToPreviousPage } = usePagination(tableData.length, itemsPerPage);
      
      // Calculate the current page data slice
      const startIndex = (currentPage - 1) * itemsPerPage;
      const [currentPageData, setCurrentPageData] = useState<DetailEarnData[]>([]);
    
     
     
      return (
<div className="overflow-x-auto relative rounded-[15px] mb-16 w-full"  style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <h1 className="text-2xl mt-16 mb-8">Transactions</h1>
        <table className="w-full text-sm text-left  text-gray-400 border border-gray-800 w-full " >
                <thead className="bg-[#212121] h-20 text-gray-400 text-xs text-white"     style={{ boxShadow: 'inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)' }}>
                <tr className="rounded-t-lg">
                    <th style={{ width: '200px' }} className="rounded-tl-lg"><TableHeaderCell title="Date & Time" /></th>
                    <th style={{ width: '200px' }}><div className='flex justify-center'><TableHeaderCell title="Liquidation Wallet" /></div></th>
                    <th style={{ width: '200px' }}><div className='flex justify-center'><TableHeaderCell title="Liquidator" /></div></th>
                    <th style={{ width: '200px' }}><div className='flex justify-center'><TableHeaderCell title="Hash" /></div></th>
                    <th style={{ width: '200px' }}> <div className='flex justify-center'><TableHeaderCell title="Collateral Sized" /> </div></th>
                    <th style={{ width: '200px' }}> <div className='flex justify-center'><TableHeaderCell title="Loan Repaid" /> </div></th>
                    <th style={{ width: '200px' }}> <div className='flex justify-center'><TableHeaderCell title="Realized Bad Dept" /> </div></th>

                </tr>
                </thead>
                <tbody className="bg-transparent ">
                {tableData.map((item, index, arr) => (
                    <tr key={index} 
                        style={index === arr.length - 1 ? { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' } : undefined} 
                        className={`last:border-b-0 text-[12px]  cursor-pointer ${index % 2 === 0 ? 'bg-transparent' : 'dark:bg-[#191919]'}`}>
                       

                       <td className="py-4 px-6  items-center  h-full ">
                            <div className='flex gap-1 justify-start' ><div className='text-[white] ' >{item.unsecuredAPY}</div></div>
                        </td>

                        <td className="py-4 px-6  items-center  h-full flex justify-start">
                            <span style={{ backgroundColor: item.allocation }} className={`w-5 h-5  rounded-full mr-2`}></span>
                            <span>0x1234...xxyz</span>
                        </td>

                        


                        <td className="py-4 px-6  items-center  h-full ">
                            <span>0x1234...xxyz</span>
                        </td>

                        <td className="py-4 px-6  items-center  h-full ">
                            <span>0x1234...xxyz</span>
                        </td>
                        
                         

                        <td className="py-4  items-center h-full ">
                          <div className='flex gap-1 justify-center items-center gap-2' >
                            <div className='text-[white] ' >{item.supplyAmount}</div> 
                            <div>{item.supplyCurrency}</div> 
                            <TotalVolumeToken>{item.supplyValue}</TotalVolumeToken>                          
                          </div>
                        </td> 

                        <td className="py-4  items-center h-full ">
                          <div className='flex gap-1 justify-center items-center gap-2' >
                            <div className='text-[white] ' >{item.supplyAmount}</div> 
                            <div>{item.supplyCurrency}</div> 
                            <TotalVolumeToken>{item.supplyValue}</TotalVolumeToken>                          
                          </div>
                        </td> 

                        <td className="py-4  items-center h-full ">
                          <div className='flex gap-1 justify-center items-center gap-2' >
                            <div className='text-[white] ' >{item.supplyAmount}</div> 
                            <div>{item.supplyCurrency}</div> 
                            <TotalVolumeToken>{item.supplyValue}</TotalVolumeToken>                          
                          </div>
                        </td> 
                          
                    </tr>
                ))}
                </tbody>
            </table>
           

        </div>
      );
    };
export default SecondTransactionsMoreTable;
