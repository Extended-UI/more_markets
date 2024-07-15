"use client"

import { InvestmentData } from '@/types';
import React from 'react';
import Icon from '../FontAwesomeIcon';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import TableHeaderCell from './MoreTableHeader';
import ButtonDialog from '../buttonDialog/buttonDialog';
import VaultDeposit from '../modal/VaultDeposit';
import TotalVolumeToken from '../token/TotalVolumeToken';
import { BorrowData } from '@/types/borrowData';
import IconToken from '../token/IconToken';
import { DepositData } from '@/types/depositData';
import ListIconToken from '../token/ListIconToken';
import { LoanData } from '@/types/loandData';




const LoanMoreTable: React.FC<{}> = () => {


    const loansData: LoanData[] = [
        {
          token: "USDC",
          amount: "3,289.62",
          valueUSD: "$1.96M",
          liquidationLTV: "90% / 125%",
          borrowAPY: "14.1",
         
        },
        {
          token: "USDT",
          amount: "5,432.10",
          valueUSD: "$3.25M",
          liquidationLTV: "85% / 130%",
          borrowAPY: "12.3",
          
        }
      ];


      return (
<div className="overflow-x-auto relative rounded-[15px] mb-16"  style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <table className="w-full text-sm text-left  text-gray-400 border border-gray-800 " >
                <thead className="bg-[#212121] h-20 text-gray-400 text-xs text-white"     style={{ boxShadow: 'inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)' }}>
                <tr className="rounded-t-lg">
                    <th style={{ width: '100px' }} className="rounded-tl-lg"><TableHeaderCell title="Collateral" /></th>
                    <th style={{ width: '220px' }}><div className='flex justify-end pr-8 '><TableHeaderCell title="Loan" /></div></th>
                    <th style={{ width: '150px' }}><div className='flex justify-center '><TableHeaderCell title="Liquidation LTV" /></div></th>
                    <th style={{ width: '150px' }}><div className='flex justify-end '><TableHeaderCell title="1D Borrow APY" /></div></th>
                    <th ></th>
                </tr>
                </thead>
                <tbody className="bg-transparent">
                {loansData.map((item, index, arr) => (
                    <tr key={index} 
                        style={index === arr.length - 1 ? { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' } : undefined} 
                        className={`last:border-b-0 text-[12px]  ${index % 2 === 0 ? 'bg-transparent' : 'dark:bg-[#191919]'}`}>
                        <td className="py-4 px-6 items-center h-full">
                        <div className='flex items-center' ><div className='mr-2 w-6 h-6'><IconToken tokenName={item.token.toLocaleLowerCase()} ></IconToken></div>{item.token}</div>
                        </td>
                        <td className="py-4 max-w-[120px] items-center   h-full ">
                          <div className='flex gap-1 justify-center gap-2' >
                            <div className='text-[white] ' >{item.amount}</div> 
                            <div>{item.token}</div> 
                            <TotalVolumeToken>{item.valueUSD}</TotalVolumeToken>
                          </div>
                        </td>
                        
                        <td className="py-4  items-center h-full ">
                          <div className='flex gap-1 justify-center' >
                            <div className='text-[white] ' >{item.liquidationLTV}</div> 
                          </div> 
                        </td>
                        <td className="py-4 items-center h-full   ">
                         <div className='flex flex-row items-center justify-end text-white' >{item.borrowAPY}% </div>
                        </td> 
                        <td className="py-4 px-6 flex gap-2 items-center justify-end h-full">
                          <ButtonDialog color='secondary' buttonText='Borrow' > 
                              {(closeModal) => (
                                  <>
                                  <div className=" w-full h-full">
                                  <VaultDeposit title='USDMax Vault' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse'></VaultDeposit>
                                  </div>
                                  </>
                                  )}                            
                          </ButtonDialog>
                          
                          <ButtonDialog color='grey' buttonText='Repay' > 
                              {(closeModal) => (
                                  <>
                                  <div className=" w-full h-full">
                                  <VaultDeposit title='USDMax Vault' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse'></VaultDeposit>
                                  </div>
                                  </>
                                  )}                            
                          </ButtonDialog>
                          
                          
                        </td>
                          
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      );
    };
export default LoanMoreTable;
