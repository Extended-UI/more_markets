"use client";

import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import LoanMoreTable from "@/components/moreTable/LoanMoreTable";
import BorrowMoreTable from "@/components/moreTable/BorrowMoreTable";
import { getMarketData } from "@/utils/contract";
import { GraphPosition, BorrowMarket } from "@/types";
import { fetchMarkets, fetchPositions } from "@/utils/graph";

const BorrowPage: React.FC = () => {
  const { address: userAddress } = useAccount();

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

      setPositions(positionsArr);
    };

    initFunc();
  }, [userAddress]);

  const updateInfo = async (marketId: string) => {
    if (userAddress) {
      const [marketInfo, positionsArr] = await Promise.all([
        getMarketData(marketId),
        fetchPositions(userAddress),
      ]);

      setPositions(positionsArr);
      setBorrowMarkets((prevItems) =>
        prevItems.map((item) =>
          item.id.toLowerCase() == marketId.toLowerCase()
            ? {
                ...item,
                marketInfo: marketInfo.info,
                marketParams: marketInfo.params,
              }
            : item
        )
      );
    }
  };

  return (
    <>
      <LoanMoreTable
        updateInfo={updateInfo}
        positions={positions}
        borrowMarkets={borrowMarkets}
      />

      <h1 className="text-4xl mb-4">MORE Markets</h1>
      <BorrowMoreTable
        updateInfo={updateInfo}
        borrowMarketList={borrowMarkets}
      />
    </>
  );
};

export default BorrowPage;
