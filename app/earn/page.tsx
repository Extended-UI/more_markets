"use client";

import React, { useEffect, useState } from "react";
import EarnMoreTable from "@/components/moreTable/EarnMoreTable";
import DepositMoreTable from "@/components/moreTable/DepositMoreTable";
import { fetchMarkets, fetchVaults } from "@/utils/graph";
import { GraphMarket, GraphVault } from "@/types";

const EarnPage: React.FC = () => {
  const [vaults, setVaults] = useState<GraphVault[]>([]);
  const [markets, setMarkets] = useState<GraphMarket[]>([]);

  useEffect(() => {
    const initFunc = async () => {
      const [vaultsArr, marketsArr] = await Promise.all([
        fetchVaults(),
        fetchMarkets(),
      ]);

      setVaults(vaultsArr);
      setMarkets(marketsArr);
    };

    initFunc();
  }, []);

  return (
    <>
      <h1 className="text-4xl mb-8">My Deposits</h1>
      <DepositMoreTable vaultsArr={vaults} marketsArr={markets} />

      <h1 className="text-4xl mb-8">MORE Vaults</h1>
      <EarnMoreTable vaultsArr={vaults} marketsArr={markets} />
    </>
  );
};

export default EarnPage;
