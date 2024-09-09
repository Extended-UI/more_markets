"use client";

import { useReadContract, useAccount } from "wagmi";
import {
  readContracts,
  readContract,
  getBalance,
  type GetBalanceReturnType,
} from "@wagmi/core";
import React, { useEffect, useState } from "react";
import TableHeaderCell from "./MoreTableHeader";
import { useRouter } from "next/navigation";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { VaultsAbi } from "@/app/abi/VaultsAbi";
import { MorphoAbi } from "@/app/abi/MorphoAbi";
import { VaultsFactoryAbi } from "@/app/abi/VaultsFactoryAbi";
import { contracts, curators, tokens } from "@/utils/const";
import { config } from "@/utils/wagmi";
import { InvestmentData, Market, BorrowData } from "@/types";
import { getVaule, getVauleNum } from "@/utils/utils";
import BorrowMoreTableRow from "./BorrowMoreTableRow";

const morphoContract = {
  address: contracts.MORE_MARKETS as `0x${string}`,
  abi: MorphoAbi,
};

const BorrowMoreTable: React.FC = () => {
  const router = useRouter();
  const account = useAccount();
  const [borrows, setBorrows] = useState<BorrowData[]>([]);

  const { address: userAddress } = account;

  const { data: arrayOfVaults } = useReadContract({
    address: contracts.MORE_VAULTS_FACTORY as `0x${string}`,
    abi: VaultsFactoryAbi,
    functionName: "arrayOfMorphos",
  });

  const { data: arrayOfMarkets, isPending } = useReadContract({
    address: contracts.MORE_MARKETS as `0x${string}`,
    abi: MorphoAbi,
    functionName: "arrayOfMarkets",
  });

  useEffect(() => {
    const initVaults = async () => {
      const marketArr = arrayOfMarkets as `0x${string}`[];
      const positionQuest = marketArr.map((marketId) => {
        return {
          ...morphoContract,
          functionName: "position",
          args: [marketId, userAddress],
        };
      });
      const positions = await readContracts(config, {
        contracts: positionQuest,
      });

      // setBorrows(promises.length == 0 ? [] : await Promise.all(promises));
    };

    initVaults();
  }, [arrayOfMarkets]);

  const goToDetail = (item: BorrowData) => {
    router.push("/borrow/" + item.collateralToken);
  };

  return (
    <>
      {isPending ? (
        <div> ...isLoading</div>
      ) : (
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
                <th style={{ width: "200px" }} className="rounded-tl-lg">
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
                    boxShadow: "inset 0 2px 0px 0px rgba(0, 0, 0, 0.2)",
                  }}
                ></th>
              </tr>
            </thead>
            <tbody className="bg-transparent">
              {borrows?.map((item, index, arr) => (
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
                    index % 2 === 0 ? "bg-transparent" : "dark:bg-[#191919]"
                  }`}
                >
                  <BorrowMoreTableRow market={item.marketId} index={index} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default BorrowMoreTable;
