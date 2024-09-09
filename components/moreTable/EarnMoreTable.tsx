"use client";

import { ZeroAddress, toBigInt } from "ethers";
import React, { useEffect, useState } from "react";
import {
  readContracts,
  readContract,
  getBalance,
  type GetBalanceReturnType,
} from "@wagmi/core";
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
import { MorphoAbi } from "@/app/abi/MorphoAbi";
import { contracts, curators, tokens } from "@/utils/const";
import { getVaule, getVauleNum } from "@/utils/utils";

const morphoContract = {
  address: contracts.MORE_MARKETS as `0x${string}`,
  abi: MorphoAbi,
};

const EarnMoreTable: React.FC = () => {
  const router = useRouter();
  const account = useAccount();
  const [isStickyDisabled, setIsStickyDisabled] = useState(false);
  const [investments, setInvestments] = useState<InvestmentData[]>([]);

  const { address: userAddress } = account;

  const {
    data: arrayOfVaults,
    isSuccess,
    isPending,
    refetch: refetchProject,
  } = useReadContract({
    address: contracts.MORE_VAULTS_FACTORY as `0x${string}`,
    abi: VaultsFactoryAbi,
    functionName: "arrayOfMorphos",
  });

  useEffect(() => {
    refetchProject?.();
  }, [isSuccess]);

  useEffect(() => {
    const initVaults = async () => {
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
              const supplyQueueIdReq =
                supplyQueueLen > 0
                  ? await readContract(config, {
                      ...vaultContract,
                      functionName: "supplyQueue",
                      args: [0],
                    })
                  : null;
              const marketId = supplyQueueIdReq
                ? getVaule(supplyQueueIdReq)
                : "";

              let marketInfo = null;
              if (supplyQueueLen > 0) {
                const [configs, params, infos] = await readContracts(config, {
                  contracts: [
                    {
                      ...vaultContract,
                      functionName: "config",
                      args: [marketId],
                    },
                    {
                      ...morphoContract,
                      functionName: "idToMarketParams",
                      args: [marketId],
                    },
                    {
                      ...morphoContract,
                      functionName: "market",
                      args: [marketId],
                    },
                  ],
                });

                marketInfo = {
                  config: configs.result,
                  params: params.result,
                  info: infos.result,
                } as Market;
              }

              const assetAddress = getVaule(asset);
              const curatorAddress = getVaule(curator);
              const tokenBalance = userAddress
                ? await getBalance(config, {
                    token: assetAddress as `0x${string}`,
                    address: userAddress,
                  })
                : ({
                    decimals: 18,
                    formatted: "0",
                    symbol: "",
                    value: toBigInt(0),
                  } as GetBalanceReturnType);

              return {
                vaultName: getVaule(name),
                tokenSymbol: tokens[assetAddress],
                netAPY: 0,
                totalDeposits: 0,
                totalValueUSD: 0,
                curator:
                  curatorAddress == ZeroAddress
                    ? "-"
                    : curators[curatorAddress],
                collateral: [],
                unsecured: 0,
                tokenBalance,
                supplyQueue: marketId,
                market: marketInfo,
              };
            }
          )
        : [];

      setInvestments(promises.length == 0 ? [] : await Promise.all(promises));
    };

    initVaults();
  }, [arrayOfVaults]);

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
                    index % 2 === 0 ? "bg-[#141414]" : "bg-[#191919]"
                  }`}
                >
                  <td className="py-4 px-6 items-center h-full">
                    <div className="flex items-center ">
                      <div className="mr-2 w-6 h-6">
                        <IconToken tokenName={item.tokenSymbol}></IconToken>
                      </div>
                      {item.vaultName}
                    </div>
                  </td>
                  <td className="py-4 px-6 items-center h-full">
                    <div className="flex items-center ">
                      <div className="mr-2 w-6 h-6">
                        <IconToken tokenName={item.tokenSymbol}></IconToken>
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
