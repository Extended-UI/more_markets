"use client"

import { InvestmentData } from '@/types';
import React from 'react';
import Icon from '../FontAwesomeIcon';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import TableHeaderCell from './MoreTableHeader';
import ButtonDialog from '../buttonDialog/buttonDialog';
import VaultDeposit from '../modal/VaultDeposit';

interface Props {
    isEarn: boolean;
  }


const MoreTable: React.FC<Props> = ({ isEarn }) => {


    const investments: InvestmentData[] = [
        {
          tokenSymbol: "USDC",
          netAPY: 14.1,
          totalDeposits: 3289.62,
          totalValueUSD: 1.96,
          curator: 1,
          collateral: ["💰", "💰", "💰", "💰", "💰"],
          unsecured: 7890.12,
          unsecuredAPY: 16.8
        },
        {
          tokenSymbol: "USDT",
          netAPY: 12.3,
          totalDeposits: 5432.10,
          totalValueUSD: 3.25,
          curator: 2,
          collateral: ["💰", "💰", "💰", "💰", "💰"],
          unsecured: 6543.21,
          unsecuredAPY: 13.5
        },
        {
          tokenSymbol: "USDA",
          netAPY: 8.6,
          totalDeposits: 7654.32,
          totalValueUSD: 1.55,
          curator: 3,
          collateral: ["💰", "💰", "💰", "💰"],
          unsecured: 4321.09,
          unsecuredAPY: 17.5
        },
        {
          tokenSymbol: "USDC",
          netAPY: 4.9,
          totalDeposits: 2987.65,
          totalValueUSD: 5.02,
          curator: 4,
          collateral: ["💰", "💰", "💰", "💰"],
          unsecured: 8765.43,
          unsecuredAPY: 15.9
        },
        {
          tokenSymbol: "USDT",
          netAPY: 15.3,
          totalDeposits: 4567.89,
          totalValueUSD: 2.89,
          curator: 3,
          collateral: ["💰", "💰", "💰", "💰", "💰"],
          unsecured: 8765.43,
          unsecuredAPY: 18.5
        },
        {
          tokenSymbol: "USDT",
          netAPY: 14.7,
          totalDeposits: 9876.54,
          totalValueUSD: 6.34,
          curator: 5,
          collateral: ["💰", "💰", "💰", "💰", "💰"],
          unsecured: 3210.98,
          unsecuredAPY: 14.7
        },
        {
          tokenSymbol: "USDA",
          netAPY: 13.8,
          totalDeposits: 1234.56,
          totalValueUSD: 0.75,
          curator: 5,
          collateral: ["💰", "💰", "💰"],
          unsecured: 6789.01,
          unsecuredAPY: 15.9
        },
        {
          tokenSymbol: "DAI",
          netAPY: 12.7,
          totalDeposits: 6789.01,
          totalValueUSD: 3.99,
          curator: 1,
          collateral: ["💰", "💰", "💰", "💰"],
          unsecured: 9876.54,
          unsecuredAPY: 12.3
        },
        {
          tokenSymbol: "WBTC",
          netAPY: 15.3,
          totalDeposits: 3210.98,
          totalValueUSD: 1.87,
          curator: 5,
          collateral: ["💰", "💰", "💰", "💰", "💰"],
          unsecured: 4567.89,
          unsecuredAPY: 7.8
        },
        {
          tokenSymbol: "WETH",
          netAPY: 8.9,
          totalDeposits: 8765.43,
          totalValueUSD: 5.67,
          curator: 2,
          collateral: ["💰", "💰", "💰", "💰"],
          unsecured: 2987.65,
          unsecuredAPY: 4.6
        },
        {
          tokenSymbol: "USDA",
          netAPY: 18.4,
          totalDeposits: 4321.09,
          totalValueUSD: 2.45,
          curator: 2,
          collateral: ["💰", "💰", "💰", "💰", "💰"],
          unsecured: 7654.32,
          unsecuredAPY: 8.2
        },
        {
          tokenSymbol: "USDT",
          netAPY: 12.3,
          totalDeposits: 6543.21,
          totalValueUSD: 3.67,
          curator: 1,
          collateral: ["💰", "💰", "💰", "💰"],
          unsecured: 5432.10,
          unsecuredAPY: 14.6
        },
        {
          tokenSymbol: "DAI",
          netAPY: 11.3,
          totalDeposits: 7890.12,
          totalValueUSD: 4.98,
          curator: 6,
          collateral: ["💰", "💰", "💰", "💰", "💰"],
          unsecured: 3289.62,
          unsecuredAPY: 7.5
        }
      ];


      return (
<div className="overflow-x-auto relative rounded-[15px]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-800 " >
                <thead className="bg-[#212121] h-20 dark:text-gray-400 text-xs text-white uppercase"     style={{ boxShadow: 'inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)' }}>
                <tr className="rounded-t-lg">
                    <th className="w-48 rounded-tl-lg"><TableHeaderCell title="Deposit Token" /></th>
                    <th><TableHeaderCell title="Net APY" /></th>
                    <th><TableHeaderCell title="Total Deposits" /></th>
                    <th><TableHeaderCell title="Curator" /></th>
                    <th><TableHeaderCell title="Collateral" /></th>
                    <th><TableHeaderCell title="Unsecured" /></th>
                    <th className="w-48" ><TableHeaderCell title="Unsecured APY" /></th>
                    <th className="w-28" ></th>
                </tr>
                </thead>
                <tbody className="bg-transparent">
                {investments.map((item, index, arr) => (
                    <tr key={index} 
                        style={index === arr.length - 1 ? { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' } : undefined} 
                        className={`last:border-b-0  ${index % 2 === 0 ? 'bg-transparent' : 'bg-gray-100 dark:bg-[#191919]'}`}>
                        <td className="py-4 px-6 items-center h-full">{item.tokenSymbol}</td>
                        <td className="py-4 px-6 items-center h-full">{item.netAPY.toFixed(1)}%</td>
                        <td className="py-4 px-6 items-center h-full">{item.totalDeposits.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                        <td className="py-4 px-6 items-center h-full">{item.curator}</td>
                        <td className="py-4 px-6 items-center h-full">{item.collateral.join(" ")}</td>
                        <td className="py-4 px-6 items-center h-full">{item.unsecured.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                        <td className="py-4 px-6 items-center h-full justify-end flex  "><div className='py-2' >{item.unsecuredAPY.toFixed(1)}%</div></td>
                        <td className="py-4 px-6 items-center h-full"><ButtonDialog color='primary' buttonText='Deposit' > 
                        {(closeModal) => (
                            <>
                            <div className="artboard phone-1">
                            <VaultDeposit title='USDMax Vault' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96}></VaultDeposit>
                            </div>
                            </>
                            )}
                            
                             </ButtonDialog></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
      );
    };
export default MoreTable;
