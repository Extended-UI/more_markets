"use client";

import _ from "lodash";
import { formatUnits, ZeroAddress } from "ethers";
import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import TableHeaderCell from "./MoreTableHeader";
import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDeposit from "../modal/deposit/VaultDeposit";
import IconToken from "../token/IconToken";
import ListIconToken from "../token/ListIconToken";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTokenMillion from "../tools/formatTokenMillion";
import VaultWithdraw from "../modal/withdraw/VaultWithdraw";
import { tokens, curators } from "@/utils/const";
import { getTokenBallance, getVaultDetail } from "@/utils/contract";
import { GraphMarket, GraphVault, InvestmentData } from "@/types";

interface Props {
  vaultsArr: GraphVault[];
  marketsArr: GraphMarket[];
}

const DepositMoreTable: React.FC<Props> = ({ vaultsArr, marketsArr }) => {
  const { address: userAddress } = useAccount();

  const [vaults, setVaults] = useState<InvestmentData[]>([]);

  useEffect(() => {
    const initVaults = async () => {
      if (marketsArr && vaultsArr && userAddress) {
        const promises = vaultsArr.map(async (vault) => {
          // check vault balance
          const vaultShares = await getTokenBallance(vault.id, userAddress);

          if (vaultShares.value > 0) {
            const userAssets = await getVaultDetail(
              vault.id as `0x${string}`,
              "convertToAssets",
              [vaultShares.value]
            );

            // get collaterals
            const collaterals: string[] = vault.supplyQueue.map((queue) => {
              const marketItem = marketsArr.find(
                (market) =>
                  market.id.toLowerCase() == queue.market.id.toLowerCase()
              );
              return marketItem ? tokens[marketItem.inputToken.id] : "";
            });
            const activeCollaterals = collaterals.filter(
              (item) => item.length > 0
            );

            // tokenBalance
            const tokenBalance = await getTokenBallance(
              vault.asset.id,
              userAddress
            );

            return {
              vaultId: vault.id,
              vaultName: vault.name,
              assetAddress: vault.asset.id,
              tokenSymbol: tokens[vault.asset.id],
              netAPY: 0,
              totalDeposits: Number(
                formatUnits(
                  (userAssets as bigint).toString(),
                  tokenBalance.decimals
                )
              ),
              totalValueUSD: 0,
              curator:
                vault.curator && vault.curator.id != ZeroAddress
                  ? curators[vault.curator.id]
                  : "",
              collateral: _.uniq(activeCollaterals),
              unsecured: 0,
              tokenBalance,
              // market: marketInfo,
            } as InvestmentData;
          }
        });

        const fetchedVaults = (await Promise.all(promises)).filter(
          (item) => item !== undefined
        );
        setVaults(fetchedVaults);
      }
    };

    initVaults();
  }, [userAddress, vaultsArr, marketsArr]);

  return (
    <>
      {vaults.length > 0 && (
        <>
          <h1 className="text-4xl mb-8">My Deposits</h1>
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
                    <TableHeaderCell title="Vault Name" infoText="" />
                  </th>
                  <th style={{ width: "200px" }} className="rounded-tl-lg">
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
                      <TableHeaderCell title="My Deposit" infoText="" />
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
                      position: "static",
                      right: 0,
                      backgroundColor: "#212121",
                    }}
                  />
                </tr>
              </thead>
              <tbody className="bg-transparent">
                {vaults.map((item, index, arr) => (
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
                      index % 2 === 0 ? "bg-transparent" : "dark:bg-[#191919]"
                    }`}
                  >
                    <td className="py-4 px-6 items-start h-full">
                      <div className="flex items-start">
                        <div className="mr-2 w-6 h-6">
                          <IconToken tokenName={item.tokenSymbol} />
                        </div>
                        {item.tokenSymbol}
                      </div>
                    </td>
                    <td className="py-4 px-6 items-start h-full">
                      <div className="flex items-start">
                        <div className="mr-2 w-6 h-6">
                          <IconToken tokenName={item.tokenSymbol} />
                        </div>
                        {item.tokenSymbol}
                      </div>
                    </td>
                    <td className="py-4 px-6 items-start h-full   ">
                      <div className="flex justify-start">
                        <FormatPourcentage
                          value={item.netAPY}
                        ></FormatPourcentage>
                      </div>
                    </td>
                    <td className=" items-start   h-full ">
                      <div className="flex justify-start">
                        <FormatTokenMillion
                          value={item.totalDeposits}
                          token={item.tokenSymbol}
                          totalValue={item.totalValueUSD}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 items-start h-full  ">
                      <div className="flex items-start">
                        <div className="mr-2 w-6 h-6">
                          <IconToken tokenName={item.tokenSymbol} />
                        </div>
                        {item.curator}
                      </div>
                    </td>
                    <td className="py-4  items-start h-full">
                      <ListIconToken
                        className="w-6 h-6"
                        iconNames={item.collateral}
                      />
                    </td>
                    <td
                      className="py-4 px-6 flex gap-2 items-center justify-end h-full"
                      style={{
                        right: 0,
                        backgroundColor:
                          index % 2 === 0 ? "#141414" : "#191919",
                      }}
                    >
                      <ButtonDialog color="primary" buttonText="Deposit More">
                        {(closeModal) => (
                          <div className=" w-full h-full">
                            <VaultDeposit item={item} closeModal={closeModal} />
                          </div>
                        )}
                      </ButtonDialog>

                      <ButtonDialog color="grey" buttonText="Withdraw">
                        {(closeModal) => (
                          <div className=" w-full h-full">
                            <VaultWithdraw
                              item={item}
                              closeModal={closeModal}
                            />
                          </div>
                        )}
                      </ButtonDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};
export default DepositMoreTable;
