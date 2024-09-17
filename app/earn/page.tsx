"use client";

import _ from "lodash";
import { ZeroAddress } from "ethers";
import React, { useEffect, useState } from "react";
import EarnMoreTable from "@/components/moreTable/EarnMoreTable";
import DepositMoreTable from "@/components/moreTable/DepositMoreTable";
import { InvestmentData } from "@/types";
import { formatTokenValue } from "@/utils/utils";
import { getVaultDetail } from "@/utils/contract";
import { fetchMarkets, fetchVaults } from "@/utils/graph";
import { curators, blacklistedVaults } from "@/utils/const";

const EarnPage: React.FC = () => {
  const [investments, setInvestments] = useState<InvestmentData[]>([]);

  useEffect(() => {
    const initFunc = async () => {
      const [vaultsArr, marketsArr] = await Promise.all([
        fetchVaults(),
        fetchMarkets(),
      ]);

      if (marketsArr && vaultsArr) {
        const promises = vaultsArr.map(async (vault) => {
          if (blacklistedVaults.includes(vault.id)) return null;

          // get collaterals
          const collaterals: string[] = vault.supplyQueue.map((queue) => {
            const marketItem = marketsArr.find(
              (market) =>
                market.id.toLowerCase() == queue.market.id.toLowerCase()
            );

            return marketItem ? marketItem.inputToken.id : "";
          });
          const activeCollaterals = collaterals.filter(
            (item) => item.length > 0
          );

          const deposited = (await getVaultDetail(
            vault.id,
            "totalAssets",
            []
          )) as bigint;

          return {
            vaultId: vault.id,
            vaultName: vault.name,
            assetAddress: vault.asset.id,
            netAPY: 0,
            totalDeposits: formatTokenValue(deposited, vault.asset.id),
            totalValueUSD: 0,
            curator:
              vault.curator && vault.curator.id != ZeroAddress
                ? curators[vault.curator.id]
                : "",
            collateral: _.uniq(activeCollaterals),
            guardian: vault.guardian ? vault.guardian.id : "",
          } as InvestmentData;
        });

        const fetchedVaults = (await Promise.all(promises)).filter(
          (item) => item !== null
        );
        setInvestments(fetchedVaults);
      }
    };

    initFunc();
  }, []);

  const updateInfo = async (vaultId: string) => {
    const deposited = (await getVaultDetail(
      vaultId,
      "totalAssets",
      []
    )) as bigint;

    setInvestments((prevItems) =>
      prevItems.map((item) =>
        item.vaultId.toLowerCase() == vaultId.toLowerCase()
          ? {
              ...item,
              totalDeposits: formatTokenValue(deposited, item.assetAddress),
            }
          : item
      )
    );
  };

  return (
    <>
      <DepositMoreTable investments={investments} updateInfo={updateInfo} />

      <h1 className="text-4xl mb-8">MORE Vaults</h1>
      <EarnMoreTable investments={investments} updateInfo={updateInfo} />
    </>
  );
};

export default EarnPage;
