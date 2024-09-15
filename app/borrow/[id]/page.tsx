"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ActivityBorrowDetail from "@/components/details/ActivityBorrowDetail";
import GraphsBorrowDetails from "@/components/details/GraphsBorrowDetails";
import HeaderBorrowDetail from "@/components/details/HeaderBorrowDetail";
import InfosBorrowDetails from "@/components/details/InfosBorrowDetail";
import PositionMoreTable from "@/components/moreTable/PositionMoreTable";
import { fetchMarket } from "@/utils/graph";
import { BorrowMarket } from "@/types";
import { getMarketParams } from "@/utils/contract";

const BorrowDetailPage: React.FC = () => {
  const router = useRouter();
  const params = usePathname();

  const [borrowMarket, setBorrowMarket] = useState<BorrowMarket | null>(null);

  const marketId = params.replace("/borrow/", "");

  useEffect(() => {
    const initMarket = async () => {
      try {
        const [marketInfo, params] = await Promise.all([
          fetchMarket(marketId),
          getMarketParams(marketId),
        ]);

        setBorrowMarket({
          ...marketInfo,
          marketParams: params,
        } as BorrowMarket);
      } catch (err) {
        console.log(err);
        router.push("/borrow");
      }
    };

    initMarket();
  }, [marketId]);

  return (
    <>
      {borrowMarket && (
        <div className="mb-8 p-3">
          <HeaderBorrowDetail item={borrowMarket} />
          <InfosBorrowDetails item={borrowMarket} />
          <PositionMoreTable item={borrowMarket} />
          <GraphsBorrowDetails />
          <ActivityBorrowDetail />
        </div>
      )}
    </>
  );
};

export default BorrowDetailPage;
