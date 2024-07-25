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
import FormatPourcentage from '../tools/formatPourcentage';
import FormatTokenMillion from '../tools/formatTokenMillion';
import VaultWithdraw from '../modal/withdraw/VaultWithdraw';




const DepositMoreTable: React.FC<{}> = () => {


    const depositData: DepositData[] = [
        {
          tokenName: "USDC",
          apy: 14.1,
          curator : "Flowverse",
          depositAmount: 3289.62,
          depositValueUSD: 1.96,
         collaterals:["usdc", "ada", "add", "aave"]
        },
        {
          tokenName: "USDT",
          apy: 12.3,
          curator : "Metaverse",
          depositAmount: 5432.10,
          depositValueUSD: 3.25,
          collaterals:[ "ada", "add", "aave"]
        }
      ];


      return (
<div className="overflow-x-auto relative rounded-[15px] mb-16"  style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <table className="w-full text-sm text-left   border border-gray-800 " >
                <thead className="bg-[#212121] h-20  text-xs "     style={{ boxShadow: 'inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)' }}>
                <tr className="rounded-t-lg">
                    <th style={{ width: '200px' }} className="rounded-tl-lg"><TableHeaderCell title="Deposit Token" /></th>
                    <th style={{ width: '120px' }}><TableHeaderCell title="Net Apy" /></th>
                    <th style={{ width: '200px' }}><div className='flex justify-start '><TableHeaderCell title="My Deposit" /></div></th>
                    <th style={{ width: '200px' }}><TableHeaderCell title="Curator" /></th>
                    <th style={{ width: '200px' }}><TableHeaderCell title="Collateral" /></th>
                    <th style={{ position: 'sticky', right: 0, backgroundColor: '#212121',  boxShadow: 'inset 0 2px 0px 0px rgba(0, 0, 0, 0.2)' }}></th>
                </tr>
                </thead>
                <tbody className="bg-transparent">
                {depositData.map((item, index, arr) => (
                    <tr key={index} 
                        style={index === arr.length - 1 ? { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' } : undefined} 
                        className={`last:border-b-0 text-[12px]  cursor-pointer  ${index % 2 === 0 ? 'bg-transparent' : 'dark:bg-[#191919]'}`}>
                        <td className="py-4 px-6 items-start h-full">
                        <div className='flex items-start' ><div className='mr-2 w-6 h-6'><IconToken tokenName={item.tokenName.toLocaleLowerCase()} ></IconToken></div>{item.tokenName}</div>
                        </td>
                        <td className="py-4 px-6 items-start h-full   ">
                          <div className='flex justify-start' >
                            <FormatPourcentage value={item.apy} ></FormatPourcentage>
                          </div>
                        </td> 
                        <td className=" items-start   h-full ">
                          <FormatTokenMillion value={item.depositAmount} token={item.tokenName} totalValue={item.depositValueUSD} ></FormatTokenMillion> 
                        </td>
                        <td className="py-4 px-6 items-start h-full  ">
                         <div className='flex items-start' ><div className='mr-2 w-6 h-6'><IconToken tokenName='abt' ></IconToken></div>{item.curator}</div> 
                        </td> 
                        <td className="py-4  items-start h-full"><ListIconToken className="w-6 h-6" iconNames={item.collaterals} ></ListIconToken></td>
                        <td className="py-4 px-6 flex gap-2 items-center justify-end h-full"  style={{ paddingRight:10 ,position: 'sticky', right: 0,   backgroundColor: `${index % 2 === 0 ? '#141414' : '#191919'}` }}>
                          <ButtonDialog color='primary' buttonText='Deposit More' > 
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
                          
                          
                          </td>
                          
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      );
    };
export default DepositMoreTable;
