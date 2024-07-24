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
import FormatTwoPourcentage from '../tools/formatTwoPourcentage';
import FormatPourcentage from '../tools/formatPourcentage';
import FormatTokenMillion from '../tools/formatTokenMillion';




const EarnMoreTable: React.FC<{}> = () => {


  const sampleLoans: BorrowData[] = [
    { collateralToken: "USDC", loanToken: "DAI", liquidationLTV: 90, liquidationLTV2 : 130, borrowAPY: 14.1, utilization: 16.8, totalDeposits: 3289.62, totalValueUSD: 1.96 },
    { collateralToken: "USDT", loanToken: "USDA", liquidationLTV: 85, liquidationLTV2 : 130, borrowAPY: 12.3, utilization: 13.5, totalDeposits: 5432.10, totalValueUSD: 3.25 },
    { collateralToken: "USDA", loanToken: "USDA", liquidationLTV: 95, liquidationLTV2 : 130, borrowAPY: 8.6, utilization: 17.5, totalDeposits: 7654.32, totalValueUSD: 1.55 },
    { collateralToken: "USDC", loanToken: "WETH", liquidationLTV: 92, liquidationLTV2 : 130, borrowAPY: 4.9, utilization: 15.9, totalDeposits: 2987.65, totalValueUSD: 5.02 },
    { collateralToken: "USDT", loanToken: "WETH", liquidationLTV: 88, liquidationLTV2 : 130, borrowAPY: 15.8, utilization: 18.5, totalDeposits: 4567.89, totalValueUSD: 2.89 },
    { collateralToken: "USDT", loanToken: "DAI", liquidationLTV: 93, liquidationLTV2 : 130, borrowAPY: 14.7, utilization: 14.7, totalDeposits: 9876.54, totalValueUSD: 6.34 },
    { collateralToken: "USDA", loanToken: "USDA", liquidationLTV: 85, liquidationLTV2 : 130, borrowAPY: 13.8, utilization: 15.9, totalDeposits: 1234.56, totalValueUSD: 0.75 },
    { collateralToken: "DAI", loanToken: "DAI", liquidationLTV: 92, liquidationLTV2 : 130, borrowAPY: 12.7, utilization: 12.3, totalDeposits: 6789.01, totalValueUSD: 3.99 },
    { collateralToken: "WBTC", loanToken: "WETH", liquidationLTV: 90, liquidationLTV2 : 130, borrowAPY: 15.3, utilization: 7.8, totalDeposits: 3210.98, totalValueUSD: 1.87 },
    { collateralToken: "WETH", loanToken: "WETH", liquidationLTV: 88, liquidationLTV2 : 130, borrowAPY: 8.9, utilization: 4.6, totalDeposits: 8765.43, totalValueUSD: 5.67 }
  ];

  const router = useRouter();

      const goToDetail = (item :BorrowData ) => {
        router.push('/borrow/'+item.collateralToken);
      };
      return (
<div className="overflow-x-auto relative rounded-[15px] mb-16"  style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <table className="w-full text-sm text-left   border border-gray-800 " >
                <thead className="bg-[#212121] h-20  text-xs "     style={{ boxShadow: 'inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)' }}>
                <tr className="rounded-t-lg">
                    <th style={{ width: '200px' }} className="rounded-tl-lg"><TableHeaderCell title="Collateral Token" /></th>
                    <th style={{ width: '200px' }}><TableHeaderCell title="Loan Token" /></th>
                    <th style={{ width: '200px' }}><div className='flex justify-start '><TableHeaderCell title="Liquidation  LTV" /></div></th>
                    <th style={{ width: '200px' }}><TableHeaderCell title="1D Borrow APY" /></th>
                    <th style={{ width: '300px' }}><TableHeaderCell title="Utilisation" /></th>
                    <th style={{ width: '300px' }}><div className='flex justify-start'><TableHeaderCell title="Total Deposits" /></div></th>
                    <th style={{ position: 'sticky', right: 0, backgroundColor: '#212121', zIndex: 1, boxShadow: 'inset 0 2px 0px 0px rgba(0, 0, 0, 0.2)' }}></th>
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
                          <div className='flex gap-1 justify-start' >
                            <FormatTwoPourcentage value={item.liquidationLTV} value2={item.liquidationLTV2}></FormatTwoPourcentage>
                          </div>                           
                        </td>
                        <td className="py-4 px-6 items-center h-full">
                          <div className='flex justify-start' >
                            <FormatPourcentage value={item.borrowAPY} ></FormatPourcentage>
                          </div>
                        </td>
                        <td className="py-4 px-6 items-center h-full">
                          <div className='flex' ><FormatPourcentage value={item.utilization} ></FormatPourcentage></div>
                        </td>
                        <td className="py-4 px-6 items-center   h-full ">
                          <div className='flex justify-start' >
                            <FormatTokenMillion value={item.totalDeposits} token={item.loanToken} totalValue={item.totalDeposits} ></FormatTokenMillion>
                          </div>
                        </td>
                        <td className="py-4 px-6  items-center justify-start h-full" 
                        style={{ paddingRight:10 ,position: 'sticky', right: 0,  zIndex: 1, backgroundColor: `${index % 2 === 0 ? '#141414' : '#191919'}` }}>
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
