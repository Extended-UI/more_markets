"use client";

import React, { useEffect, useState } from "react";
import Icon from "../FontAwesomeIcon";
import TableHeaderCell from "./MoreTableHeader";
import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDeposit from "../modal/deposit/VaultDeposit";
import TotalVolumeToken from "../token/TotalVolumeToken";
import { BorrowData } from "@/types/borrowData";
import IconToken from "../token/IconToken";
import { DepositData } from "@/types/depositData";
import ListIconToken from "../token/ListIconToken";
import { LoanData } from "@/types/loandData";
import FormatTokenMillion from "../tools/formatTokenMillion";
import FormatTwoPourcentage from "../tools/formatTwoPourcentage";
import FormatPourcentage from "../tools/formatPourcentage";
import VaultWithdraw from "../modal/withdraw/VaultWithdraw";
import VaultRepay from "../modal/repay/VaultRepay";
import VaultWithdrawBorrow from "../modal/withdrawBorrow/VaultWithdrawBorrow";
import VaultAdd from "../modal/add/VaultAdd";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import { MarketParams } from "@/types/marketParams";
import {
    type BaseError,
    useWriteContract,
    useReadContract,
    useAccount,
    useWaitForTransactionReceipt,
} from "wagmi";
import { MarketsAbi } from "@/app/abi/MarketsAbi";

