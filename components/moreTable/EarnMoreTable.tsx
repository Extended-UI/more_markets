"use client";

import { InvestmentData } from "@/types";
import React, { useState } from "react";
import Icon from "../FontAwesomeIcon";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import TableHeaderCell from "./MoreTableHeader";
import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDeposit from "../modal/deposit/VaultDeposit";
import TotalVolumeToken from "../token/TotalVolumeToken";
import IconToken from "../token/IconToken";
import ListIconToken from "../token/ListIconToken";
import { useRouter } from "next/navigation";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTokenMillion from "../tools/formatTokenMillion";
import { useReadContract } from "wagmi";
import { readContract } from "wagmi/actions";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { MarketParams } from "@/types/marketParams";
import { Markets } from "@/types/markets";
interface Props {
    availableVaults: readonly `0x${string}`[];
    inDetail?: boolean;
}

const EarnMoreTable: React.FC<Props> = ({
    availableVaults,
    inDetail = true,
}) => {
    const investments: InvestmentData[] | undefined = availableVaults?.map(
        (market) => {
            // 1. tokenSymbol ->
            // 2. netAPY ->
            // 3. totalDeposits ->
            // 4. totalValueUSD
            // 5. curator
            // 6. collateral ->
            // 7. unsecured ->
            // 8. unsecuredAPY ->
            // 9.  credoraRating -> get it from cedora

            // const { data: marketInfo } = useReadContract({
            //     address: process.env.MARKETS as EthereumAddress,
            //     abi: MarketsAbi,
            //     functionName: "market",
            //     args: [market],
            // });

            // const { data: marketParams } = useReadContract({
            //     address: process.env.MARKETS as EthereumAddress,
            //     abi: MarketsAbi,
            //     functionName: "idToMarketParams",
            //     args: [market],
            // });

            const mockData: InvestmentData = {
                tokenSymbol: market,
                netAPY: 12345,
                totalDeposits: 12345,
                totalValueUSD: 12345,
                curator: "MOCK",
                collateral: ["MOCK", "MOCK", "MOCK"],
                unsecured: 12345,
                unsecuredAPY: 12345,
                credoraRating: "MOCK",
            };
            return mockData;
        }
    );

    const [isStickyDisabled, setIsStickyDisabled] = useState(false);

    const router = useRouter();

    const goToDetail = (item: InvestmentData) => {
        router.push("/earn/" + item.tokenSymbol);
    };

    const toggleSticky = () => {
        setIsStickyDisabled(!isStickyDisabled);
    };
    return (
        <div
            className="overflow-x-auto rounded-[15px] mb-16"
            style={{
                overflowX: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                position: "relative",
                overflow: "visible",
            }}
        >
            <table className="w-full text-sm text-left border border-gray-800">
                <thead
                    className="bg-[#212121] h-20 text-xs"
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
                        <th style={{ width: "150px" }}>
                            <TableHeaderCell
                                title="Net APY"
                                infoText="The annualized return you earn on your deposited amount after all fees. This rate fluctuates in real-time based on supply and demand in the underlying markets."
                            />
                        </th>
                        <th style={{ width: "200px" }}>
                            <div className="flex justify-start">
                                <TableHeaderCell
                                    title="Total Deposits"
                                    infoText="The total amount of tokens that have already been deposited into the vault."
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
                        <th style={{ width: "200px" }}>
                            <div className="flex justify-start">
                                <TableHeaderCell
                                    title="Unsecured"
                                    infoText="The total amount of credit (above the standard LTV) issued by the all markets in the vault to premium, rated borrowers."
                                />
                            </div>
                        </th>
                        <th style={{ width: "200px" }}>
                            <div className="flex justify-start">
                                <TableHeaderCell
                                    title="Unsecured APY"
                                    infoText="The annualized rate you earn specifically from premium borrowers that have borrowed above the standard LTV."
                                />
                            </div>
                        </th>
                        <th style={{ width: "200px" }}>
                            <div className="flex justify-start">
                                <TableHeaderCell
                                    title="Credora Rating"
                                    infoText="The weighted average and minimum S&P equivalent rating, issued by Credora for all premium borrowers across all markets in a vault. The rating represents the aggregate solvency of premium borrowers based on their holdings outside of MORE Markets."
                                />
                            </div>
                        </th>
                        {inDetail && (
                            <th
                                style={{
                                    right: 0,
                                    backgroundColor: "#212121",
                                    position: isStickyDisabled
                                        ? "static"
                                        : "sticky",
                                    boxShadow:
                                        "inset 0 2px 0px 0px rgba(0, 0, 0, 0.2)",
                                }}
                            ></th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-transparent">
                    {investments?.map((item, index, arr) => (
                        <tr
                            key={index}
                            onClick={() => goToDetail(item)}
                            style={
                                index === arr.length - 1
                                    ? {
                                          borderBottomLeftRadius: "8px",
                                          borderBottomRightRadius: "8px",
                                      }
                                    : undefined
                            }
                            className={`last:border-b-0 text-[12px] border border-[#202020] cursor-pointer ${
                                index % 2 === 0
                                    ? "bg-[#141414]"
                                    : "bg-[#191919]"
                            }`}
                        >
                            <td className="py-4 px-6 items-center h-full">
                                <div className="flex items-center ">
                                    <div className="mr-2 w-6 h-6">
                                        <IconToken tokenName="usdc"></IconToken>
                                    </div>
                                    {item.tokenSymbol}
                                </div>
                            </td>
                            <td className="py-4 px-6 items-center h-full">
                                <div className="flex items-center ">
                                    <div className="mr-2 w-6 h-6">
                                        <IconToken tokenName="usdc"></IconToken>
                                    </div>
                                    {item.tokenSymbol}
                                </div>
                            </td>
                            <td className="py-4 px-6 items-center h-full  ">
                                <div className="flex gap-1 justify-start">
                                    <FormatPourcentage
                                        value={item.netAPY}
                                    ></FormatPourcentage>
                                </div>
                            </td>
                            <td className="py-4  items-center h-full ">
                                <FormatTokenMillion
                                    value={item.totalDeposits}
                                    token={item.tokenSymbol}
                                    totalValue={item.totalValueUSD}
                                ></FormatTokenMillion>
                            </td>
                            <td className="py-4 px-6 items-center h-full">
                                <div className="flex">
                                    <div className="mr-2 w-5 h-5">
                                        <IconToken tokenName="abt"></IconToken>
                                    </div>
                                    {item.curator}
                                </div>
                            </td>
                            <td className="py-4  items-center h-full">
                                <ListIconToken
                                    className="w-6 h-6"
                                    iconNames={item.collateral}
                                ></ListIconToken>
                            </td>
                            <td className="py-4 px-6 items-center   h-full ">
                                <FormatTokenMillion
                                    value={item.totalDeposits}
                                    token={item.tokenSymbol}
                                    totalValue={item.unsecured}
                                ></FormatTokenMillion>
                            </td>
                            <td className="py-4 px-6 items-center  h-full ">
                                <div className="flex gap-1 justify-start">
                                    <FormatPourcentage
                                        value={item.unsecuredAPY}
                                    ></FormatPourcentage>
                                </div>
                            </td>
                            <td className="py-4  items-center h-full ">
                                <div className="py-4 flex justify-start">
                                    {item.credoraRating}
                                </div>
                            </td>
                            {inDetail && (
                                <td
                                    className={`py-4 px-6 items-center justify-end h-full ${
                                        isStickyDisabled ? "" : "sticky"
                                    }`}
                                    style={{
                                        right: 0,
                                        backgroundColor:
                                            index % 2 === 0
                                                ? "#141414"
                                                : "#191919",
                                    }}
                                >
                                    <div
                                        className=""
                                        onClick={(event) =>
                                            event.stopPropagation()
                                        }
                                    >
                                        <ButtonDialog
                                            color="primary"
                                            buttonText="Deposit"
                                            onButtonClick={toggleSticky}
                                        >
                                            {(closeModal) => (
                                                <>
                                                    <div className="h-full w-full">
                                                        <VaultDeposit
                                                            title="USDMax Vault"
                                                            token="USDC"
                                                            apy={14.1}
                                                            balance={473.18}
                                                            ltv="90% / 125%"
                                                            totalDeposit={
                                                                3289.62
                                                            }
                                                            totalTokenAmount={
                                                                1.96
                                                            }
                                                            curator="Flowverse"
                                                            closeModal={
                                                                closeModal
                                                            }
                                                        ></VaultDeposit>
                                                    </div>
                                                </>
                                            )}
                                        </ButtonDialog>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default EarnMoreTable;
