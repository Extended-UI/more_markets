"use client"

import React from 'react';
import { DetailEarnData } from '@/types/detailEarnData';
import TableHeaderCell from './MoreTableHeader';
import usePagination from '@/hooks/usePagination';
import Pagination from '../pagination/Pagination';

interface Props {
  
}

const BorrowersMoreTable: React.FC<Props> = () => {


    const tableData: DetailEarnData[] = [
        {
            allocation: "orange",
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
            allocation: "green",
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
            allocation: "yellow",
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
            allocation: "orange",
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
            allocation: "green",
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
            allocation: "yellow",
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
          
      ];
      const itemsPerPage = 5;

      const { currentPage, totalPages, goToNextPage, goToPreviousPage } = usePagination(tableData.length, itemsPerPage);
      
      // Calculate the current page data slice
      const startIndex = (currentPage - 1) * itemsPerPage;
      const currentPageData = tableData.slice(startIndex, startIndex + itemsPerPage);
    

     
      return (
<div className="overflow-x-auto relative rounded-[15px] mb-16 w-full"  style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <h1 className="text-2xl mt-16 mb-8">Borrowers</h1>
        <table className="w-full text-sm text-left   border border-gray-800 w-full " >
                <thead className="bg-[#212121] h-20  text-xs "     style={{ boxShadow: 'inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)' }}>
                <tr className="rounded-t-lg">
                    <th style={{ width: '200px' }} className="rounded-tl-lg"><TableHeaderCell title="Wallet" /></th>
                    <th style={{ width: '200px' }}><div className='flex justify-center'><TableHeaderCell title="Collateral" /></div></th>
                    <th style={{ width: '200px' }}><div className='flex justify-center'><TableHeaderCell title="Loan" /></div></th>
                    <th style={{ width: '200px' }}><div className='flex justify-center'><TableHeaderCell title="Health Factor" /></div></th>
                    <th style={{ width: '200px' }}> <div className='flex justify-center'><TableHeaderCell title="Share" /> </div></th>
                </tr>
                </thead>
                <tbody className="bg-transparent ">
                {currentPageData.map((item, index, arr) => (
                    <tr key={index} 
                        style={index === arr.length - 1 ? { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' } : undefined} 
                        className={`last:border-b-0 text-[12px]  cursor-pointer ${index % 2 === 0 ? 'bg-transparent' : 'dark:bg-[#191919]'}`}>
                       
                        <td className="py-4 px-6  items-center  h-full flex justify-start">
                            <span style={{ backgroundColor: item.allocation }} className={`w-5 h-5  rounded-full mr-2`}></span>
                            <span>0x1234...xxyz</span>
                        </td>

                       <td className="py-4  items-center h-full ">
                          <div className='flex gap-1 justify-center items-center gap-2' >
                            <div >{item.supplyAmount}</div> 
                            <div>{item.supplyCurrency}</div>                            
                          </div>
                        </td>  

                        <td className="py-4  items-center h-full ">
                          <div className='flex gap-1 justify-center items-center gap-2' >
                            <div  >{item.supplyAmount}</div> 
                            <div>{item.supplyCurrency}</div>                            
                          </div>
                        </td>  
                        
                        <td className="py-4 px-6  items-center justify-end h-full ">
                            <div className='flex gap-1 justify-center' ><div  >{item.unsecuredAPY}</div></div>
                        </td> 

                        <td className="py-4 px-6  items-center justify-end h-full ">
                            <div className='flex gap-1 justify-center' ><div  >{item.unsecuredAPY}</div> % </div>
                        </td> 
                          
                    </tr>
                ))}
                </tbody>
            </table>
            <div className='w-full flex justify-end my-4 mr-4' >
                <Pagination totalItems={tableData.length} ></Pagination>
            </div>

        </div>
      );
    };
export default BorrowersMoreTable;
