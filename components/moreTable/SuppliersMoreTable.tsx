"use client";

import React, { useState } from "react";
import TableHeaderCell from "./MoreTableHeader";
import Pagination from "../pagination/Pagination";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTokenMillion from "../tools/formatTokenMillion";
import { IMarketUserProps } from "@/types";
import { zeroBigInt } from "@/utils/const";
import { formatAddress, formatTokenValue } from "@/utils/utils";

const SuppliersMoreTable: React.FC<IMarketUserProps> = ({
  marketUsers,
  item,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  let showList = marketUsers
    ? marketUsers.filter(
        (marketUser) => marketUser.collateral_amount > zeroBigInt
      )
    : [];

  const totalSupply = showList.reduce(
    (memo, showItem) => (memo += showItem.collateral_amount),
    zeroBigInt
  );

  if (totalSupply > zeroBigInt) {
    showList.map((showItem) => {
      showItem.collateral_percent =
        (formatTokenValue(showItem.collateral_amount, item.inputToken.id) *
          100) /
        formatTokenValue(totalSupply, item.inputToken.id);
    });

    showList = showList.sort(
      (item1, item2) => item2.collateral_percent - item1.collateral_percent
    );
  }

  // Calculate the current page data slice
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = showList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h1 className="text-[20px] font-semibold mb-8">Suppliers</h1>
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
            className="bg-[#212121] h-20  text-white text-sm "
            style={{ boxShadow: "inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)" }}
          >
            <tr>
              <th className="w-[300px] p-6">
                <TableHeaderCell title="Wallet" infoText="" />
              </th>
              <th className="w-[300px] p-6">
                <div className="flex justify-start">
                  <TableHeaderCell
                    title="Supply"
                    infoText="The total amount of tokens currently lent in the given market."
                  />
                </div>
              </th>
              <th className="w-[100px] p-6">
                <div className="flex justify-center">
                  <TableHeaderCell title="Share" infoText="" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent">
            {currentPageData.map((showItem, index, arr) => (
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
                  <div className="items-center  h-full flex justify-start">
                    <span
                      // style={{ backgroundColor: item.allocationColor }}
                      className="w-[20px] h-[20px] rounded-full mr-3"
                    />
                    <span>{formatAddress(showItem.user_address)}</span>
                  </div>
                </td>

                <td className="p-6">
                  <div className="flex justify-start items-center gap-2 ml-3">
                    <FormatTokenMillion
                      value={formatTokenValue(
                        showItem.collateral_amount,
                        item.inputToken.id
                      )}
                      token={item.inputToken.id}
                      totalValue={0}
                    />
                  </div>
                </td>

                <td className="p-6">
                  <div className="flex gap-1 justify-center">
                    <FormatPourcentage
                      value={showItem.collateral_percent}
                      multiplier={1}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full text-[14px] flex justify-start py-10 px-6">
          <Pagination
            totalItems={showList.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SuppliersMoreTable;
