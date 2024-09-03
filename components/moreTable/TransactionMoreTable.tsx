"use client"

import React, { useEffect, useState } from 'react';
import { DetailEarnData } from '@/types/detailEarnData';
import TableHeaderCell from './MoreTableHeader';
import usePagination from '@/hooks/usePagination';
import Pagination from '../pagination/Pagination';
import TotalVolumeToken from '../token/TotalVolumeToken';
import FormatTokenMillion from '../tools/formatTokenMillion';

interface Props {
  
}

const TransactionsMoreTable: React.FC<Props> = () => {


    const tableData: DetailEarnData[] = [
      {
        allocationColor: "orange",
        supplyAmount: 3288.62,
        supplyCurrency: "USDC",
        supplyValue: 1.96,
        collateral: ["usdc", "btc", "add", "ada"],
        transaction: "Borrow",
        credoraRating: "CCC+ / BBB",
        unsecuredBorrowAmount: 7890.12,
        unsecuredBorrowValue: 4.98,
        time: "56 minutes ago",
        liquidationLTV: 0,
        liquidationLTV2: 0,
        unsecuredAPY: 0
      },
        {
          allocationColor: "green",
          supplyAmount: 5432.10,
          supplyCurrency: "USDT",
          supplyValue: 3.25,
          collateral: ["usdc", "btc", "add", "ada", "ant"],
          transaction: "Repay",
          credoraRating: "BB+ / AA-",
          unsecuredBorrowAmount: 6543.21,
          unsecuredBorrowValue: 3.67,
          time: "12 hours ago",
          liquidationLTV: 0,
          liquidationLTV2: 0,
          unsecuredAPY: 0
        },
        {
          allocationColor: "orange",
          supplyAmount: 3288.62,
          supplyCurrency: "USDC",
          supplyValue: 1.96,
          collateral: ["usdc", "btc", "add", "ada"],
          transaction: "Borrow",
          credoraRating: "CCC+ / BBB",
          unsecuredBorrowAmount: 7890.12,
          unsecuredBorrowValue: 4.98,
          time: "56 minutes ago",
          liquidationLTV: 0,
          liquidationLTV2: 0,
          unsecuredAPY: 0
        },
          {
            allocationColor: "green",
            supplyAmount: 5432.10,
            supplyCurrency: "USDT",
            supplyValue: 3.25,
            collateral: ["usdc", "btc", "add", "ada", "ant"],
            transaction: "Repay",
            credoraRating: "BB+ / AA-",
            unsecuredBorrowAmount: 6543.21,
            unsecuredBorrowValue: 3.67,
            time: "12 hours ago",
            liquidationLTV: 0,
            liquidationLTV2: 0,
            unsecuredAPY: 0
          },
          {
            allocationColor: "orange",
            supplyAmount: 3288.62,
            supplyCurrency: "USDC",
            supplyValue: 1.96,
            collateral: ["usdc", "btc", "add", "ada"],
            transaction: "Borrow",
            credoraRating: "CCC+ / BBB",
            unsecuredBorrowAmount: 7890.12,
            unsecuredBorrowValue: 4.98,
            time: "56 minutes ago",
            liquidationLTV: 0,
            liquidationLTV2: 0,
            unsecuredAPY: 0
          },
            {
              allocationColor: "green",
              supplyAmount: 5432.10,
              supplyCurrency: "USDT",
              supplyValue: 3.25,
              collateral: ["usdc", "btc", "add", "ada", "ant"],
              transaction: "Repay",
              credoraRating: "BB+ / AA-",
              unsecuredBorrowAmount: 6543.21,
              unsecuredBorrowValue: 3.67,
              time: "12 hours ago",
              liquidationLTV: 0,
              liquidationLTV2: 0,
              unsecuredAPY: 0
            },
          
      ];
      const itemsPerPage = 5;

      const { currentPage, totalPages, goToNextPage, goToPreviousPage } = usePagination(tableData.length, itemsPerPage);
      
      // Calculate the current page data slice
      const startIndex = (currentPage - 1) * itemsPerPage;
      const [currentPageData, setCurrentPageData] = useState<DetailEarnData[]>([]);
    
      
     
      return (
<div className="overflow-x-auto relative rounded-[15px] mb-16 w-full"  style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', position: 'relative', overflow: 'visible' }}>
        <h1 className="text-2xl mt-16 mb-8">Transactions</h1>
        <table className="w-full text-sm text-left   border border-gray-800 w-full " >
                <thead className="bg-[#212121] h-20  text-xs "     style={{ boxShadow: 'inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)' }}>
                <tr className="rounded-t-lg">
                    <th style={{ width: '200px' }} className="rounded-tl-lg"><TableHeaderCell title="Date & Time" infoText="" /></th>
                    <th style={{ width: '200px' }}><div className='flex justify-start'><TableHeaderCell title="Wallet" infoText="" /></div></th>
                    <th style={{ width: '200px' }}><div className='flex justify-start'><TableHeaderCell title="Hash" infoText="" /></div></th>
                    <th style={{ width: '200px' }}><div className='flex justify-start'><TableHeaderCell title="Transaction Type" infoText="" /></div></th>
                    <th style={{ width: '200px' }}> <div className='flex justify-start'><TableHeaderCell title="Amount" infoText="" /> </div></th>
                </tr>
                </thead>
                <tbody className="bg-transparent ">
                {tableData.map((item, index, arr) => (
                    <tr key={index} 
                        style={index === arr.length - 1 ? { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' } : undefined} 
                        className={`last:border-b-0 text-[12px]  cursor-pointer ${index % 2 === 0 ? 'bg-transparent' : 'dark:bg-[#191919]'}`}>
                       

                       <td className="py-4 px-6   h-full ">
                            <div className='flex gap-1 justify-start' ><div className=' ' >{item.time}</div></div>
                        </td>

                        <td className="py-4 px-6  items-center  h-full flex justify-start">
                            <span style={{ backgroundColor: item.allocationColor }} className={`w-5 h-5  rounded-full mr-2`}></span>
                            <span>0x1234...xxyz</span>
                        </td>

                        


                        <td className="py-4 px-6  items-center  h-full ">
                            <span>0x1234...xxyz</span>
                        </td>
                        
                         

                        <td className="py-4 px-6   h-full ">
                            <div className='flex gap-1 justify-start' ><div className=' ' >{item.transaction}</div> </div>
                        </td> 

                        <td className="py-4  items-center h-full ">
                          <div className='flex gap-1 justify-start items-center gap-2' >
                           <FormatTokenMillion value={item.supplyAmount} token={item.supplyCurrency} totalValue={item.supplyValue} ></FormatTokenMillion>
                          </div>
                        </td> 
                          
                    </tr>
                ))}
                </tbody>
            </table>
           
                <Pagination totalItems={tableData.length} ></Pagination>

        </div>
      );
    };
export default TransactionsMoreTable;
