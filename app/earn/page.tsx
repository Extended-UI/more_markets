"use client";

import { uniq } from "lodash";
import React, { useEffect, useState } from "react";
import EarnMoreTable from "@/components/moreTable/EarnMoreTable";
import DepositMoreTable from "@/components/moreTable/DepositMoreTable";
import { InvestmentData } from "@/types";
// import { blacklistedVaults } from "@/utils/const";
import { getVaultDetail, fetchVaults, fetchMarkets } from "@/utils/contract";
import {
  formatTokenValue,
  formatCurator,
  fetchVaultAprs,
  convertAprToApy,
} from "@/utils/utils";
// import { fetchMarkets, fetchVaults } from "@/utils/graph";

const EarnPage: React.FC = () => {
  const [investments, setInvestments] = useState<InvestmentData[]>([]);

  useEffect(() => {
    const initFunc = async () => {
      const aprDates = 30;
      const [vaultsArr, marketsArr, aprsArr] = await Promise.all([
        fetchVaults(),
        fetchMarkets(),
        fetchVaultAprs(aprDates),
      ]);

      if (marketsArr && vaultsArr && aprsArr) {
        const promises = vaultsArr.map(async (vault) => {
          // if (blacklistedVaults.includes(vault.id)) return null;

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

          const aprItem = aprsArr.find(
            (aprItem) => aprItem.vaultid.toLowerCase() == vault.id.toLowerCase()
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
            netAPY: aprItem ? convertAprToApy(aprItem.apr, aprDates) : 0,
            totalDeposits: formatTokenValue(deposited, vault.asset.id),
            curator: formatCurator(vault),
            collateral: uniq(activeCollaterals),
            guardian: vault.guardian ? vault.guardian.id : "",
            timelock: vault.timelock,
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

      <h1 className="text-[30px] mb-8 mt-28 font-semibold">MORE Vaults</h1>
      <EarnMoreTable investments={investments} updateInfo={updateInfo} />
    </>
  );
};

export default EarnPage;
