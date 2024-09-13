"use client";

import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import BorrowMoreTable from "@/components/moreTable/BorrowMoreTable";
import LoanMoreTable from "@/components/moreTable/LoanMoreTable";
import { fetchMarkets, fetchPositions } from "@/utils/graph";
import { GraphMarket, GraphPosition } from "@/types";

const BorrowPage: React.FC = () => {
  const { address: userAddress } = useAccount();
  const [markets, setMarkets] = useState<GraphMarket[]>([]);
  const [positions, setPositions] = useState<GraphPosition[]>([]);

  useEffect(() => {
    const initFunc = async () => {
      const [marketsArr, positionsArr] = await Promise.all([
        fetchMarkets(),
        fetchPositions(userAddress),
      ]);

      setMarkets(marketsArr);
      setPositions(positionsArr);
    };

    initFunc();
  }, [userAddress]);

  return (
    <>
      <LoanMoreTable positionArr={positions} marketsArr={markets} />

      <h1 className="text-4xl mb-4">MORE Markets</h1>
      <BorrowMoreTable marketsArr={markets} />
    </>
  );
};

export default BorrowPage;