interface ILoanMoreTable {
    availableMarkets: readonly `0x${string}`[];
}
const LoanMoreTable: React.FC<ILoanMoreTable> = ({ availableMarkets }) => {
    const { address } = useAccount();

    const addressStable: `0x${string}` =
        address !== undefined ? address : `0x0`;

    const positions = availableMarkets.map((market, index) => {
        const {
            data: positions,
            isError: issuesIsError,
            isSuccess,
            isPending,
            queryKey: issuesQueryKey,
            refetch: refetchProject,
        } = useReadContract({
            address: process.env.NEXT_PUBLIC_MARKETS as `0x${string}`,
            abi: MarketsAbi,
            functionName: "position",
            args: [market, addressStable],
        });

        if (positions !== undefined) {
            return positions;
        } else return undefined;
    });

    const loanDataFromPositions: LoanData[] = positions.map(
        (position, index) => {
            if (position === undefined)
                return {
                    token: "USDC",
                    amountCollateral: 3289.62,
                    amountLoan: 1234,
                    valueUSD: 1.96,
                    liquidationLTV: 90,
                    liquidationLTV2: 125,
                    borrowAPY: 14.1,
                };
            else {
                return {
                    token: "USDC",
                    amountCollateral: position[2] as unknown as number,
                    amountLoan: position[1] as unknown as number,
                    valueUSD: 1.96,
                    liquidationLTV: 90,
                    liquidationLTV2: 125,
                    borrowAPY: 14.1,
                };
            }
        }
    );

    const loansData: LoanData[] = [
        {
            token: "USDC",
            amountCollateral: 3289.62,
            amountLoan: 1234,
            valueUSD: 1.96,
            liquidationLTV: 90,
            liquidationLTV2: 125,
            borrowAPY: 14.1,
        },
        {
            token: "USDT",
            amountCollateral: 3289.62,
            amountLoan: 1234,
            valueUSD: 3.25,
            liquidationLTV: 85,
            liquidationLTV2: 125,
            borrowAPY: 12.3,
        },
    ];

    const marketParamsReal: MarketParams[] = availableMarkets.map(
        (market, index) => {
            const {
                data: marketParam,
                isPending,
                refetch: refetchProject,
                isSuccess,
            } = useReadContract({
                address: process.env.NEXT_PUBLIC_MARKETS as `0x${string}`,
                abi: MarketsAbi,
                functionName: "idToMarketParams",
                args: [market],
            });

            if (marketParam !== undefined) {
                return {
                    loanToken:
                        marketParam !== undefined ? marketParam[0] : `0x0`,
                    collateralToken:
                        marketParam !== undefined ? marketParam[1] : `0x0`,
                    oracle: marketParam !== undefined ? marketParam[2] : `0x0`,
                    irm: marketParam !== undefined ? marketParam[3] : `0x0`,
                    lltv:
                        marketParam !== undefined ? marketParam[4] : BigInt(0),
                };
            } else
                return {
                    loanToken: `0x123456`,
                    collateralToken: `0x123456`,
                    oracle: `0x123456`,
                    irm: `0x123456`,
                    lltv: BigInt(123),
                };
        }
    );

    const marketParams: MarketParams = {
        loanToken: `0x123456`,
        collateralToken: `0x123456`,
        oracle: `0x123456`,
        irm: `0x123456`,
        lltv: BigInt(123),
    };

    return (
        <div
            className="overflow-x-auto relative rounded-[15px] mb-16"
            style={{
                overflowX: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                position: "relative",
                overflow: "visible",
            }}
        >
            <table className="w-full text-sm text-left   border border-gray-800 ">
                <thead
                    className="bg-[#212121] h-20  text-xs "
                    style={{
                        boxShadow: "inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <tr className="rounded-t-lg">
                        <th
                            style={{ width: "500px" }}
                            className="rounded-tl-lg"
                        >
                            <TableHeaderCell
                                title="Collateral"
                                infoText="The token(s) that borrowers must lock in order to borrow funds."
                            />
                        </th>
                        <th style={{ width: "400px" }}>
                            <div className=" justify-start pr-8 ">
                                <TableHeaderCell title="Loan" infoText="" />
                            </div>
                        </th>
                        <th>
                            <div className="flex justify-start ">
                                <TableHeaderCell
                                    title="Liquidation LTV"
                                    infoText="The standard maximum proportion of loan value to collateral value that borrowers must maintain in order to avoid liquidation."
                                />
                            </div>
                        </th>
                        <th>
                            <div className="flex justify-start ">
                                <TableHeaderCell
                                    title="1D Borrow APY"
                                    infoText="The average annualized rate that borrowers paid over the trailing 24-hour period."
                                />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-transparent">
                    {loanDataFromPositions.map((item, index, arr) => (
                        <tr
                            key={index}
                            style={
                                index === arr.length - 1
                                    ? {
                                          borderBottomLeftRadius: "8px",
                                          borderBottomRightRadius: "8px",
                                      }
                                    : undefined
                            }
                            className={`last:border-b-0 text-[12px]  ${
                                index % 2 === 0
                                    ? "bg-transparent"
                                    : "dark:bg-[#191919]"
                            }`}
                        >
                            <td className=" py-4 px-6 items-center h-full gap-2">
                                <div className="flex gap-2 items-center">
                                    <div className="flex items-center">
                                        <div className="mr-2 w-6 h-6">
                                            <IconToken
                                                tokenName={item.token.toLocaleLowerCase()}
                                            ></IconToken>
                                        </div>
                                    </div>
                                    <span> &lt; </span>
                                    <FormatTokenMillion
                                        value={item.amountCollateral}
                                        token={item.token}
                                        totalValue={item.valueUSD}
                                    ></FormatTokenMillion>
                                    <div className="ml-8"></div>
                                    <ButtonDialog
                                        color="secondary"
                                        buttonText="Add"
                                    >
                                        {(closeModal) => (
                                            <>
                                                <div className=" w-full h-full">
                                                    <VaultAdd
                                                        title="Add Collateral"
                                                        token="USDC"
                                                        apy={14.1}
                                                        balance={473.18}
                                                        ltv="90% / 125%"
                                                        totalAdd={3289.62}
                                                        totalTokenAmount={1.96}
                                                        curator="Flowverse"
                                                        marketParams={
                                                            marketParamsReal[
                                                                index
                                                            ]
                                                        }
                                                        closeModal={closeModal}
                                                    ></VaultAdd>
                                                </div>
                                            </>
                                        )}
                                    </ButtonDialog>

                                    <ButtonDialog
                                        color="grey"
                                        buttonText="Withdraw"
                                    >
                                        {(closeModal) => (
                                            <>
                                                <div className=" w-full h-full">
                                                    <VaultWithdrawBorrow
                                                        title="Withdraw Collateral"
                                                        token="USDC"
                                                        apy={14.1}
                                                        balance={473.18}
                                                        ltv="90% / 125%"
                                                        totalWithdraw={3289.62}
                                                        totalTokenAmount={1.96}
                                                        curator="Flowverse"
                                                        closeModal={closeModal}
                                                    ></VaultWithdrawBorrow>
                                                </div>
                                            </>
                                        )}
                                    </ButtonDialog>
                                </div>
                            </td>

                            <td className=" py-4 px-6 items-center h-full gap-2">
                                <div className="flex gap-2 items-center">
                                    <IconToken
                                        className="w-6 h-6"
                                        tokenName={item.token.toLocaleLowerCase()}
                                    ></IconToken>
                                    <FormatTokenMillion
                                        value={item.amountLoan}
                                        token={item.token}
                                        totalValue={item.valueUSD}
                                    ></FormatTokenMillion>
                                    <div className="ml-8"></div>
                                    <ButtonDialog
                                        color="secondary"
                                        buttonText="Borrow More"
                                    >
                                        {(closeModal) => (
                                            <>
                                                <div className=" w-full h-full">
                                                    <VaultBorrow
                                                        title="USDMax"
                                                        token={item.token}
                                                        apy={14.1}
                                                        balanceToken={473.18}
                                                        balanceFlow={785.45}
                                                        ltv="90% / 125%"
                                                        totalDeposit={3289.62}
                                                        totalTokenAmount={1.96}
                                                        curator="Flowverse"
                                                        credora="AAA"
                                                        marketParams={
                                                            marketParamsReal[
                                                                index
                                                            ]
                                                        }
                                                        closeModal={closeModal}
                                                    ></VaultBorrow>{" "}
                                                </div>
                                            </>
                                        )}
                                    </ButtonDialog>

                                    <ButtonDialog
                                        color="grey"
                                        buttonText="Repay"
                                    >
                                        {(closeModal) => (
                                            <>
                                                <div className=" w-full h-full">
                                                    <VaultRepay
                                                        title="Repay"
                                                        token="USDC"
                                                        apy={14.1}
                                                        balance={473.18}
                                                        ltv="90% / 125%"
                                                        totalRepay={3289.62}
                                                        totalTokenAmount={1.96}
                                                        curator="Flowverse"
                                                        closeModal={closeModal}
                                                    ></VaultRepay>
                                                </div>
                                            </>
                                        )}
                                    </ButtonDialog>
                                </div>
                            </td>

                            <td className="py-4 pl-4 items-center h-full ">
                                <div className="flex gap-1 justify-start">
                                    <FormatTwoPourcentage
                                        value={item.liquidationLTV}
                                        value2={item.liquidationLTV2}
                                    ></FormatTwoPourcentage>
                                </div>
                            </td>
                            <td className="py-4 items-center h-full   ">
                                <div className="flex justify-start ml-3">
                                    <FormatPourcentage
                                        value={item.borrowAPY}
                                    ></FormatPourcentage>
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
