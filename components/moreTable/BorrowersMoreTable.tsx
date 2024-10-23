"use client";

import React, { useEffect, useState } from "react";
import FormatPrice from "../tools/formatPrice";
import TableHeaderCell from "./MoreTableHeader";
import usePagination from "@/hooks/usePagination";
import Pagination from "../pagination/Pagination";
import FormatPourcentage from "../tools/formatPourcentage";
import { oraclePriceScale } from "@/utils/const";
import { getTokenPairPrice } from "@/utils/contract";
import { IMarketUser, IMarketUserProps } from "@/types";
import { formatAddress, formatTokenValue, getTokenInfo } from "@/utils/utils";

const BorrowersMoreTable: React.FC<IMarketUserProps> = ({
  marketUsers,
  item,
}) => {
  const [showList, setShowList] = useState<IMarketUser[]>([]);

  useEffect(() => {
    const getPrice = async () => {
      const pairPrice = await getTokenPairPrice(item.marketParams.oracle);

      let _showList = marketUsers
        ? marketUsers.filter(
            (marketUser) => marketUser.borrow_amount > BigInt(0)
          )
        : [];

      const totalBorrow = _showList.reduce(
        (memo, showItem) => (memo += showItem.borrow_amount),
        BigInt(0)
      );

      if (totalBorrow > BigInt(0)) {
        const collateralToken = getTokenInfo(item.inputToken.id).decimals;
        const borrowToken = getTokenInfo(item.borrowedToken.id).decimals;
        const isBig = collateralToken >= borrowToken;
        const decimalsPow = BigInt(
          10 **
            (isBig
              ? collateralToken - borrowToken
              : borrowToken - collateralToken)
        );
        _showList.map((showItem) => {
          showItem.borrow_percent =
            (formatTokenValue(showItem.borrow_amount, item.borrowedToken.id) *
              100) /
            formatTokenValue(totalBorrow, item.borrowedToken.id);

          const factorVal =
            (showItem.collateral_amount *
              pairPrice *
              BigInt(100) *
              (isBig ? BigInt(1) : decimalsPow)) /
            showItem.borrow_amount /
            oraclePriceScale /
            (isBig ? decimalsPow : BigInt(1));
          showItem.health_factor =
            factorVal > BigInt(0) ? 1e4 / Number(factorVal) : 0;
        });

        console.log(_showList);
        setShowList(
          _showList.sort(
            (item1, item2) => item2.borrow_percent - item1.borrow_percent
          )
        );
      }
    };

    getPrice();
  }, [item, marketUsers]);

  const itemsPerPage = 5;
  const { currentPage } = usePagination(showList.length, itemsPerPage);

  // Calculate the current page data slice
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = showList.slice(startIndex, startIndex + itemsPerPage);

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
            <tr>
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
                  <span
                    // style={{ backgroundColor: item.allocationColor }}
                    className={`w-5 h-5  rounded-full mr-2`}
                  ></span>
                  <span>{formatAddress(showItem.user_address)}</span>
                </td>

                <td className="py-4">
                  <div className="flex p-6 justify-start items-center gap-2 ml-3">
                    <FormatPrice
                      value={formatTokenValue(
                        showItem.collateral_amount,
                        item.inputToken.id
                      )}
                      token={getTokenInfo(item.inputToken.id).symbol}
                    />
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex p-6 justify-start items-center gap-2 ml-3">
                    <FormatPrice
                      value={formatTokenValue(
                        showItem.borrow_amount,
                        item.borrowedToken.id
                      )}
                      token={getTokenInfo(item.borrowedToken.id).symbol}
                    />
                    x
                  </div>
                </td>

                <td className="p-6">
                  <div className="flex gap-1 justify-start ml-3">
                    <div>{showItem.health_factor.toFixed(2)} %</div>
                  </div>
                </td>

                <td className="p-6">
                  <div className="flex gap-1 justify-start ml-3">
                    <FormatPourcentage
                      value={showItem.borrow_percent}
                      multiplier={1}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full text-[14px] flex justify-start py-10 px-6">
          <Pagination totalItems={showList.length} />
        </div>
      </div>
    </div>
  );
};
export default BorrowersMoreTable;
