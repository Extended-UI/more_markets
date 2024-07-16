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
import VaultBorrow from '../modal/VaultBorrow';
import { useRouter } from 'next/navigation';




const EarnMoreTable: React.FC<{}> = () => {


  const sampleLoans: BorrowData[] = [
    { collateralToken: "USDC", loanToken: "DAI", liquidationLTV: "90% / 125%", borrowAPY: "14.1%", utilization: "16.8%", totalDeposits: "3,289.62", totalValueUSD: "$1.96M" },
    { collateralToken: "USDT", loanToken: "USDA", liquidationLTV: "85% / 130%", borrowAPY: "12.3%", utilization: "13.5%", totalDeposits: "5,432.10", totalValueUSD: "$3.25M" },
    { collateralToken: "USDA", loanToken: "USDA", liquidationLTV: "95% / 120%", borrowAPY: "8.6%", utilization: "17.5%", totalDeposits: "7,654.32", totalValueUSD: "$1.55M" },
    { collateralToken: "USDC", loanToken: "WETH", liquidationLTV: "92% / 128%", borrowAPY: "4.9%", utilization: "15.9%", totalDeposits: "2,987.65", totalValueUSD: "$5.02M" },
    { collateralToken: "USDT", loanToken: "WETH", liquidationLTV: "88% / 123%", borrowAPY: "15.8%", utilization: "18.5%", totalDeposits: "4,567.89", totalValueUSD: "$2.89M" },
    { collateralToken: "USDT", loanToken: "DAI", liquidationLTV: "93% / 127%", borrowAPY: "14.7%", utilization: "14.7%", totalDeposits: "9,876.54", totalValueUSD: "$6.34M" },
    { collateralToken: "USDA", loanToken: "USDA", liquidationLTV: "85% / 130%", borrowAPY: "13.8%", utilization: "15.9%", totalDeposits: "1,234.56", totalValueUSD: "$0.75M" },
    { collateralToken: "DAI", loanToken: "DAI", liquidationLTV: "92% / 128%", borrowAPY: "12.7%", utilization: "12.3%", totalDeposits: "6,789.01", totalValueUSD: "$3.99M" },
    { collateralToken: "WBTC", loanToken: "WETH", liquidationLTV: "90% / 125%", borrowAPY: "15.3%", utilization: "7.8%", totalDeposits: "3,210.98", totalValueUSD: "$1.87M" },
    { collateralToken: "WETH", loanToken: "WETH", liquidationLTV: "88% / 123%", borrowAPY: "8.9%", utilization: "4.6%", totalDeposits: "8,765.43", totalValueUSD: "$5.67M" }
  ];

  const router = useRouter();

      const goToDetail = (item :BorrowData ) => {
        router.push('/borrow/'+item.collateralToken);
      };
      return (
<div className="overflow-x-auto relative rounded-[15px] mb-16"  style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <table className="w-full text-sm text-left  text-gray-400 border border-gray-800 " >
                <thead className="bg-[#212121] h-20 text-gray-400 text-xs text-white"     style={{ boxShadow: 'inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)' }}>
                <tr className="rounded-t-lg">
                    <th style={{ width: '200px' }} className="rounded-tl-lg"><TableHeaderCell title="Collateral Token" /></th>
                    <th style={{ width: '120px' }}><TableHeaderCell title="NLoan Token" /></th>
                    <th style={{ width: '200px' }}><div className='flex justify-center '><TableHeaderCell title="Liquidation  LTV" /></div></th>
                    <th style={{ width: '200px' }}><TableHeaderCell title="1D Borrow APY" /></th>
                    <th style={{ width: '200px' }}><TableHeaderCell title="Utilisation" /></th>
                    <th style={{ width: '200px' }}><div className='flex justify-center'><TableHeaderCell title="Total Deposits" /></div></th>
                    <th style={{ width: '100px' }}></th>
                </tr>
                </thead>
                <tbody className="bg-transparent">
                {sampleLoans.map((item, index, arr) => (
                    <tr key={index} onClick={()=> goToDetail(item)}
                        style={index === arr.length - 1 ? { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' } : undefined} 
                        className={`last:border-b-0 text-[12px] cursor-pointer  ${index % 2 === 0 ? 'bg-transparent' : 'dark:bg-[#191919]'}`}>
                        <td className="py-4 px-6 items-center h-full">
                          <div className='flex items-center' ><div className='mr-2 w-6 h-6'><IconToken tokenName='abt' ></IconToken></div>{item.collateralToken}</div>
                        </td>
                        <td className="py-4 px-6 items-center h-full  ">
                         <div className='flex items-center' ><div className='mr-2 w-6 h-6'><IconToken tokenName='adx' ></IconToken></div>{item.loanToken}</div> 
                        </td> 
                        <td className="py-4  items-center h-full ">
                          <div className='flex gap-1 justify-center' >
                            <div className='text-[white] ' >{item.liquidationLTV}</div> %
                          </div> 
                        </td>
                        <td className="py-4 px-6 items-center h-full">
                          <div className='flex' ><div className='mr-2 w-5 h-5'></div>{item.borrowAPY}</div>
                        </td>
                        <td className="py-4 px-6 items-center h-full">
                          <div className='flex' ><div className='mr-2 w-5 h-5'></div>{item.utilization}</div>
                        </td>
                        <td className="py-4 px-6 items-center   h-full ">
                          <div className='flex gap-1 justify-center gap-2' >
                            <div className='text-[white] ' >{item.totalDeposits}</div> 
                            <div>{item.loanToken}</div> 
                            <TotalVolumeToken>{item.totalValueUSD}</TotalVolumeToken>
                          </div>
                        </td>
                        <td className="py-4 px-6  items-center justify-end h-full">
                        <div onClick={(event) => event.stopPropagation()}>
                          <ButtonDialog color='secondary' buttonText='Borrow' > 
                                {(closeModal) => (
                                    <>
                                    <div className=" w-full h-full">
                                    <VaultBorrow title='USDMax' token={item.collateralToken} apy={14.1} balanceToken={473.18} balanceFlow={785.45} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse' credora='AAA' closeModal={closeModal} ></VaultBorrow>
                                    </div>
                                    </>
                                    )}                            
                            </ButtonDialog>
                          </div>
                          </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      );
    };
export default EarnMoreTable;
