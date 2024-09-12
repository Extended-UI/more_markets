"use client";

import React, { useState, useEffect } from "react";
import BorrowMoreTable from "@/components/moreTable/BorrowMoreTable";
import LoanMoreTable from "@/components/moreTable/LoanMoreTable";
import { fetchMarkets, fetchVaults } from "@/utils/graph";
import { GraphMarket, GraphVault } from "@/types";

const BorrowPage: React.FC = () => {
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
    <div>
      <h1 className="text-4xl mb-4">My Loans</h1>
      <LoanMoreTable />

      <h1 className="text-4xl mb-4">MORE Markets</h1>
      <BorrowMoreTable marketsArr={markets} />
    </div>
  );
};

export default BorrowPage;
