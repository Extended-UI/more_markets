"use client";

import Image from "next/image";
import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import InfosBorrowDetails from "@/components/details/InfosBorrowDetail";
import PositionMoreTable from "@/components/moreTable/PositionMoreTable";
import HeaderBorrowDetail from "@/components/details/HeaderBorrowDetail";
import GraphsBorrowDetails from "@/components/details/GraphsBorrowDetails";
import ActivityBorrowDetail from "@/components/details/ActivityBorrowDetail";
// import { fetchMarket } from "@/utils/graph";
import { getBorrowedAmount } from "@/utils/contract";
import { BorrowMarket, BorrowPosition } from "@/types";
import { getMarketData, getPosition, fetchMarket } from "@/utils/contract";
import leftArrow from "@/public/assets/icons/left-arrow.png";

const BorrowDetailPage: React.FC = () => {
  const router = useRouter();
  const params = usePathname();
  const { address: userAddress } = useAccount();

  const [borrowMarket, setBorrowMarket] = useState<BorrowMarket | null>(null);
  const [borrowPosition, setBorrowPosition] = useState<BorrowPosition | null>(
    null
  );

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
          if (positionInfo)
            setBorrowPosition({
              ...marketInfo,
              marketParams: marketData.params,
              marketInfo: marketData.info,
              loan: await getBorrowedAmount(
                marketInfo.id,
                positionInfo.lastMultiplier,
                positionInfo.borrowShares
              ),
              borrowShares: positionInfo.borrowShares,
              collateral: positionInfo.collateral,
              lastMultiplier: positionInfo.lastMultiplier,
            });
        }
      } else {
        router.push("/borrow");
      }
    } catch (err) {
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

  const closeModal = () => {};

  return (
    <>
      {borrowMarket && (
        <div className="mb-8 p-3">
          <Image
            onClick={() => router.push("/borrow")}
            className="my-5 cursor-pointer"
            src={leftArrow}
            alt="left-arrow"
            width={35}
            height={35}
          />
          <HeaderBorrowDetail item={borrowMarket} updateInfo={updateInfo} />
          <InfosBorrowDetails item={borrowMarket} />
          {borrowPosition && (
            <PositionMoreTable
              item={borrowPosition}
              updateInfo={updateInfo}
              closeModal={closeModal}
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
