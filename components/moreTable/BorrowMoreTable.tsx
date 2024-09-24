"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TableHeaderCell from "./MoreTableHeader";
import BorrowMoreTableRow from "./BorrowMoreTableRow";
import { BorrowMarket, IBorrowMarketProps } from "@/types";

const BorrowMoreTable: React.FC<IBorrowMarketProps> = ({
  updateInfo,
  borrowMarkets,
}) => {
  const router = useRouter();

  const goToDetail = (item: BorrowMarket) => {
    router.push("/borrow/" + item.id);
  };

  return (
    <div
      className="overflow-x-scroll  rounded-2xl  table-wrapper  mb-16"
      style={{
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        position: "relative",
      }}
    >
      <table className="w-full rounded-2xl text-sm text-left table max-w-[1440px] overflow-x-scroll">
        <thead
          className="bg-[#212121] h-20  text-white  text-xs"
          style={{ boxShadow: "inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)" }}
        >
          <tr className="">
            <th style={{ width: "200px" }} className="rounded-tl-lg">
              <TableHeaderCell
                title="Collateral Token"
                infoText="The token(s) that borrowers must lock in order to borrow funds in the given market."
              />
            </th>
            <th style={{ width: "200px" }}>
              <TableHeaderCell
                title="Loan Token"
                infoText="The token(s) issued to borrowers as a loan against their collateral in the given market."
              />
            </th>
            <th style={{ width: "200px" }}>
              <div className="flex justify-start">
                <TableHeaderCell
                  title="Liquidation  LTV"
                  infoText="The standard maximum proportion of loan value to collateral value that borrowers must maintain in order to avoid liquidation."
                />
              </div>
            </th>
            <th style={{ width: "200px" }}>
              <TableHeaderCell
                title="1D Borrow APY"
                infoText="The average annualized rate that borrowers paid over the trailing 24-hour period."
              />
            </th>
            <th style={{ width: "300px" }}>
              <TableHeaderCell
                title="Utilization"
                infoText="The percentage of total deposits that are currently being lent to all borrowers in the given market."
              />
            </th>
            <th style={{ width: "300px" }}>
              <div className="flex justify-start">
                <TableHeaderCell
                  title="Available Liquidity"
                  infoText="The total amount of tokens that have been deposited into the vault and made available to borrowers for loans."
                />
              </div>
            </th>
            <th
              style={{
                position: "sticky",
                right: 0,
                backgroundColor: "#212121",
                boxShadow: "inset 0 2px 0px 0px rgba(0, 0, 0, 0.2)",
              }}
            />
          </tr>
        </thead>
        <tbody className="bg-transparent">
          {borrowMarkets.map((item, index, arr) => (
            <tr
              key={index}
              onClick={() => goToDetail(item)}
              style={
                index === arr.length - 1
                  ? {
                      borderBottomLeftRadius: "8px",
                      borderBottomRightRadius: "8px",
                    }
                  : undefined
              }
              className={`last:border-b-0 text-[12px] cursor-pointer  ${
                index % 2 === 0 ? "bg-transparent" : "dark:bg-[#191919]"
              }`}
            >
              <BorrowMoreTableRow
                key={index}
                updateInfo={updateInfo}
                item={item}
                index={index}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default BorrowMoreTable;
