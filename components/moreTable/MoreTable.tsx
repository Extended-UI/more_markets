

import { InvestmentData } from '@/types';
import React from 'react';




const Table: React.FC<{ investments: InvestmentData[] }> = () => {


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
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">Deposit Token</th>
            <th scope="col" className="py-3 px-6">Net APY</th>
            <th scope="col" className="py-3 px-6">Total Deposits</th>
            <th scope="col" className="py-3 px-6">Curator</th>
            <th scope="col" className="py-3 px-6">Collateral</th>
            <th scope="col" className="py-3 px-6">Unsecured</th>
            <th scope="col" className="py-3 px-6">Unsecured APY</th>
            <th scope="col" className="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((item, index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
              <td className="py-4 px-6">{item.tokenSymbol}</td>
              <td className="py-4 px-6">{item.netAPY.toFixed(1)}%</td>
              <td className="py-4 px-6">{item.totalDeposits}$</td>
              <td className="py-4 px-6">{item.curator}</td>
              <td className="py-4 px-6">{item.collateral.join(" ")}$</td>
              <td className="py-4 px-6">{item.unsecured}</td>
              <td className="py-4 px-6">{item.unsecuredAPY.toFixed(1)}%</td>
              <td className="py-4 px-6"><button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Deposit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
