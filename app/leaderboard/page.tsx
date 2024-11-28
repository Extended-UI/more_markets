"use client";

import millify from "millify";
import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import InfoDetailGrey from "@/components/details/InfoDetailGrey";
import { ILeaderDetail } from "@/types";
import { initLeaderInfo } from "@/utils/const";
import { getUserLeaderboard } from "@/utils/contract";

const Leaderboard: React.FC = () => {
  const [leaderInfo, setLeaderInfo] = useState<ILeaderDetail>(initLeaderInfo);
  const { address: userAddress } = useAccount();

  useEffect(() => {
    const initUserInfo = async () => {
      if (userAddress) {
        const userDetails = await getUserLeaderboard(userAddress);
        setLeaderInfo(userDetails);
      }
    };

    initUserInfo();
  }, [userAddress]);

  const leaderDetail = (showVal: number): string => {
    return showVal == 0
      ? ""
      : showVal >= 1e2
      ? millify(showVal)
      : showVal.toFixed(2);
  };

  return (
    <div className="mb-8 overflow-visible mt-14">
      <div className="flex w-full flex-col overflow-visible">
        <div
          className="flex w-full overflow-x-auto"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none", // Works in Firefox
            msOverflowStyle: "none", // Works in IE and Edge
            //width: "calc(100% + 2rem)",
            width: "100%",
            position: "relative",
            left: "0",
            overflow: "visible",
          }}
        >
          <InfoDetailGrey
            title="Total Supply"
            infoText=""
            className="flex-1 m-2 ml-0 min-w-[180px]"
          >
            {"$ " + leaderDetail(leaderInfo.supplyUSD)}
          </InfoDetailGrey>
          <InfoDetailGrey
            title="Total Collateral"
            infoText=""
            className="flex-1 m-2 min-w-[220px]"
          >
            {"$ " + leaderDetail(leaderInfo.collateralUSD)}
          </InfoDetailGrey>
          <InfoDetailGrey
            title="Total Borrow"
            infoText=""
            className="flex-1 m-2 min-w-[180px]"
          >
            {"$ " + leaderDetail(leaderInfo.borrowUSD)}
          </InfoDetailGrey>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
