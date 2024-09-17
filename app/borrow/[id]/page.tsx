"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ActivityBorrowDetail from "@/components/details/ActivityBorrowDetail";
import GraphsBorrowDetails from "@/components/details/GraphsBorrowDetails";
import HeaderBorrowDetail from "@/components/details/HeaderBorrowDetail";
import InfosBorrowDetails from "@/components/details/InfosBorrowDetail";
import PositionMoreTable from "@/components/moreTable/PositionMoreTable";
import { BorrowMarket } from "@/types";
import { fetchMarket } from "@/utils/graph";
import { getMarketParams } from "@/utils/contract";

const BorrowDetailPage: React.FC = () => {
  const router = useRouter();
  const params = usePathname();

  const [borrowMarket, setBorrowMarket] = useState<BorrowMarket | null>(null);

  const marketId = params ? params.replace("/borrow/", "") : "";

  useEffect(() => {
    const initMarket = async () => {
      try {
        if (marketId.length > 0) {
          const [marketInfo, marketParams] = await Promise.all([
            fetchMarket(marketId),
            getMarketParams(marketId),
          ]);

          setBorrowMarket({
            ...marketInfo,
            marketParams: marketParams,
          } as BorrowMarket);
        } else {
          router.push("/borrow");
        }
      } catch (err) {
        console.log(err);
        router.push("/borrow");
      }
    };

    initMarket();
  }, [params]);

  const updateInfo = async (marketId: string) => {};

  return (
    <>
      {borrowMarket && (
        <div className="mb-8 p-3">
          <HeaderBorrowDetail item={borrowMarket} updateInfo={updateInfo} />
          <InfosBorrowDetails item={borrowMarket} />
          <PositionMoreTable item={borrowMarket} updateInfo={updateInfo} />
          <GraphsBorrowDetails />
          <ActivityBorrowDetail />
        </div>
      )}
    </>
  );
};

export default BorrowDetailPage;
