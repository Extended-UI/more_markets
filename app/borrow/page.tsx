"use client";

import React, { useState, useEffect } from "react";
import BorrowMoreTable from "@/components/moreTable/BorrowMoreTable";
import LoanMoreTable from "@/components/moreTable/LoanMoreTable";
import { fetchMarkets } from "@/utils/graph";
import { GraphMarket } from "@/types";

const BorrowPage: React.FC = () => {
  const [markets, setMarkets] = useState<GraphMarket[]>([]);

  useEffect(() => {
    const initFunc = async () => {
      const marketsArr = await fetchMarkets();
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
