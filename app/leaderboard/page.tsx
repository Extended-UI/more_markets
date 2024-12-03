"use client";

import millify from "millify";
import React, { useEffect, useState } from "react";
import IconToken from "@/components/token/IconToken";
import InfoDetailGrey from "@/components/details/InfoDetailGrey";
import TableHeaderCell from "@/components/moreTable/MoreTableHeader";
import { getUserLeaderboard } from "@/utils/contract";

const Leaderboard: React.FC = () => {
  useEffect(() => {}, []);

  const leaderDetail = (showVal: number): string => {
    return showVal == 0
      ? ""
      : showVal >= 1e2
      ? millify(showVal)
      : showVal.toFixed(2);
  };

  return (
    <div className="mb-8 overflow-visible mt-14">
      <div className="overflow-x-scroll table-wrapper mb-16 more-table">
        <table className="w-full text-sm text-left table overflow-x-scroll">
          <thead
            className="bg-[#212121] h-20 text-white text-sm"
            style={{ boxShadow: "inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)" }}
          >
            <tr className="">
              <th className="p-6">
                <TableHeaderCell title="Address" infoText="" />
              </th>
              <th className="p-6">
                <div className="flex justify-start">
                  <TableHeaderCell title="Total Deposits" infoText="" />
                </div>
              </th>
              <th className="p-6">
                <div className="flex justify-start">
                  <TableHeaderCell title="Total Borrow" infoText="" />
                </div>
              </th>
              <th className="p-6">
                <div className="flex justify-start">
                  <TableHeaderCell title="Total Collateral" infoText="" />
                </div>
              </th>

              <th className="p-6">
                <div className="flex justify-start">
                  <TableHeaderCell title="$FLOW Rewards" infoText="" />
                </div>
              </th>
              <th className="p-6">
                <div className="flex justify-start">
                  <TableHeaderCell title="Boxes" infoText="" />
                </div>
              </th>
              <th className="p-6">
                <div className="flex justify-start">
                  <TableHeaderCell title="MORE Points" infoText="" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent"></tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
