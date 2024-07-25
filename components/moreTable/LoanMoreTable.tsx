"use client"

import { InvestmentData } from '@/types';
import React from 'react';
import Icon from '../FontAwesomeIcon';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import TableHeaderCell from './MoreTableHeader';
import ButtonDialog from '../buttonDialog/buttonDialog';
import VaultDeposit from '../modal/deposit/VaultDeposit';
import TotalVolumeToken from '../token/TotalVolumeToken';
import { BorrowData } from '@/types/borrowData';
import IconToken from '../token/IconToken';
import { DepositData } from '@/types/depositData';
import ListIconToken from '../token/ListIconToken';
import { LoanData } from '@/types/loandData';
import FormatTokenMillion from '../tools/formatTokenMillion';
import FormatTwoPourcentage from '../tools/formatTwoPourcentage';
import FormatPourcentage from '../tools/formatPourcentage';
import VaultWithdraw from '../modal/withdraw/VaultWithdraw';




const LoanMoreTable: React.FC<{}> = () => {


    const loansData: LoanData[] = [
        {
          token: "USDC",
          amount: 3289.62,
          valueUSD: 1.96,
          liquidationLTV: 90 ,
          liquidationLTV2: 125,
          borrowAPY: 14.1,
         
        },
        {
          token: "USDT",
          amount: 5432.10,
          valueUSD: 3.25,
          liquidationLTV: 85 ,
          liquidationLTV2: 125,
          borrowAPY: 12.3,
          
        }
      ];


      return (
<div className="overflow-x-auto relative rounded-[15px] mb-16"  style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <table className="w-full text-sm text-left   border border-gray-800 " >
                <thead className="bg-[#212121] h-20  text-xs "     style={{ boxShadow: 'inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)' }}>
                <tr className="rounded-t-lg">
                    <th style={{ width: '500px'}} className="rounded-tl-lg"><TableHeaderCell title="Collateral" /></th>
                    <th style={{ width: '400px'}} ><div className=' justify-start pr-8 '><TableHeaderCell title="Loan" /></div></th>
                    <th ><div className='flex justify-start '><TableHeaderCell title="Liquidation LTV" /></div></th>
                    <th ><div className='flex justify-start '><TableHeaderCell title="1D Borrow APY" /></div></th>
                </tr>
                </thead>
                <tbody className="bg-transparent">
                {loansData.map((item, index, arr) => (
                    <tr key={index} 
                        style={index === arr.length - 1 ? { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' } : undefined} 
                        className={`last:border-b-0 text-[12px]  ${index % 2 === 0 ? 'bg-transparent' : 'dark:bg-[#191919]'}`}>
                        <td className=" py-4 px-6 items-center h-full gap-2">
                          <div className='flex gap-2 items-center' >
                            <div className='flex items-center' ><div className='mr-2 w-6 h-6'><IconToken tokenName={item.token.toLocaleLowerCase()} ></IconToken></div>{item.token}</div>
                            <span> &lt;  </span>
                            <FormatTokenMillion value={item.amount} token={item.token} totalValue={item.valueUSD} ></FormatTokenMillion>
                            <div className='ml-8' ></div>
                            <ButtonDialog  color='secondary' buttonText='Add' > 
                                {(closeModal) => (
                                    <>
                                    <div className=" w-full h-full">
                                    <VaultDeposit title='USDMax Vault' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse' closeModal={closeModal}></VaultDeposit>
                                    </div>
                                    </>
                                    )}                            
                            </ButtonDialog>
                            
                            <ButtonDialog color='grey' buttonText='Withdraw' > 
                                {(closeModal) => (
                                    <>
                                    <div className=" w-full h-full">
                                    <VaultWithdraw title='USDMax Vault' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalWithdraw={3289.62} totalTokenAmount={1.96} curator='Flowverse' closeModal={closeModal}></VaultWithdraw>
                                    </div>
                                    </>
                                    )}                            
                            </ButtonDialog>
                          </div>                          
                        </td>

                        <td className=" py-4 px-6 items-center h-full gap-2">
                          <div className='flex gap-2 items-center' >
                          <FormatTokenMillion value={item.amount} token={item.token} totalValue={item.valueUSD} ></FormatTokenMillion>
                          <div className='ml-8' ></div>
                          <ButtonDialog  color='secondary' buttonText='Borrow' > 
                              {(closeModal) => (
                                  <>
                                  <div className=" w-full h-full">
                                  <VaultDeposit title='USDMax Vault' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse' closeModal={closeModal}></VaultDeposit>
                                  </div>
                                  </>
                                  )}                            
                          </ButtonDialog>
                          
                          <ButtonDialog color='grey' buttonText='Repay' > 
                              {(closeModal) => (
                                  <>
                                  <div className=" w-full h-full">
                                  <VaultDeposit title='USDMax Vault' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse' closeModal={closeModal}></VaultDeposit>
                                  </div>
                                  </>
                                  )}                            
                          </ButtonDialog>         
                        
                          </div>                          
                        </td>
                        
                        <td className="py-4 pl-4 items-center h-full ">
                          <div className='flex gap-1 justify-start' >
                            <FormatTwoPourcentage value={item.liquidationLTV} value2={item.liquidationLTV2} ></FormatTwoPourcentage>
                          </div> 
                        </td>
                        <td className="py-4 items-center h-full   ">
                          <div className='flex justify-start ml-3' >
                            <FormatPourcentage value={item.borrowAPY} ></FormatPourcentage>
                          </div>
                        </td> 
                       
                          
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      );
    };
export default LoanMoreTable;
