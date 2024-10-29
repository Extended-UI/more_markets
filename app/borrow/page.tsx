"use client";

import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import LoanMoreTable from "@/components/moreTable/LoanMoreTable";
import BorrowMoreTable from "@/components/moreTable/BorrowMoreTable";
import { GraphPosition, BorrowMarket } from "@/types";
import { getMarketData, fetchMarkets } from "@/utils/contract";
import { convertAprToApy, fetchMarketAprs } from "@/utils/utils";
// import { fetchMarkets, fetchPositions } from "@/utils/graph";

const BorrowPage: React.FC = () => {
  const { address: userAddress } = useAccount();

  // const [positions, setPositions] = useState<GraphPosition[]>([]);
  const [borrowMarkets, setBorrowMarkets] = useState<BorrowMarket[]>([]);

  const aprDate = 1;
  useEffect(() => {
    const initFunc = async () => {
      // const [marketsArr, positionsArr] = await Promise.all([
      const [marketsArr, marketAprs] = await Promise.all([
        fetchMarkets(),
        fetchMarketAprs(aprDate),
        // fetchPositions(userAddress),
      ]);

      const promises = marketsArr.map(async (marketItem) => {
        const marketInfo = await getMarketData(marketItem.id);
        const aprItem = marketAprs.find(
          (marketApr) =>
            marketApr.marketid.toLowerCase() == marketItem.id.toLowerCase()
        );
        return {
          ...marketItem,
          borrow_apr: aprItem
            ? convertAprToApy(aprItem.borrow_apr, aprDate)
            : 0,
          supply_usual_apr: aprItem
            ? convertAprToApy(aprItem.supply_usual_apr, aprDate)
            : 0,
          supply_prem_apr: aprItem
            ? convertAprToApy(aprItem.supply_prem_apr, aprDate)
            : 0,
          marketInfo: marketInfo.info,
          marketParams: marketInfo.params,
        } as BorrowMarket;
      });

      const borrowMarketList = await Promise.all(promises);
      setBorrowMarkets(borrowMarketList);

      // setPositions(positionsArr);
    };

    initFunc();
  }, [userAddress]);

  const updateInfo = async (marketId: string) => {
    if (userAddress) {
      // const [marketInfo, positionsArr] = await Promise.all([
      const [marketInfo, marketAprs] = await Promise.all([
        getMarketData(marketId),
        fetchMarketAprs(aprDate, marketId),
        // fetchPositions(userAddress),
      ]);

      const aprItem = marketAprs.find(
        (marketApr) =>
          marketApr.marketid.toLowerCase() == marketId.toLowerCase()
      );

      // setPositions(positionsArr);
      setBorrowMarkets((prevItems) =>
        prevItems.map((item) =>
          item.id.toLowerCase() == marketId.toLowerCase()
            ? {
                ...item,
                borrow_apr: aprItem
                  ? convertAprToApy(aprItem.borrow_apr, aprDate)
                  : 0,
                supply_usual_apr: aprItem
                  ? convertAprToApy(aprItem.supply_usual_apr, aprDate)
                  : 0,
                supply_prem_apr: aprItem
                  ? convertAprToApy(aprItem.supply_prem_apr, aprDate)
                  : 0,
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
        // positions={positions}
        borrowMarkets={borrowMarkets}
      />

      <h1 className="text-[30px] mb-8 mt-28 font-semibold">MORE Markets</h1>
      <BorrowMoreTable updateInfo={updateInfo} borrowMarkets={borrowMarkets} />
    </>
  );
};

export default BorrowPage;
