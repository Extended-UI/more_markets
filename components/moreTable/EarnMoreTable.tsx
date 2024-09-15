"use client";

import _ from "lodash";
import { formatUnits, ZeroAddress } from "ethers";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import TableHeaderCell from "./MoreTableHeader";
import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDeposit from "../modal/deposit/VaultDeposit";
import IconToken from "../token/IconToken";
import ListIconToken from "../token/ListIconToken";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTokenMillion from "../tools/formatTokenMillion";
import { GraphMarket, GraphVault, InvestmentData } from "@/types";
import { tokens, curators } from "@/utils/const";
import { getTokenBallance } from "@/utils/contract";

interface Props {
  vaultsArr: GraphVault[];
  marketsArr: GraphMarket[];
}

const EarnMoreTable: React.FC<Props> = ({ vaultsArr, marketsArr }) => {
  const [isPending, setIsPending] = useState(true);
  const [vaults, setVaults] = useState<InvestmentData[]>([]);

  const router = useRouter();
  const { address: userAddress } = useAccount();

  useEffect(() => {
    const initVaults = async () => {
      setIsPending(true);

      if (marketsArr && vaultsArr) {
        const promises = vaultsArr.map(async (vault) => {
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
              formatUnits(vault.lastTotalAssets, tokenBalance.decimals)
            ),
            totalValueUSD: 0,
            curator:
              vault.curator && vault.curator.id != ZeroAddress
                ? curators[vault.curator.id]
                : "",
            collateral: _.uniq(activeCollaterals),
            unsecured: 0,
            tokenBalance,
            guardian: vault.guardian ? vault.guardian.id : "",
            // market: marketInfo,
          } as InvestmentData;
        });

        const fetchedVaults = await Promise.all(promises);
        setVaults(fetchedVaults);
      }

      setIsPending(false);
    };

    initVaults();
  }, [userAddress, vaultsArr, marketsArr]);

  const goToDetail = (item: InvestmentData) => {
    router.push("/earn/" + item.vaultId);
  };

  return (
    <>
      {isPending ? (
        <div> ...isLoading</div>
      ) : (
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
                <th style={{ width: "200px" }} className="rounded-tl-lg">
                  <TableHeaderCell title="Vault Name" infoText="" />
                </th>
                <th style={{ width: "200px" }} className="rounded-tl-lg">
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
                {/* <th style={{ width: "200px" }}>
                  <div className="flex justify-start">
                    <TableHeaderCell
                      title="Unsecured"
                      infoText="The total amount of credit (above the standard LTV) issued by the all markets in the vault to premium, rated borrowers."
                    />
                  </div>
                </th> */}
                {userAddress && (
                  <th
                    style={{
                      right: 0,
                      backgroundColor: "#212121",
                      position: "static",
                      boxShadow: "inset 0 2px 0px 0px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                )}
              </tr>
            </thead>
            <tbody className="bg-transparent">
              {vaults?.map((item, index, arr) => (
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
                    index % 2 === 0 ? "bg-[#141414]" : "bg-[#191919]"
                  }`}
                >
                  <td className="py-4 px-6 items-center h-full">
                    <div className="flex items-center ">
                      <div className="mr-2 w-6 h-6">
                        <IconToken tokenName={item.tokenSymbol} />
                      </div>
                      {item.vaultName}
                    </div>
                  </td>
                  <td className="py-4 px-6 items-center h-full">
                    <div className="flex items-center ">
                      <div className="mr-2 w-6 h-6">
                        <IconToken tokenName={item.tokenSymbol} />
                      </div>
                      {item.tokenSymbol}
                    </div>
                  </td>
                  <td className="py-4 px-6 items-center h-full  ">
                    <div className="flex gap-1 justify-start">
                      <FormatPourcentage value="N/A" />
                    </div>
                  </td>
                  <td className="py-4 items-left h-full ">
                    <FormatTokenMillion
                      align={true}
                      value={item.totalDeposits}
                      token={item.tokenSymbol}
                      totalValue={item.totalValueUSD}
                    />
                  </td>
                  <td className="py-4 px-6 items-center h-full">
                    <div className="flex">
                      <div className="mr-2 w-5 h-5">
                        <IconToken tokenName="wflow" />
                      </div>
                      {item.curator}
                    </div>
                  </td>
                  <td className="py-4  items-center h-full">
                    <ListIconToken
                      className="w-6 h-6"
                      iconNames={item.collateral}
                    />
                  </td>
                  {/* <td className="py-4 px-6 items-center   h-full ">
                    <FormatTokenMillion
                      value={item.totalDeposits}
                      token={item.tokenSymbol}
                      totalValue={item.unsecured}
                    />
                  </td> */}
                  {userAddress && (
                    <td
                      className="py-4 px-6 items-center justify-end h-full"
                      style={{
                        right: 0,
                        backgroundColor:
                          index % 2 === 0 ? "#141414" : "#191919",
                      }}
                    >
                      <div onClick={(event) => event.stopPropagation()}>
                        <ButtonDialog color="primary" buttonText="Deposit">
                          {(closeModal) => (
                            <div className="h-full w-full">
                              <VaultDeposit
                                item={item}
                                closeModal={closeModal}
                              />
                            </div>
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
      )}
    </>
  );
};

export default EarnMoreTable;
