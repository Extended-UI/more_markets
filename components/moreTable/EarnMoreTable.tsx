"use client"

import { InvestmentData } from '@/types';
import React, { useState } from 'react';
import Icon from '../FontAwesomeIcon';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import TableHeaderCell from './MoreTableHeader';
import ButtonDialog from '../buttonDialog/buttonDialog';
import VaultDeposit from '../modal/deposit/VaultDeposit';
import TotalVolumeToken from '../token/TotalVolumeToken';
import IconToken from '../token/IconToken';
import ListIconToken from '../token/ListIconToken';
import { useRouter } from 'next/navigation';
import FormatPourcentage from '../tools/formatPourcentage';
import FormatTokenMillion from '../tools/formatTokenMillion';

interface Props {
  inDetail? : boolean
}

const EarnMoreTable: React.FC<Props> = ({inDetail = true}) => {


    const investments: InvestmentData[] = [
        {
          tokenSymbol: "USDC",
          netAPY: 14.1,
          totalDeposits: 3289.62,
          totalValueUSD: 1.96,
          curator: "Flowverse",
          collateral: ["usdc", "btc", "add"],
          unsecured: 7890.12,
          unsecuredAPY: 16.8,
          credoraRating: "B / AA+",
        },
        {
          tokenSymbol: "USDT",
          netAPY: 12.3,
          totalDeposits: 5432.10,
          totalValueUSD: 3.25,
          curator: "AXA",
          collateral: ["usdc", "btc", "add"],
          unsecured: 6543.21,
          unsecuredAPY: 13.5,
          credoraRating: "B / AA+",
        },
        {
          tokenSymbol: "USDA",
          netAPY: 8.6,
          totalDeposits: 7654.32,
          totalValueUSD: 1.55,
          curator: "Enjin",
          collateral: ["usdc", "ada", "add", "aave"],
          unsecured: 4321.09,
          unsecuredAPY: 17.5,
          credoraRating: "B / AA+",
        },
        {
          tokenSymbol: "USDC",
          netAPY: 4.9,
          totalDeposits: 2987.65,
          totalValueUSD: 5.02,
          curator: "Plygon",
          collateral: ["usdc", "ada", "add", "aave"],
          unsecured: 8765.43,
          unsecuredAPY: 15.9,
          credoraRating: "B / AA+",
        },
        {
          tokenSymbol: "USDT",
          netAPY: 15.3,
          totalDeposits: 4567.89,
          totalValueUSD: 2.89,
          curator: "adder",
          collateral: ["usdc", "algo", "add"],
          unsecured: 8765.43,
          unsecuredAPY: 18.5,
          credoraRating: "B / AA+",
        },
        {
          tokenSymbol: "USDT",
          netAPY: 14.7,
          totalDeposits: 9876.54,
          totalValueUSD: 6.34,
          curator: "Metaverse",
          collateral: ["usdc", "algo", "add"],
          unsecured: 3210.98,
          unsecuredAPY: 14.7,
          credoraRating: "B / AA+",
        },
        {
          tokenSymbol: "USDA",
          netAPY: 13.8,
          totalDeposits: 1234.56,
          totalValueUSD: 0.75,
          curator: "Bitcoin",
          collateral: ["usdc", "0xbtc", "ada"],
          unsecured: 6789.01,
          unsecuredAPY: 15.9,
          credoraRating: "B / AA+",
        },
        {
          tokenSymbol: "DAI",
          netAPY: 12.7,
          totalDeposits: 6789.01,
          totalValueUSD: 3.99,
          curator: "Bitcoin",
          collateral: ["usdc", "btc", "add", "aave"],
          unsecured: 9876.54,
          unsecuredAPY: 12.3,
          credoraRating: "B / AA+",
        },
        {
          tokenSymbol: "Walgo",
          netAPY: 15.3,
          totalDeposits: 3210.98,
          totalValueUSD: 1.87,
          curator: "Bitcoin",
          collateral: ["usdc", "algo", "add"],
          unsecured: 4567.89,
          unsecuredAPY: 7.8,
          credoraRating: "B / AA+",
        },
        {
          tokenSymbol: "Wadd",
          netAPY: 8.9,
          totalDeposits: 8765.43,
          totalValueUSD: 5.67,
          curator: "Bitcoin",
          collateral: ["usdc", "btc", "add", "aave"],
          unsecured: 2987.65,
          unsecuredAPY: 4.6,
          credoraRating: "B / AA+",
        },
        {
          tokenSymbol: "USDA",
          netAPY: 18.4,
          totalDeposits: 4321.09,
          totalValueUSD: 2.45,
          curator: "Bitcoin",
          collateral: ["usdc", "algo", "add"],
          unsecured: 7654.32,
          unsecuredAPY: 8.2,
          credoraRating: "B / AA+",
        },
        {
          tokenSymbol: "USDT",
          netAPY: 12.3,
          totalDeposits: 6543.21,
          totalValueUSD: 3.67,
          curator: "Bitcoin",
          collateral: ["usdc", "btc", "add", "aave"],
          unsecured: 5432.10,
          unsecuredAPY: 14.6,
          credoraRating: "B / AA+",
        },
        {
          tokenSymbol: "DAI",
          netAPY: 11.3,
          totalDeposits: 7890.12,
          totalValueUSD: 4.98,
          curator: "Bitcoin",
          collateral: ["usdc", "algo", "add"],
          unsecured: 3289.62,
          unsecuredAPY: 7.5,
          credoraRating: "B / AA+",
        }
      ];
      const [isStickyDisabled, setIsStickyDisabled] = useState(false);

      const router = useRouter();

      const goToDetail = (item :InvestmentData ) => {
        router.push('/earn/'+item.tokenSymbol);
      };

      const toggleSticky = () => {
        setIsStickyDisabled(!isStickyDisabled);
      };
        return (
        <div className="overflow-x-auto table-wrapper  mb-16" style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', position: 'relative' }}>
            <table className="w-full text-sm text-left ">
                <thead className="bg-[#212121] h-20 text-xs" style={{ boxShadow: 'inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)' }}>
                    <tr className="">
                        <th style={{ width: '200px' }} className=""><TableHeaderCell title="Vault Name" infoText="" /></th>
                        <th style={{ width: '200px' }} className=""><TableHeaderCell title="Deposit Token" infoText="The token(s) eligible for deposit into the vault and which are lent to borrowers in order to generate yield." /></th>
                        <th style={{ width: '150px' }}><TableHeaderCell title="Net APY" infoText="The annualized return you earn on your deposited amount after all fees. This rate fluctuates in real-time based on supply and demand in the underlying markets." /></th>
                        <th style={{ width: '200px' }}><div className='flex justify-start'><TableHeaderCell title="Total Deposits" infoText="The total amount of tokens that have already been deposited into the vault." /></div></th>
                        <th style={{ width: '200px' }}><TableHeaderCell title="Curator" infoText="The organization that manages the vault parameters such as included markets, allocations, caps and performance fees." /></th>
                        <th style={{ width: '200px' }}><TableHeaderCell title="Collateral" infoText="The token(s) that borrowers must lock in order to borrow funds." /></th>
                        <th style={{ width: '200px' }}><div className='flex justify-start'><TableHeaderCell title="Unsecured" infoText="The total amount of credit (above the standard LTV) issued by the all markets in the vault to premium, rated borrowers." /></div></th>
                        <th style={{ width: '220px' }}><div className='flex justify-start'><TableHeaderCell title="Unsecured APY" infoText="The annualized rate you earn specifically from premium borrowers that have borrowed above the standard LTV." /></div></th>
                        <th style={{ width: '200px' }}><div className='flex justify-start'><TableHeaderCell title="Credora Rating" infoText="The weighted average and minimum S&P equivalent rating, issued by Credora for all premium borrowers across all markets in a vault. The rating represents the aggregate solvency of premium borrowers based on their holdings outside of MORE Markets." /></div></th>
                        {inDetail && (
                           <th
                           style={{
                             right: 0, /* Sticky on the right side */
                             backgroundColor: '#212121', /* Background color to make it visible */
                             position: isStickyDisabled ? 'static' : 'sticky', /* Conditionally apply sticky positioning */
                             top: 0, /* Stick to the top when scrolling */
                             zIndex: 2, /* Ensure it stays above other elements */
                             boxShadow: 'inset 0 2px 0px 0px rgba(0, 0, 0, 0.2)', /* Shadow effect */
                           }}
                         ></th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-transparent">
                    {investments.map((item, index, arr) => (
                        <tr key={index} onClick={() => goToDetail(item)}
                            style={index === arr.length - 1 ? { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' } : undefined} 
                            className={`last:border-b-0  border border-[#202020] cursor-pointer ${index % 2 === 0 ? 'bg-[#141414]' : 'bg-[#191919]'}`}>
                            <td className="py-4 px-4 items-center h-full">
                              <div className='flex items-center ' ><div className='mr-2 w-6 h-6'><IconToken tokenName='usdc' ></IconToken></div>{item.tokenSymbol}</div>
                            </td>
                            <td className="py-4 px-4 items-center h-full">
                              <div className='flex items-center ' ><div className='mr-2 w-6 h-6'><IconToken tokenName='usdc' ></IconToken></div>{item.tokenSymbol}</div>
                            </td>
                            <td className="py-4 px-4 items-center h-full  ">
                              <div className='flex gap-1 justify-start' >
                                <FormatPourcentage value={item.netAPY} ></FormatPourcentage>
                              </div>
                            </td>
                            <td className="py-4  items-center h-full ">
                              <FormatTokenMillion value={item.totalDeposits} token={item.tokenSymbol} totalValue={item.totalValueUSD} ></FormatTokenMillion>                          
                            </td>
                            <td className="py-4 px-4 items-center h-full">
                              <div className='flex' ><div className='mr-2 w-5 h-5'><IconToken tokenName='abt' ></IconToken></div>{item.curator}</div>
                            </td>
                            <td className="py-4  items-center h-full pl-4"><ListIconToken className="w-6 h-6" iconNames={item.collateral} ></ListIconToken></td>
                            <td className="py-4 px-4 items-center   h-full ">
                              <FormatTokenMillion value={item.totalDeposits} token={item.tokenSymbol} totalValue={item.unsecured} ></FormatTokenMillion> 
                            </td>
                            <td className="py-4 px-4 items-center  h-full "> 
                              <div className='flex gap-1 justify-start' >
                                <FormatPourcentage value={item.unsecuredAPY} ></FormatPourcentage>
                              </div>
                            </td>
                            <td className="py-4  items-center h-full ">
                                <div className='py-4 pl-4 flex justify-start' >{item.credoraRating}</div>
                            </td>
                            {inDetail &&  <td className={`py-4 px-4 items-center justify-end h-full ${isStickyDisabled ? '' : 'sticky'}`} style={{ right: 0, backgroundColor: index % 2 === 0 ? '#141414' : '#191919' }}>

                              <div className='' onClick={(event) => event.stopPropagation()}>
                                <ButtonDialog color='primary' buttonText='Deposit' onButtonClick={toggleSticky}> 
                                  {(closeModal) => (
                                    <>
                                      <div className="h-full w-full">
                                        <VaultDeposit title='USDMax Vault' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse' closeModal={closeModal}></VaultDeposit>
                                      </div>
                                    </>
                                  )}          
                                </ButtonDialog>
                              </div>
                            </td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    };
export default EarnMoreTable;
