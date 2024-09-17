"use client";

import React from "react";
import TableHeaderCell from "./MoreTableHeader";
import ListIconToken from "../token/ListIconToken";
import FormatTokenMillion from "../tools/formatTokenMillion";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTwoPourcentage from "../tools/formatTwoPourcentage";
import { VaultBreakdown } from "@/types";

interface Props {
  breakdowns: VaultBreakdown[];
}

const DetailEarnMoreTable: React.FC<Props> = ({ breakdowns }) => {
  return (
    <div
      className="overflow-x-auto relative rounded-[15px] mb-16"
      style={{
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        position: "relative",
        overflow: "visible",
      }}
    >
      <table className="w-full text-sm text-left   border border-gray-800 ">
        <thead
          className="bg-[#212121] h-20  text-xs "
          style={{ boxShadow: "inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)" }}
        >
          <tr className="rounded-t-lg">
            <th style={{ width: "140px" }} className="rounded-tl-lg  ">
              <div className="flex justify-start">
                <TableHeaderCell
                  title="Allocation"
                  infoText="The percentage of total deposits allocated to the given market."
                />
              </div>
            </th>
            <th style={{ width: "200px" }}>
              {" "}
              <div className="flex justify-start">
                <TableHeaderCell
                  title="Deposits"
                  infoText="The total amount of tokens currently lent in the given market."
                />
              </div>
            </th>
            <th style={{ width: "200px" }}>
              <div className="flex justify-start">
                <TableHeaderCell
                  title="Collateral"
                  infoText="The token(s) that borrowers must lock in order to borrow funds."
                />
              </div>
            </th>
            <th style={{ width: "200px" }}>
              {" "}
              <div className="flex justify-start">
                <TableHeaderCell
                  title="Liquidation LTV"
                  infoText="The standard maximum proportion of loan value to collateral value that borrowers must maintain in order to avoid liquidation."
                />{" "}
              </div>
            </th>
            {/* <th style={{ width: "200px" }}>
              {" "}
              <div className="flex justify-start">
                <TableHeaderCell
                  title="Credora Rating"
                  infoText="The weighted average and minimum S&P equivalent rating, issued by Credora for all premium borrowers across all markets in a vault. The rating represents the aggregate solvency of premium borrowers based on their holdings outside of MORE Markets."
                />{" "}
              </div>
            </th>
            <th style={{ width: "200px" }}>
              <div className="flex justify-start">
                <TableHeaderCell
                  title="Unsecured Borrow"
                  infoText="The total amount of credit (above the standard LTV)  issued by the given market to premium, rated borrowers."
                />
              </div>
            </th>
            <th style={{ width: "200px" }}>
              <div className="flex justify-start">
                <TableHeaderCell
                  title="Unsecured APY"
                  infoText="The annualized rate you earn specifically from premium borrowers that have borrowed above the standard LTV."
                />
              </div>
            </th> */}
          </tr>
        </thead>
        <tbody className="bg-transparent">
          {breakdowns.map((item, index, arr) => (
            <tr
              key={index}
              style={
                index === arr.length - 1
                  ? {
                      borderBottomLeftRadius: "8px",
                      borderBottomRightRadius: "8px",
                    }
                  : undefined
              }
              className={`last:border-b-0 text-[12px]  cursor-pointer ${
                index % 2 === 0 ? "bg-transparent" : "dark:bg-[#191919]"
              }`}
            >
              <td className="py-4 px-6 items-center h-full  ">
                <div className="flex justify-start ">
                  <FormatPourcentage value={item.allowcation / 100} />
                </div>
              </td>
              <td className="py-4  items-center h-full ">
                <div className="flex justify-start">
                  <FormatTokenMillion
                    value={item.supply}
                    token={item.supplyToken}
                    totalValue={0}
                  />
                </div>
              </td>
              <td className="py-4  items-center h-full">
                <div className="flex justify-start">
                  <ListIconToken
                    className="w-6 h-6 "
                    iconNames={[item.collateral]}
                  />
                </div>
              </td>

              <td className="py-4 px-6 items-center  ">
                <div className=" flex justify-start py-4 ">
                  {" "}
                  <FormatTwoPourcentage value={item.lltv} value2={item.lltv2} />
                </div>
              </td>

              {/* <td className="py-4  items-center h-full ">
                <div className="py-4 flex justify-start">{item.credora}</div>
              </td>

              <td className="py-4  items-center h-full ">
                <FormatTokenMillion
                  value={item.unsecuredBorrowAmount}
                  token={item.supplyCurrency}
                  totalValue={item.unsecuredBorrowValue}
                ></FormatTokenMillion>
              </td>

              <td className="py-4 px-6 items-center  h-full   ">
                <div className="flex justify-start">
                  <FormatPourcentage
                    value={item.unsecuredAPY}
                  ></FormatPourcentage>
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailEarnMoreTable;
