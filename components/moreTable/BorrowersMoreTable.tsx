"use client";

import React from "react";
import { DetailEarnData } from "@/types/detailEarnData";
import TableHeaderCell from "./MoreTableHeader";
import usePagination from "@/hooks/usePagination";
import Pagination from "../pagination/Pagination";
import FormatNumber from "../tools/formatNumber";
import FormatPrice from "../tools/formatPrice";
import FormatPourcentage from "../tools/formatPourcentage";

interface Props {}

const BorrowersMoreTable: React.FC<Props> = () => {
  const tableData: DetailEarnData[] = [
    {
      allocationColor: "orange",
      supplyAmount: 3288.62,
      supplyCurrency: "USDC",
      supplyValue: 1.96,
      collateral: ["usdc", "btc", "add", "ada"],
      liquidationLTV: 90,
      liquidationLTV2: 130,
      credoraRating: "CCC+ / BBB",
      unsecuredBorrowAmount: 7890.12,
      unsecuredBorrowValue: 4.98,
      unsecuredAPY: 16.8,
    },
    {
      allocationColor: "green",
      supplyAmount: 5432.1,
      supplyCurrency: "USDT",
      supplyValue: 3.25,
      collateral: ["usdc", "btc", "add", "ada", "ant"],
      liquidationLTV: 85,
      liquidationLTV2: 130,
      credoraRating: "BB+ / AA-",
      unsecuredBorrowAmount: 6543.21,
      unsecuredBorrowValue: 3.67,
      unsecuredAPY: 13.5,
    },
    {
      allocationColor: "yellow",
      supplyAmount: 7654.32,
      supplyCurrency: "USDA",
      supplyValue: 1.55,
      collateral: ["usdc", "btc", "add", "ada"],
      liquidationLTV: 95,
      liquidationLTV2: 130,
      credoraRating: "CC+ / A-",
      unsecuredBorrowAmount: 4321.09,
      unsecuredBorrowValue: 2.45,
      unsecuredAPY: 17.5,
    },
    {
      allocationColor: "orange",
      supplyAmount: 3288.62,
      supplyCurrency: "USDC",
      supplyValue: 1.96,
      collateral: ["usdc", "btc", "add", "ada"],
      liquidationLTV: 90,
      liquidationLTV2: 130,
      credoraRating: "CCC+ / BBB",
      unsecuredBorrowAmount: 7890.12,
      unsecuredBorrowValue: 4.98,
      unsecuredAPY: 16.8,
    },
    {
      allocationColor: "green",
      supplyAmount: 5432.1,
      supplyCurrency: "USDT",
      supplyValue: 3.25,
      collateral: ["usdc", "btc", "add", "ada", "ant"],
      liquidationLTV: 85,
      liquidationLTV2: 130,
      credoraRating: "BB+ / AA-",
      unsecuredBorrowAmount: 6543.21,
      unsecuredBorrowValue: 3.67,
      unsecuredAPY: 13.5,
    },
    {
      allocationColor: "yellow",
      supplyAmount: 7654.32,
      supplyCurrency: "USDA",
      supplyValue: 1.55,
      collateral: ["usdc", "btc", "add", "ada"],
      liquidationLTV: 95,
      liquidationLTV2: 130,
      credoraRating: "CC+ / A-",
      unsecuredBorrowAmount: 4321.09,
      unsecuredBorrowValue: 2.45,
      unsecuredAPY: 17.5,
    },
  ];
  const itemsPerPage = 5;

  const { currentPage, totalPages, goToNextPage, goToPreviousPage } =
    usePagination(tableData.length, itemsPerPage);

  // Calculate the current page data slice
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = tableData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div
      className="overflow-x-auto relative rounded-[15px] mb-16 w-full"
      style={{
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        position: "relative",
        overflow: "visible",
      }}
    >
      <h1 className="text-2xl mt-16 mb-8">Borrowers</h1>
      <table className="w-full text-sm text-left   border border-gray-800 w-full ">
        <thead
          className="bg-[#212121] h-20  text-xs "
          style={{ boxShadow: "inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)" }}
        >
          <tr className="rounded-t-lg">
            <th style={{ width: "300px" }} className="rounded-tl-lg">
              <TableHeaderCell title="Wallet" infoText="" />
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
              <div className="flex justify-start">
                <TableHeaderCell title="Loan" infoText="" />
              </div>
            </th>
            <th style={{ width: "200px" }}>
              <div className="flex justify-start">
                <TableHeaderCell title="Health Factor" infoText="" />
              </div>
            </th>
            <th style={{ width: "100px" }}>
              {" "}
              <div className="flex justify-start">
                <TableHeaderCell title="Share" infoText="" />{" "}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-transparent ">
          {currentPageData.map((item, index, arr) => (
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
              <td className="py-4 px-6  items-center  h-full flex justify-start">
                <span
                  style={{ backgroundColor: item.allocationColor }}
                  className={`w-5 h-5  rounded-full mr-2`}
                ></span>
                <span>0x1234...xxyz</span>
              </td>

              <td className="py-4  items-center h-full ">
                <div className="flex gap-1 justify-start items-center gap-2 ml-3">
                  <FormatPrice
                    value={item.supplyAmount}
                    token={item.supplyCurrency}
                  ></FormatPrice>
                </div>
              </td>

              <td className="py-4  items-center h-full ">
                <div className="flex gap-1 justify-start items-center gap-2 ml-3">
                  <FormatPrice
                    value={item.supplyAmount}
                    token={item.supplyCurrency}
                  ></FormatPrice>
                </div>
              </td>

              <td className=" items-center justify-start h-full ">
                <div className="flex gap-1 justify-start ml-3">
                  <div>{item.unsecuredAPY}</div>
                </div>
              </td>

              <td className=" items-center justify-start h-full ">
                <div className="flex gap-1 justify-start ml-3">
                  <FormatPourcentage
                    value={item.unsecuredAPY}
                  ></FormatPourcentage>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-start my-4 mr-4">
        <Pagination totalItems={tableData.length}></Pagination>
      </div>
    </div>
  );
};
export default BorrowersMoreTable;
