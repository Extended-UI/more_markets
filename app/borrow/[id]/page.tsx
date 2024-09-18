"use client";

import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import InfosBorrowDetails from "@/components/details/InfosBorrowDetail";
import PositionMoreTable from "@/components/moreTable/PositionMoreTable";
import HeaderBorrowDetail from "@/components/details/HeaderBorrowDetail";
import GraphsBorrowDetails from "@/components/details/GraphsBorrowDetails";
import ActivityBorrowDetail from "@/components/details/ActivityBorrowDetail";
// import { fetchMarket } from "@/utils/graph";
import { BorrowMarket, Position } from "@/types";
import { getMarketData, getPosition, fetchMarket } from "@/utils/contract";

const BorrowDetailPage: React.FC = () => {
  const router = useRouter();
  const params = usePathname();
  const { address: userAddress } = useAccount();

  const [borrowPosition, setBorrowPosition] = useState<Position | null>(null);
  const [borrowMarket, setBorrowMarket] = useState<BorrowMarket | null>(null);

  const marketId = params ? params.replace("/borrow/", "") : "";

  const initMarket = async () => {
    try {
      if (marketId.length > 0) {
        const [marketInfo, marketData] = await Promise.all([
          fetchMarket(marketId),
          getMarketData(marketId),
        ]);

        setBorrowMarket({
          ...marketInfo,
          marketParams: marketData.params,
          marketInfo: marketData.info,
        } as BorrowMarket);

        if (userAddress) {
          const positionInfo = await getPosition(userAddress, marketId);
          setBorrowPosition(positionInfo);
        }
      } else {
        router.push("/borrow");
      }
    } catch (err) {
      console.log(err);
      router.push("/borrow");
    }
  };

  useEffect(() => {
    initMarket();
  }, [userAddress, params]);

  const updateInfo = async (marketId: string) => {
    const marketData = await getMarketData(marketId);
    setBorrowMarket({
      ...borrowMarket,
      marketParams: marketData.params,
      marketInfo: marketData.info,
    } as BorrowMarket);
  };

  return (
    <>
      {borrowMarket && (
        <div className="mb-8 p-3">
          <HeaderBorrowDetail item={borrowMarket} updateInfo={updateInfo} />
          <InfosBorrowDetails item={borrowMarket} />
          {borrowPosition && (
            <PositionMoreTable
              item={borrowMarket}
              position={borrowPosition}
              updateInfo={updateInfo}
            />
          )}

          <GraphsBorrowDetails />
          <ActivityBorrowDetail />
        </div>
      )}
    </>
  );
};

export default BorrowDetailPage;
