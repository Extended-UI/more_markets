"use client";

import { ZeroAddress, formatUnits } from "ethers";
import React, { useEffect, useState } from "react";
import { readContracts, readContract, getBalance } from "@wagmi/core";
import { useReadContract, useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import TableHeaderCell from "./MoreTableHeader";
import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDeposit from "../modal/deposit/VaultDeposit";
import IconToken from "../token/IconToken";
import ListIconToken from "../token/ListIconToken";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTokenMillion from "../tools/formatTokenMillion";
import { config } from "@/utils/wagmi";
import { InvestmentData, Market } from "@/types";
import { VaultsFactoryAbi } from "@/app/abi/VaultsFactoryAbi";
import { VaultsAbi } from "@/app/abi/VaultsAbi";
import {
  getVaule,
  getVauleNum,
  getVauleBigint,
  getVauleBoolean,
  getVauleString,
  getVauleBigintList,
} from "@/utils/utils";
import {
  contracts,
  curators,
  tokens,
  marketsInstance,
  initBalance,
} from "@/utils/const";

const EarnMoreTable: React.FC = () => {
  const router = useRouter();
  const account = useAccount();
  const [isStickyDisabled, setIsStickyDisabled] = useState(false);
  const [vaults, setVaults] = useState<InvestmentData[]>([]);

  const { address: userAddress } = account;

  const {
    data: arrayOfVaults,
    isSuccess,
    isPending,
    refetch: refetchProject,
  } = useReadContract({
    address: contracts.MORE_VAULTS_FACTORY as `0x${string}`,
    abi: VaultsFactoryAbi,
    functionName: "arrayOfVaults",
  });

  useEffect(() => {
    refetchProject?.();
  }, [isSuccess]);

  useEffect(() => {
    const initVaults = async () => {
      if (arrayOfVaults) {
      }
      const promises = arrayOfVaults
        ? (arrayOfVaults as `0x${string}`[]).map(
            async (vaultAddress: `0x${string}`) => {
              const vaultContract = {
                address: vaultAddress,
                abi: VaultsAbi,
              };
              const [name, curator, asset, supplyQueueLength] =
                await readContracts(config, {
                  contracts: [
                    {
                      ...vaultContract,
                      functionName: "name",
                    },
                    {
                      ...vaultContract,
                      functionName: "curator",
                    },
                    {
                      ...vaultContract,
                      functionName: "asset",
                    },
                    {
                      ...vaultContract,
                      functionName: "supplyQueueLength",
                    },
                  ],
                });

              const supplyQueueLen = getVauleNum(supplyQueueLength);

              // fetch supplyIds
              const marketId =
                supplyQueueLen > 0
                  ? await readContract(config, {
                      ...vaultContract,
                      functionName: "supplyQueue",
                      args: [0],
                    })
                  : "";

              let marketInfo = null;
              if (supplyQueueLen > 0 && (marketId as string).length > 0) {
                const [configs, params, infos] = await readContracts(config, {
                  contracts: [
                    {
                      ...vaultContract,
                      functionName: "config",
                      args: [marketId],
                    },
                    {
                      ...marketsInstance,
                      functionName: "idToMarketParams",
                      args: [marketId as `0x${string}`],
                    },
                    {
                      ...marketsInstance,
                      functionName: "market",
                      args: [marketId as `0x${string}`],
                    },
                  ],
                });

                marketInfo = {
                  config: {
                    cap: getVauleBigint(configs, 0),
                    enabled: getVauleBoolean(configs, 1),
                    removableAt: getVauleBigint(configs, 2),
                  },
                  params: {
                    isPremiumMarket: getVauleBoolean(params, 0),
                    loanToken: getVauleString(params, 1),
                    collateralToken: getVauleString(params, 2),
                    oracle: getVauleString(params, 3),
                    irm: getVauleString(params, 4),
                    lltv: getVauleBigint(params, 5),
                    creditAttestationService: getVauleString(params, 6),
                    irxMaxLltv: getVauleBigint(params, 7),
                    categoryLltv: getVauleBigintList(params, 8),
                  },
                  info: {
                    totalSupplyAssets: getVauleBigint(infos, 0),
                    totalSupplyShares: getVauleBigint(infos, 1),
                    totalBorrowAssets: getVauleBigint(infos, 2),
                    totalBorrowShares: getVauleBigint(infos, 3),
                    lastUpdate: getVauleBigint(infos, 4),
                    fee: getVauleBigint(infos, 5),
                    isPremiumFeeEnabled: getVauleBoolean(infos, 6),
                    premiumFee: getVauleBigint(infos, 7),
                  },
                } as Market;

                const assetAddress = getVaule(asset);
                const curatorAddress = getVaule(curator);
                const tokenBalance = userAddress
                  ? await getBalance(config, {
                      token: assetAddress as `0x${string}`,
                      address: userAddress,
                    })
                  : initBalance;

                return {
                  vaultName: getVaule(name),
                  tokenSymbol: tokens[assetAddress],
                  netAPY: 0,
                  totalDeposits: Number(
                    formatUnits(
                      marketInfo.info.totalSupplyAssets,
                      tokenBalance.decimals
                    )
                  ),
                  totalValueUSD: 0,
                  curator:
                    curatorAddress == ZeroAddress
                      ? "-"
                      : curators[curatorAddress],
                  collateral: [],
                  unsecured: 0,
                  tokenBalance,
                  supplyQueue: marketId as string,
                  market: marketInfo,
                };
              }
            }
          )
        : [];

      const vaultsArr = (await Promise.all(promises)).filter(
        (item) => item !== undefined
      );
      setVaults(vaultsArr);
    };

    initVaults();
  }, [arrayOfVaults, userAddress, isStickyDisabled]);

  const goToDetail = (item: InvestmentData) => {
    router.push("/earn/" + item.tokenSymbol);
  };

  const toggleSticky = () => {
    setIsStickyDisabled(!isStickyDisabled);
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
                <th style={{ width: "200px" }}>
                  <div className="flex justify-start">
                    <TableHeaderCell
                      title="Unsecured"
                      infoText="The total amount of credit (above the standard LTV) issued by the all markets in the vault to premium, rated borrowers."
                    />
                  </div>
                </th>
                {userAddress && (
                  <th
                    style={{
                      right: 0,
                      backgroundColor: "#212121",
                      position: isStickyDisabled ? "static" : "sticky",
                      boxShadow: "inset 0 2px 0px 0px rgba(0, 0, 0, 0.2)",
                    }}
                  ></th>
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
                      <FormatPourcentage value={item.netAPY} />
                    </div>
                  </td>
                  <td className="py-4  items-center h-full ">
                    <FormatTokenMillion
                      value={item.totalDeposits}
                      token={item.tokenSymbol}
                      totalValue={item.totalValueUSD}
                    />
                  </td>
                  <td className="py-4 px-6 items-center h-full">
                    <div className="flex">
                      <div className="mr-2 w-5 h-5">
                        <IconToken tokenName="abt" />
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
                  <td className="py-4 px-6 items-center   h-full ">
                    <FormatTokenMillion
                      value={item.totalDeposits}
                      token={item.tokenSymbol}
                      totalValue={item.unsecured}
                    />
                  </td>
                  {userAddress && (
                    <td
                      className={`py-4 px-6 items-center justify-end h-full ${
                        isStickyDisabled ? "" : "sticky"
                      }`}
                      style={{
                        right: 0,
                        backgroundColor:
                          index % 2 === 0 ? "#141414" : "#191919",
                      }}
                    >
                      <div onClick={(event) => event.stopPropagation()}>
                        <ButtonDialog
                          item={item.market}
                          color="primary"
                          buttonText="Deposit"
                          onButtonClick={toggleSticky}
                        >
                          {(closeModal) => (
                            <div className="h-full w-full">
                              <VaultDeposit
                                item={item}
                                closeModal={closeModal}
                              ></VaultDeposit>
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
