"use client";

import React, { useState, useEffect } from "react";
import { useReadContract, useAccount } from "wagmi";
import { readContracts, readContract } from "@wagmi/core";
import TableHeaderCell from "./MoreTableHeader";
import ButtonDialog from "../buttonDialog/buttonDialog";
import IconToken from "../token/IconToken";
import { LoanData } from "@/types/loandData";
import FormatTokenMillion from "../tools/formatTokenMillion";
import FormatTwoPourcentage from "../tools/formatTwoPourcentage";
import FormatPourcentage from "../tools/formatPourcentage";
import VaultRepay from "../modal/repay/VaultRepay";
import VaultWithdrawBorrow from "../modal/withdrawBorrow/VaultWithdrawBorrow";
import VaultAdd from "../modal/add/VaultAdd";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import { MarketParams } from "@/types/marketParams";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { config } from "@/utils/wagmi";
import { contracts } from "@/utils/const";
import { VaultsFactoryAbi } from "@/app/abi/VaultsFactoryAbi";

const morphoContract = {
  address: contracts.MORE_MARKETS as `0x${string}`,
  abi: MarketsAbi,
};

const LoanMoreTable: React.FC = () => {
  const account = useAccount();
  const [positions, setPositions] = useState<LoanData[]>([]);

  const { address: userAddress } = account;

  const { data: arrayOfVaults } = useReadContract({
    address: contracts.MORE_VAULTS_FACTORY as `0x${string}`,
    abi: VaultsFactoryAbi,
    functionName: "arrayOfVaults",
  });

  const { data: arrayOfMarkets, isPending } = useReadContract({
    ...morphoContract,
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
            <th style={{ width: "500px" }} className="rounded-tl-lg">
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
          {positions.map((item, index, arr) => (
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
                index % 2 === 0 ? "bg-transparent" : "dark:bg-[#191919]"
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
                    item={item.market}
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
                            closeModal={closeModal}
                            marketParams={item.market?.params}
                          ></VaultAdd>
                        </div>
                      </>
                    )}
                  </ButtonDialog>

                  <ButtonDialog
                    color="grey"
                    buttonText="Withdraw"
                    item={item.market}
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
                    item={item.market}
                  >
                    {(closeModal) => (
                      <>
                        <div className=" w-full h-full">
                          {/* <VaultBorrow
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
                            marketParams={item.market?.params}
                            closeModal={closeModal}
                          /> */}
                        </div>
                      </>
                    )}
                  </ButtonDialog>

                  <ButtonDialog
                    color="grey"
                    buttonText="Repay"
                    item={item.market}
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
                  <FormatPourcentage value={item.borrowAPY}></FormatPourcentage>
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
