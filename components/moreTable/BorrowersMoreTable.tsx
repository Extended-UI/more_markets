"use client";

import React from "react";
import { DetailEarnData } from "@/types/detailEarnData";
import TableHeaderCell from "./MoreTableHeader";
import usePagination from "@/hooks/usePagination";
import Pagination from "../pagination/Pagination";
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
    <div>
      <h1 className="text-[20px] font-semibold mb-8 mt-16">Borrowers</h1>
    <div
      className="rounded-2xl table-wrapper more-table"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        position: "relative",
      }}
    >
      <table className="w-full rounded-2xl text-sm text-left table overflow-x-scroll">
        <thead
          className="bg-[#212121] h-20 text-white text-xs "
          style={{ boxShadow: "inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)" }}
        >
          <tr >
            <th style={{ width: "300px" }} className="p-6">
              <TableHeaderCell title="Wallet" infoText="" />
            </th>
            <th style={{ width: "200px" }} className="p-6">
              <div className="flex justify-start">
                <TableHeaderCell
                  title="Collateral"
                  infoText="The token(s) that borrowers must lock in order to borrow funds."
                />
              </div>
            </th>
            <th style={{ width: "200px" }} className="p-6">
              <div className="flex justify-start">
                <TableHeaderCell title="Loan" infoText="" />
              </div>
            </th>
            <th style={{ width: "200px" }} className="p-6">
              <div className="flex justify-start">
                <TableHeaderCell title="Health Factor" infoText="" />
              </div>
            </th>
            <th style={{ width: "100px" }} className="p-6">
              <div className="flex justify-start">
                <TableHeaderCell title="Share" infoText="" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-transparent">
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
              className={`last:border-b-0 text-[14px]  cursor-pointer ${
                index % 2 === 0 ? "bg-transparent" : "dark:bg-[#191919]"
              }`}
            >
              <td className="p-6">
                <span
                  style={{ backgroundColor: item.allocationColor }}
                  className={`w-5 h-5  rounded-full mr-2`}
                ></span>
                <span>0x1234...xxyz</span>
              </td>

              <td className="py-4">
                <div className="flex p-6 justify-start items-center gap-2 ml-3">
                  <FormatPrice
                    value={item.supplyAmount}
                    token={item.supplyCurrency}
                  ></FormatPrice>
                </div>
              </td>

              <td className="py-4">
                <div className="flex p-6 justify-start items-center gap-2 ml-3">
                  <FormatPrice
                    value={item.supplyAmount}
                    token={item.supplyCurrency}
                  ></FormatPrice>
                </div>
              </td>

              <td className="p-6">
                <div className="flex gap-1 justify-start ml-3">
                  <div>{item.unsecuredAPY}</div>
                </div>
              </td>

              <td className="p-6">
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
      <div className="w-full text-[14px] flex justify-start py-10 px-6">
        <Pagination totalItems={tableData.length}></Pagination>
      </div>
    </div>
    </div>
  );
};
export default BorrowersMoreTable;
