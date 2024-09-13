"use client";

import { formatUnits, ZeroAddress } from "ethers";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import HeaderEarnDetail from "@/components/details/HeaderEarnDetail";
import InfosEarnDetails from "@/components/details/InfosEarnDetail";
import DetailEarnMoreTable from "@/components/moreTable/DetailEarnMoreTable";
import { fetchVault, fetchMarkets } from "@/utils/graph";
import { InvestmentData, VaultBreakdown } from "@/types";
import { initBalance, tokens, curators } from "@/utils/const";

const EarnDetailPage: React.FC = () => {
  const router = useRouter();
  const params = usePathname();

  const [totalBorrow, setTotalBorrow] = useState(0);
  const [breakdowns, setBreakdowns] = useState<VaultBreakdown[]>([]);
  const [vaultInfo, setVaultInfo] = useState<InvestmentData | null>(null);

  const vaultId = params.replace("/earn/", "");

  useEffect(() => {
    const initVault = async () => {
      try {
        const [fetchedVault, marketsArr] = await Promise.all([
          fetchVault(vaultId),
          fetchMarkets(),
        ]);

        if (fetchedVault) {
          const breakdownList = fetchedVault.supplyQueue
            .map((queueItem) => {
              const marketId = queueItem.market.id.toLowerCase();
              const marketItem = marketsArr.find(
                (item) => item.id.toLowerCase() == marketId
              );

              if (marketItem) {
                return {
                  allowcation: 0,
                  supply: formatUnits(marketItem.totalSupply),
                  borrow: formatUnits(marketItem.totalBorrow),
                  collateral: tokens[marketItem.inputToken.id.toLowerCase()],
                  lltv: Number(formatUnits(BigInt(marketItem.lltv))),
                  credora: "rating",
                } as VaultBreakdown;
              }
            })
            .filter((item) => item !== undefined);

          let totalSupply = 0;
          let totalBorrows = 0;
          for (const breakdown of breakdownList) {
            totalSupply += Number(breakdown.supply);
            totalBorrows += Number(breakdown.borrow);
          }
          setTotalBorrow(totalBorrows);

          const updated = breakdownList.map((item) => {
            return {
              ...item,
              allowcation:
                totalSupply > 0
                  ? (Number(item.supply) * 100) / totalSupply
                  : "0",
            } as VaultBreakdown;
          });
          setBreakdowns(updated);

          setVaultInfo({
            vaultId: fetchedVault.id,
            vaultName: fetchedVault.name,
            assetAddress: fetchedVault.asset.id,
            tokenSymbol: tokens[fetchedVault.asset.id.toLowerCase()],
            netAPY: 0,
            totalDeposits: totalSupply,
            totalValueUSD: 0,
            curator:
              fetchedVault.curator && fetchedVault.curator.id != ZeroAddress
                ? curators[fetchedVault.curator.id]
                : "",
            collateral: [],
            unsecured: 0,
            guardian: fetchedVault.guardian ? fetchedVault.guardian.id : "",
            tokenBalance: initBalance,
            // market: marketInfo,
          } as InvestmentData);
        }
      } catch (err) {
        console.log(err);
        router.push("/earn");
      }
    };

    initVault();
  }, [vaultId]);

  return (
    <>
      {vaultInfo && (
        <>
          <div className="mb-8 overflow-visible">
            <HeaderEarnDetail vault={vaultInfo} />
            <InfosEarnDetails vault={vaultInfo} totalBorrow={totalBorrow} />
          </div>
          <h1 className="text-4xl mt-16 mb-8">Vault Breakdown</h1>
          <DetailEarnMoreTable breakdowns={breakdowns} />
        </>
      )}
    </>
  );
};

export default EarnDetailPage;
