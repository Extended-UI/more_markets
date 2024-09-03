"use client";

import { InvestmentData } from "@/types";
import React, { useEffect, useState } from "react";
import Icon from "../FontAwesomeIcon";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import TableHeaderCell from "./MoreTableHeader";
import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDeposit from "../modal/deposit/VaultDeposit";
import TotalVolumeToken from "../token/TotalVolumeToken";
import { BorrowData } from "@/types/borrowData";
import IconToken from "../token/IconToken";
import TokenName from "../token/TokenName";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import { useRouter } from "next/navigation";
import FormatTwoPourcentage from "../tools/formatTwoPourcentage";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTokenMillion from "../tools/formatTokenMillion";
import { type BaseError, useReadContract, useBlockNumber } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { MarketParams } from "@/types/marketParams";
import { Markets } from "@/types/markets";
import BorrowMoreTableRow from "./BorrowMoreTableRow";
interface IBorrowMoreTable {
    availableMarkets: readonly `0x${string}`[];
}

const BorrowMoreTable: React.FC<IBorrowMoreTable> = ({ availableMarkets }) => {
    const router = useRouter();
    const [isStickyDisabled, setIsStickyDisabled] = useState(false);
    const toggleSticky = () => {
        console.log(isStickyDisabled);

        setIsStickyDisabled(!isStickyDisabled);
        console.log(isStickyDisabled);
    };
    useEffect(() => {
        console.log(isStickyDisabled); // This will log the updated state
    }, [isStickyDisabled]);

    const goToDetail = (item: BorrowData) => {
        router.push("/borrow/" + item.collateralToken);
    };

    // console.log(arrayOfMarkets);

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
                            <TableHeaderCell
                                title="Collateral Token"
                                infoText="The token(s) that borrowers must lock in order to borrow funds in the given market."
                            />
                        </th>
                        <th style={{ width: "200px" }}>
                            <TableHeaderCell
                                title="Loan Token"
                                infoText="The token(s) issued to borrowers as a loan against their collateral in the given market."
                            />
                        </th>
                        <th style={{ width: "200px" }}>
                            <div className="flex justify-start ">
                                <TableHeaderCell
                                    title="Liquidation  LTV"
                                    infoText="The standard maximum proportion of loan value to collateral value that borrowers must maintain in order to avoid liquidation."
                                />
                            </div>
                        </th>
                        <th style={{ width: "200px" }}>
                            <TableHeaderCell
                                title="1D Borrow APY"
                                infoText="The average annualized rate that borrowers paid over the trailing 24-hour period."
                            />
                        </th>
                        <th style={{ width: "300px" }}>
                            <TableHeaderCell
                                title="Utilization"
                                infoText="The percentage of total deposits that are currently being lent to all borrowers in the given market."
                            />
                        </th>
                        <th style={{ width: "300px" }}>
                            <div className="flex justify-start">
                                <TableHeaderCell
                                    title="Total Deposits"
                                    infoText="The total amount of tokens that have been deposited into the vault and made available to borrowers for loans."
                                />
                            </div>
                        </th>
                        <th
                            style={{
                                position: "sticky",
                                right: 0,
                                backgroundColor: "#212121",
                                boxShadow:
                                    "inset 0 2px 0px 0px rgba(0, 0, 0, 0.2)",
                            }}
                        ></th>
                    </tr>
                </thead>
                <tbody className="bg-transparent">
                    {availableMarkets?.map((item, index, arr) => (
                        <tr
                            key={index}
                            // onClick={() => goToDetail(item)}
                            style={
                                index === arr.length - 1
                                    ? {
                                          borderBottomLeftRadius: "8px",
                                          borderBottomRightRadius: "8px",
                                      }
                                    : undefined
                            }
                            className={`last:border-b-0 text-[12px] cursor-pointer  ${
                                index % 2 === 0
                                    ? "bg-transparent"
                                    : "dark:bg-[#191919]"
                            }`}
                        >
                            <BorrowMoreTableRow
                                market={item}
                                index={index}
                            ></BorrowMoreTableRow>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default BorrowMoreTable;
