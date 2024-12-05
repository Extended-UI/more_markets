"use client";

import millify from "millify";
import React, { useEffect, useState } from "react";
import TableHeaderCell from "@/components/moreTable/MoreTableHeader";
import { ILeaderUser } from "@/types";
import { getLBUsers } from "@/utils/graph";
import { getTokenPrices } from "@/utils/contract";
import { formatAddress, fetchBoxUsers, formatTokenValue } from "@/utils/utils";

interface ILBRow extends ILeaderUser {
  box: number;
  vault_reward: number;
}

const Leaderboard: React.FC = () => {
  const [lbUsers, setLBUsers] = useState<ILBRow[]>([]);
  useEffect(() => {
    const initInfo = async () => {
      const [selUsers, rewardUsers, tokenPrices] = await Promise.all([
        getLBUsers(),
        fetchBoxUsers(),
        getTokenPrices(),
      ]);

      const filtered = selUsers.filter(
        (selUser) =>
          selUser.supplyUSD + selUser.borrowUSD + selUser.collateralUSD > 0.001
      );

      setLBUsers(
        filtered.map((user) => {
          const selBoxUser = rewardUsers.boxUsers.find(
            (boxUser) => boxUser.user.toLowerCase() == user.user.toLowerCase()
          );
          const selVaultReward = rewardUsers.vaultRewards.filter(
            (vaultReward) =>
              vaultReward.user.toLowerCase() == user.user.toLowerCase()
          );
          const rewardAmount = selVaultReward.reduce((memo, rewardItem) => {
            const selPrice = tokenPrices.find(
              (tokenPrice) => tokenPrice.token == rewardItem.token
            );

            return (
              memo +
              formatTokenValue(BigInt(rewardItem.amount), rewardItem.token) *
                (selPrice ? selPrice.price : 0)
            );
          }, 0);

          return {
            ...user,
            box: selBoxUser ? Number(selBoxUser.amount) : 0,
            vault_reward: rewardAmount,
          };
        })
      );
    };

    initInfo();
  }, []);

  const leaderDetail = (showVal: number): string => {
    return showVal >= 1e2 ? millify(showVal) : showVal.toFixed(2);
  };

  return (
    <div className="mb-8 overflow-visible mt-14">
      <div className="overflow-x-scroll table-wrapper mb-16 more-table">
        <table className="w-full text-sm text-left table overflow-x-scroll">
          <thead
            className="bg-[#212121] h-20 text-white text-sm"
            style={{ boxShadow: "inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)" }}
          >
            <tr className="">
              <th className="p-6">
                <TableHeaderCell title="Address" infoText="" />
              </th>
              <th className="p-6">
                <div className="flex justify-start">
                  <TableHeaderCell title="Total Deposits" infoText="" />
                </div>
              </th>
              <th className="p-6">
                <div className="flex justify-start">
                  <TableHeaderCell title="Total Collateral" infoText="" />
                </div>
              </th>
              <th className="p-6">
                <div className="flex justify-start">
                  <TableHeaderCell title="Total Borrow" infoText="" />
                </div>
              </th>
              <th className="p-6">
                <div className="flex justify-start">
                  <TableHeaderCell title="$FLOW Rewards" infoText="" />
                </div>
              </th>
              <th className="p-6">
                <div className="flex justify-start">
                  <TableHeaderCell title="Boxes" infoText="" />
                </div>
              </th>
              <th className="p-6">
                <div className="flex justify-start">
                  <TableHeaderCell title="MORE Points" infoText="" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent">
            {lbUsers.map((lbUser, index) => (
              <tr
                key={lbUser.user}
                style={
                  index === lbUsers.length - 1
                    ? {
                        borderBottomLeftRadius: "8px",
                        borderBottomRightRadius: "8px",
                      }
                    : undefined
                }
                className={`p-4 last:border-b-0 text-[14px] border border-[#202020] cursor-pointer ${
                  index % 2 === 0 ? "bg-[#141414]" : "bg-[#191919]"
                }`}
              >
                <td className="p-6 h-full">{formatAddress(lbUser.user)}</td>
                <td className="p-6 h-full">
                  {leaderDetail(lbUser.supplyUSD)}$
                </td>
                <td className="p-6 h-full">
                  {leaderDetail(lbUser.collateralUSD)}$
                </td>
                <td className="p-6 h-full">
                  {leaderDetail(lbUser.borrowUSD)}$
                </td>
                <td className="p-6 h-full">{millify(lbUser.vault_reward)}</td>
                <td className="p-6 h-full">{millify(lbUser.box)}</td>
                <td className="p-6 h-full">Coming Soon</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
