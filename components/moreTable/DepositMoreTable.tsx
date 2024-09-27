"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import TableHeaderCell from "./MoreTableHeader";
import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDeposit from "../modal/deposit/VaultDeposit";
import IconToken from "../token/IconToken";
import ListIconToken from "../token/ListIconToken";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTokenMillion from "../tools/formatTokenMillion";
import VaultWithdraw from "../modal/withdraw/VaultWithdraw";
import { formatTokenValue } from "@/utils/utils";
import { InvestmentData, IInvestmentProps } from "@/types";
import { getTokenBallance, getVaultDetail } from "@/utils/contract";

const DepositMoreTable: React.FC<IInvestmentProps> = ({
  investments,
  updateInfo,
}) => {
  const router = useRouter();
  const { address: userAddress } = useAccount();
  const [vaults, setVaults] = useState<InvestmentData[]>([]);

  useEffect(() => {
    const initVaults = async () => {
      if (investments && userAddress) {
        const promises = investments.map(async (investment) => {
          // check vault balance
          const vaultShares = await getTokenBallance(
            investment.vaultId,
            userAddress
          );

          if (vaultShares.value > 0) {
            const userAssets = (await getVaultDetail(
              investment.vaultId,
              "convertToAssets",
              [vaultShares.value]
            )) as bigint;

            return {
              ...investment,
              userDeposits: formatTokenValue(
                userAssets,
                investment.assetAddress
              ),
              userShares: vaultShares.value,
            } as InvestmentData;
          }
        });

        const fetchedVaults = (await Promise.all(promises)).filter(
          (item) => item !== undefined
        );
        setVaults(fetchedVaults);
      } else {
        setVaults([]);
      }
    };

    initVaults();
  }, [userAddress, investments]);

  const goToDetail = (item: InvestmentData) => {
    router.push("/earn/" + item.vaultId);
  };

  return (
    <>
      {vaults.length > 0 && (
        <>
          <h1 className="text-4xl mb-4 mt-14">My Deposits</h1>
          <div className="overflow-x-scroll rounded-2xl table-wrapper mb-16 more-table">
            <table className="w-full rounded-2xl text-sm text-left table max-w-[1440px] overflow-x-scroll">
              <thead
                className="bg-[#212121] h-20 text-white  text-xs"
                style={{ boxShadow: "inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)" }}
              >
                <tr>
                  <th style={{ width: "200px" }}>
                    <TableHeaderCell
                      title="Vault Name"
                      infoText="The name given to the vault by the curator."
                    />
                  </th>
                  <th style={{ width: "200px" }}>
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
                    <div className="flex justify-start">
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
                    onClick={() => goToDetail(item)}
                    style={
                      index === arr.length - 1
                        ? {
                            borderBottomLeftRadius: "8px",
                            borderBottomRightRadius: "8px",
                          }
                        : undefined
                    }
                    className={`last:border-b-0 text-[14px] border border-[#202020]  cursor-pointer  ${
                      index % 2 === 0 ? "bg-[#141414]" : "bg-[#191919]"
                    }`}
                  >
                    <td className="py-4 px-6 items-start h-full">
                      <div className="flex items-start">
                        <IconToken
                          className="mr-2 w-6 h-6"
                          tokenName={item.assetAddress}
                        />
                        {item.vaultName}
                      </div>
                    </td>
                    <td className="py-4 px-6 items-start h-full">
                      <div className="flex items-start">
                        <IconToken
                          className="mr-2 w-6 h-6"
                          tokenName={item.assetAddress}
                          showSymbol={true}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 items-start h-full">
                      <div className="flex justify-start">
                        <FormatPourcentage value={item.netAPY} />
                      </div>
                    </td>
                    <td className="items-start h-full">
                      <div className="flex justify-start">
                        <FormatTokenMillion
                          value={item.userDeposits}
                          token={item.assetAddress}
                          totalValue={0}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 items-start h-full">
                      <div className="flex items-start">
                        <IconToken className="mr-2 w-6 h-6" tokenName="wflow" />
                        {item.curator}
                      </div>
                    </td>
                    <td className="py-4 items-start h-full">
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
                      <div
                        className="flex gap-2"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <ButtonDialog color="primary" buttonText="Deposit More">
                          {(closeModal) => (
                            <div className="w-full h-full">
                              <VaultDeposit
                                item={item}
                                closeModal={closeModal}
                                updateInfo={updateInfo}
                              />
                            </div>
                          )}
                        </ButtonDialog>
                        <ButtonDialog color="grey" buttonText="Withdraw">
                          {(closeModal) => (
                            <div className="w-full h-full">
                              <VaultWithdraw
                                item={item}
                                updateInfo={updateInfo}
                                closeModal={closeModal}
                              />
                            </div>
                          )}
                        </ButtonDialog>
                      </div>
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
