"use client";

import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import BorrowMoreTable from "@/components/moreTable/BorrowMoreTable";
import LoanMoreTable from "@/components/moreTable/LoanMoreTable";
import { fetchMarkets, fetchPositions } from "@/utils/graph";
import { GraphMarket, GraphPosition, BorrowMarket } from "@/types";
import { getMarketData } from "@/utils/contract";

const BorrowPage: React.FC = () => {
  const { address: userAddress } = useAccount();

  const [markets, setMarkets] = useState<GraphMarket[]>([]);
  const [positions, setPositions] = useState<GraphPosition[]>([]);
  const [borrowMarkets, setBorrowMarkets] = useState<BorrowMarket[]>([]);

  useEffect(() => {
    const initFunc = async () => {
      const [marketsArr, positionsArr] = await Promise.all([
        fetchMarkets(),
        fetchPositions(userAddress),
      ]);

      const promises = marketsArr.map(async (marketItem) => {
        const marketInfo = await getMarketData(marketItem.id);
        return {
          ...marketItem,
          marketInfo: marketInfo.info,
          marketParams: marketInfo.params,
        } as BorrowMarket;
      });

      const borrowMarketList = await Promise.all(promises);
      setBorrowMarkets(borrowMarketList);

      setMarkets(marketsArr);
      setPositions(positionsArr);
    };

    initFunc();
  }, [userAddress]);

  return (
    <>
      <LoanMoreTable positionArr={positions} marketsArr={markets} />

      <h1 className="text-4xl mb-4">MORE Markets</h1>
      <BorrowMoreTable borrowMarketList={borrowMarkets} />
    </>
  );
};

export default BorrowPage;
