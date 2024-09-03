"use client";

import { InvestmentData } from "@/types";
import React from "react";
import Icon from "../FontAwesomeIcon";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import TableHeaderCell from "./MoreTableHeader";
import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDeposit from "../modal/deposit/VaultDeposit";
import TotalVolumeToken from "../token/TotalVolumeToken";
import IconToken from "../token/IconToken";
import ListIconToken from "../token/ListIconToken";
import { useRouter } from "next/navigation";
import { DetailEarnData } from "@/types/detailEarnData";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import FormatTokenMillion from "../tools/formatTokenMillion";
import FormatTwoPourcentage from "../tools/formatTwoPourcentage";
import FormatPourcentage from "../tools/formatPourcentage";
import { MarketParams } from "@/types/marketParams";

interface Props {}

const PositionMoreTable: React.FC<Props> = () => {
    const tableData: DetailEarnData[] = [
        {
            allocation: 16.8,
            supplyAmount: 3288.62,
            supplyCurrency: "USDC",
            supplyValue: 1.96,
            collateral: ["usdc", "btc", "add", "ada"],
            liquidationLTV: 90,
            liquidationLTV2: 130,
            credoraRating: "CCC+ / BBB",
            unsecuredBorrowAmount: 7890.12,
            unsecuredBorrowValue: 4.98,
            unsecuredAPY: 16.8,
        },
    ];

    const marketParams: MarketParams = {
        loanToken: `0x0`,
        collateralToken: `0x0`,
        oracle: `0x0`,
        irm: `0x0`,
        lltv: BigInt(0),
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
            <h1 className="text-2xl mt-16 mb-8">Open a position</h1>
            <table className="w-full text-sm text-left   border border-gray-800 ">
                <thead
                    className="bg-[#212121] h-20  text-xs "
                    style={{
                        boxShadow: "inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <tr className="rounded-t-lg">
                        <th
                            style={{ width: "200px" }}
                            className="rounded-tl-lg"
                        >
                            <TableHeaderCell
                                title="Collateral"
                                infoText="The token(s) that borrowers must lock in order to borrow funds."
                            />
                        </th>
                        <th style={{ width: "200px" }}>
                            <div className="flex justify-start">
                                <TableHeaderCell title="Loan" infoText="" />
                            </div>
                        </th>
                        <th style={{ width: "200px" }}>
                            {" "}
                            <div className="flex justify-start">
                                <TableHeaderCell
                                    title="Liquidation LTV"
                                    infoText="The standard maximum proportion of loan value to collateral value that borrowers must maintain in order to avoid liquidation."
                                />{" "}
                            </div>
                        </th>
                        <th style={{ width: "200px" }}>
                            {" "}
                            <div className="flex justify-start">
                                <TableHeaderCell
                                    title="1D Interest"
                                    infoText=""
                                />{" "}
                            </div>
                        </th>
                        <th style={{ width: "200px" }}>
                            <div className="flex justify-start">
                                <TableHeaderCell
                                    title="Vault Listing"
                                    infoText=""
                                />
                            </div>
                        </th>
                        <th style={{ width: "100px" }}></th>
                    </tr>
                </thead>
                <tbody className="bg-transparent ">
                    {tableData.map((item, index, arr) => (
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
                            className={`last:border-b-0 text-[12px]  cursor-pointer ${
                                index % 2 === 0
                                    ? "bg-transparent"
                                    : "dark:bg-[#191919]"
                            }`}
                        >
                            <td className="py-4  items-center h-full ">
                                <div className="flex gap-1 justify-start items-center gap-2 pl-4">
                                    <div className="mr-2 w-8 h-8">
                                        <IconToken tokenName="usdt"></IconToken>
                                    </div>
                                    <FormatTokenMillion
                                        value={item.supplyAmount}
                                        totalValue={item.supplyValue}
                                        token={item.supplyCurrency}
                                    ></FormatTokenMillion>
                                </div>
                            </td>

                            <td className="py-4  items-center h-full ">
                                <div className="flex gap-1 justify-start items-center gap-2">
                                    <div className="mr-2 w-8 h-8">
                                        <IconToken tokenName="usdt"></IconToken>
                                    </div>
                                    <FormatTokenMillion
                                        value={item.supplyAmount}
                                        totalValue={item.supplyValue}
                                        token={item.supplyCurrency}
                                        totalDanger={true}
                                    ></FormatTokenMillion>
                                </div>
                            </td>

                            <td className="py-4 px-6 items-center flex  ">
                                <div className=" flex justify-start w-full py-4 ">
                                    <FormatTwoPourcentage
                                        value={item.liquidationLTV}
                                        value2={item.liquidationLTV2}
                                    ></FormatTwoPourcentage>
                                </div>
                            </td>

                            <td className="py-4 px-6  items-center justify-start h-full ">
                                <div className="flex gap-1 justify-start">
                                    {" "}
                                    <FormatPourcentage
                                        value={item.unsecuredAPY}
                                    ></FormatPourcentage>{" "}
                                </div>
                            </td>

                            <td className="py-4 px-6  items-center  h-full flex justify-start">
                                <div className="mr-2 w-8 h-8 py-2">
                                    <IconToken tokenName="usdt"></IconToken>
                                </div>
                            </td>

                            <td className="py-4 px-6  items-center justify-end h-full">
                                <div
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    <ButtonDialog
                                        color="secondary"
                                        buttonText="Borrow"
                                    >
                                        {(closeModal) => (
                                            <>
                                                <div className=" w-full h-full">
                                                    <VaultBorrow
                                                        title="USDMax"
                                                        token={
                                                            item.supplyCurrency
                                                        }
                                                        apy={14.1}
                                                        balanceToken={473.18}
                                                        balanceFlow={785.45}
                                                        ltv="90% / 125%"
                                                        totalDeposit={3289.62}
                                                        totalTokenAmount={1.96}
                                                        curator="Flowverse"
                                                        credora="AAA"
                                                        marketParams={
                                                            marketParams
                                                        }
                                                        closeModal={closeModal}
                                                    ></VaultBorrow>
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
export default PositionMoreTable;
