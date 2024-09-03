"use client";

import React, { useState } from "react";
import TableHeaderCell from "./MoreTableHeader";
import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDeposit from "../modal/deposit/VaultDeposit";
import IconToken from "../token/IconToken";
import { DepositData } from "@/types/depositData";
import ListIconToken from "../token/ListIconToken";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTokenMillion from "../tools/formatTokenMillion";
import VaultWithdraw from "../modal/withdraw/VaultWithdraw";

const DepositMoreTable: React.FC<{}> = () => {
    const depositData: DepositData[] = [
        {
            tokenName: "USDC",
            apy: 14.1,
            curator: "Flowverse",
            depositAmount: 3289.62,
            depositValueUSD: 1.96,
            collaterals: ["usdc", "ada", "add", "aave"],
        },
        {
            tokenName: "USDT",
            apy: 12.3,
            curator: "Metaverse",
            depositAmount: 5432.1,
            depositValueUSD: 3.25,
            collaterals: ["ada", "add", "aave"],
        },
    ];

    const [isStickyDisabled, setIsStickyDisabled] = useState(false);

    const toggleSticky = () => {
        setIsStickyDisabled(!isStickyDisabled);
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
                            style={{ width: "200px" }}
                            className="rounded-tl-lg"
                        >
                            <TableHeaderCell title="Vault Name" infoText="" />
                        </th>
                        <th
                            style={{ width: "200px" }}
                            className="rounded-tl-lg"
                        >
                            <TableHeaderCell
                                title="Deposit Token"
                                infoText="The token(s) eligible for deposit into the vault and which are lent to borrowers in order to generate yield."
                            />
                        </th>
                        <th style={{ width: "200px" }}>
                            <TableHeaderCell
                                title="Net APY"
                                infoText="The annualized return you earn on your deposited amount after all fees. This rate fluctuates in real-time based on supply and demand in the underlying markets."
                            />
                        </th>
                        <th style={{ width: "300px" }}>
                            <div className="flex justify-start ">
                                <TableHeaderCell
                                    title="My Deposit"
                                    infoText=""
                                />
                            </div>
                        </th>
                        <th style={{ width: "200px" }}>
                            <TableHeaderCell
                                title="Curator"
                                infoText="The organization that manages the vault parameters such as included markets, allocations, caps and performance fees."
                            />
                        </th>
                        <th style={{ width: "200px" }}>
                            <TableHeaderCell
                                title="Collateral"
                                infoText="The token(s) that borrowers must lock in order to borrow funds."
                            />
                        </th>
                        <th
                            style={{
                                position: isStickyDisabled
                                    ? "static"
                                    : "sticky",
                                right: 0,
                                backgroundColor: "#212121",
                            }}
                        ></th>
                    </tr>
                </thead>
                <tbody className="bg-transparent">
                    {depositData.map((item, index, arr) => (
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
                            className={`last:border-b-0 text-[12px]  cursor-pointer  ${
                                index % 2 === 0
                                    ? "bg-transparent"
                                    : "dark:bg-[#191919]"
                            }`}
                        >
                            <td className="py-4 px-6 items-start h-full">
                                <div className="flex items-start">
                                    <div className="mr-2 w-6 h-6">
                                        <IconToken
                                            tokenName={item.tokenName.toLocaleLowerCase()}
                                        ></IconToken>
                                    </div>
                                    {item.tokenName}
                                </div>
                            </td>
                            <td className="py-4 px-6 items-start h-full">
                                <div className="flex items-start">
                                    <div className="mr-2 w-6 h-6">
                                        <IconToken
                                            tokenName={item.tokenName.toLocaleLowerCase()}
                                        ></IconToken>
                                    </div>
                                    {item.tokenName}
                                </div>
                            </td>
                            <td className="py-4 px-6 items-start h-full   ">
                                <div className="flex justify-start">
                                    <FormatPourcentage
                                        value={item.apy}
                                    ></FormatPourcentage>
                                </div>
                            </td>
                            <td className=" items-start   h-full ">
                                <div className="flex justify-start">
                                    <FormatTokenMillion
                                        value={item.depositAmount}
                                        token={item.tokenName}
                                        totalValue={item.depositValueUSD}
                                    ></FormatTokenMillion>
                                </div>
                            </td>
                            <td className="py-4 px-6 items-start h-full  ">
                                <div className="flex items-start">
                                    <div className="mr-2 w-6 h-6">
                                        <IconToken tokenName="abt"></IconToken>
                                    </div>
                                    {item.curator}
                                </div>
                            </td>
                            <td className="py-4  items-start h-full">
                                <ListIconToken
                                    className="w-6 h-6"
                                    iconNames={item.collaterals}
                                ></ListIconToken>
                            </td>
                            <td
                                className={`py-4 px-6 flex gap-2 items-center justify-end h-full ${
                                    isStickyDisabled ? "" : "sticky"
                                }`}
                                style={{
                                    right: 0,
                                    backgroundColor:
                                        index % 2 === 0 ? "#141414" : "#191919",
                                }}
                            >
                                <ButtonDialog
                                    color="primary"
                                    buttonText="Deposit More"
                                    onButtonClick={toggleSticky}
                                >
                                    {(closeModal) => (
                                        <>
                                            <div className=" w-full h-full">
                                                <VaultDeposit
                                                    title="USDMax Vault"
                                                    token="USDC"
                                                    apy={14.1}
                                                    balance={473.18}
                                                    ltv="90% / 125%"
                                                    totalDeposit={3289.62}
                                                    totalTokenAmount={1.96}
                                                    curator="Flowverse"
                                                    closeModal={closeModal}
                                                ></VaultDeposit>
                                            </div>
                                        </>
                                    )}
                                </ButtonDialog>

                                <ButtonDialog
                                    color="grey"
                                    buttonText="Withdraw"
                                    onButtonClick={toggleSticky}
                                >
                                    {(closeModal) => (
                                        <>
                                            <div className=" w-full h-full">
                                                <VaultWithdraw
                                                    title="USDMax Vault"
                                                    token="USDC"
                                                    apy={14.1}
                                                    balance={473.18}
                                                    ltv="90% / 125%"
                                                    totalWithdraw={3289.62}
                                                    totalTokenAmount={1.96}
                                                    curator="Flowverse"
                                                    closeModal={closeModal}
                                                ></VaultWithdraw>
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
