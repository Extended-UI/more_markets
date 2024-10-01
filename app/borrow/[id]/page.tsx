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
import { BorrowMarket, BorrowPosition } from "@/types";

import { fetchMarketAprs, convertAprToApy } from "@/utils/utils";
import {
  getMarketData,
  getPosition,
  fetchMarket,
  getBorrowedAmount,
} from "@/utils/contract";

import leftArrow from "@/public/assets/icons/left-arrow.svg";

const BorrowDetailPage: React.FC = () => {
  const router = useRouter();
  const params = usePathname();
  const { address: userAddress } = useAccount();

  const [borrowMarket, setBorrowMarket] = useState<BorrowMarket | null>(null);
  const [borrowPosition, setBorrowPosition] = useState<BorrowPosition | null>(
    null
  );

  const aprDate = 1;
  const marketId = params ? params.replace("/borrow/", "") : "";

  const initMarket = async () => {
    try {
      if (marketId.length > 0) {
        const [marketInfo, marketData, marketAprs] = await Promise.all([
          fetchMarket(marketId),
          getMarketData(marketId),
          fetchMarketAprs(aprDate, marketId),
        ]);

        const aprItem = marketAprs.find(
          (marketApr) =>
            marketApr.marketid.toLowerCase() == marketId.toLowerCase()
        );

        setBorrowMarket({
          ...marketInfo,
          marketParams: marketData.params,
          marketInfo: marketData.info,
          borrow_apr: aprItem
            ? convertAprToApy(aprItem.borrow_apr, aprDate)
            : 0,
          supply_usual_apr: aprItem
            ? convertAprToApy(aprItem.supply_usual_apr, aprDate)
            : 0,
          supply_prem_apr: aprItem
            ? convertAprToApy(aprItem.supply_prem_apr, aprDate)
            : 0,
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
              borrow_apr: 0,
              supply_usual_apr: 0,
              supply_prem_apr: 0,
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
        <div className="mb-8 overflow-visible mt-14">
          <div className=" mr-10 mb-14">
          <div className="flex items-center w-[80px] cursor-pointer" onClick={() => router.push("/borrow")}>
                <Image
                  className="mr-4"
                  src={leftArrow}
                  alt="left-arrow"
                  width={24}
                  height={24}
                />
                <div className="text-[16px] text-white font-medium">
                  Back
                </div>
              </div>
          </div>
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
