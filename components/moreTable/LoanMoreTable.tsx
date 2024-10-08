"use client"

import React from 'react';
import Icon from '../FontAwesomeIcon';
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
import VaultRepay from '../modal/repay/VaultRepay';
import VaultWithdrawBorrow from '../modal/withdrawBorrow/VaultWithdrawBorrow';
import VaultAdd from '../modal/add/VaultAdd';
import VaultBorrow from '../modal/borrow/VaultBorrow';




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
<div className="overflow-x-auto relative table-wrapper  mb-16"  style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', position: 'relative' }}>
        <table className="w-full text-sm text-left   border border-gray-800 " >
                <thead className="bg-[#212121] h-20  text-xs "     style={{ boxShadow: 'inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)' }}>
                <tr className="rounded-t-lg">
                    <th style={{ width: '500px'}} className="rounded-tl-lg"><TableHeaderCell title="Collateral" infoText="The token(s) that borrowers must lock in order to borrow funds." /></th>
                    <th style={{ width: '400px'}} ><div className=' justify-start pr-8 '><TableHeaderCell title="Loan" infoText="" /></div></th>
                    <th ><div className='flex justify-start '><TableHeaderCell title="Liquidation LTV" infoText="The standard maximum proportion of loan value to collateral value that borrowers must maintain in order to avoid liquidation." /></div></th>
                    <th ><div className='flex justify-start '><TableHeaderCell title="1D Borrow APY" infoText="The average annualized rate that borrowers paid over the trailing 24-hour period." /></div></th>
                </tr>
                </thead>
                <tbody className="bg-transparent">
                {loansData.map((item, index, arr) => (
                    <tr key={index}  
                        style={index === arr.length - 1 ? { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' } : undefined} 
                        className={`last:border-b-0   ${index % 2 === 0 ? 'bg-transparent' : 'dark:bg-[#191919]'}`}>
                        <td className=" py-4 px-4 items-center h-full gap-2">
                          <div className='flex gap-2 items-center' >
                            <div className='flex items-center' ><div className='mr-2 w-6 h-6'><IconToken tokenName={item.token.toLocaleLowerCase()} ></IconToken></div></div>
                            <span> &lt;  </span>
                            <FormatTokenMillion value={item.amount} token={item.token} totalValue={item.valueUSD} ></FormatTokenMillion>
                            <div className='ml-8' ></div>
                            <ButtonDialog  color='secondary' buttonText='Add' > 
                                {(closeModal) => (
                                    <>
                                    <div className=" w-full h-full">
                                    <VaultAdd title='Add Collateral' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalAdd={3289.62} totalTokenAmount={1.96} curator='Flowverse' closeModal={closeModal}></VaultAdd>
                                    </div>
                                    </>
                                    )}                            
                            </ButtonDialog>
                            
                            <ButtonDialog color='grey' buttonText='Withdraw' > 
                                {(closeModal) => (
                                    <>
                                    <div className=" w-full h-full">
                                    <VaultWithdrawBorrow title='Withdraw Collateral' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalWithdraw={3289.62} totalTokenAmount={1.96} curator='Flowverse' closeModal={closeModal}></VaultWithdrawBorrow>
                                    </div>
                                    </>
                                    )}                            
                            </ButtonDialog>
                          </div>                          
                        </td>

                        <td className=" py-4 px-4 items-center h-full gap-2">
                          <div className='flex gap-2 items-center' >
                          <IconToken className='w-6 h-6' tokenName={item.token.toLocaleLowerCase()} ></IconToken>
                          <FormatTokenMillion value={item.amount} token={item.token} totalValue={item.valueUSD} ></FormatTokenMillion>
                          <div className='ml-8' ></div>
                          <ButtonDialog  color='secondary' buttonText='Borrow More' > 
                              {(closeModal) => (
                                  <>
                                  <div className=" w-full h-full">
                                  <VaultBorrow title='USDMax' token={item.token} apy={14.1} balanceToken={473.18} balanceFlow={785.45} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse' credora='AAA' closeModal={closeModal} ></VaultBorrow>                                  </div>
                                  </>
                                  )}                            
                          </ButtonDialog>
                          
                          <ButtonDialog color='grey' buttonText='Repay' > 
                              {(closeModal) => (
                                  <>
                                  <div className=" w-full h-full">
                                  <VaultRepay title='Repay' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalRepay={3289.62} totalTokenAmount={1.96} curator='Flowverse' closeModal={closeModal}></VaultRepay>
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
