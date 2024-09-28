"use client";

import { InvestmentData } from "@/types";
import React from "react";
import Icon from "../FontAwesomeIcon";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDeposit from "../modal/deposit/VaultDeposit";
import TotalVolumeToken from "../token/TotalVolumeToken";
import IconToken from "../token/IconToken";
import ListIconToken from "../token/ListIconToken";
import { useRouter } from "next/navigation";
import { DetailEarnData } from "@/types/detailEarnData";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import TableHeaderCell from "./MoreTableHeader";
import FormatTokenMillion from "../tools/formatTokenMillion";
import FormatPourcentage from "../tools/formatPourcentage";

interface Props {}

const SuppliersMoreTable: React.FC<Props> = () => {
  const tableData: DetailEarnData[] = [
    {
      allocationColor: "orange",
      supplyAmount: 3288.62,
      supplyCurrency: "USDC",
      supplyValue: 1.96,
      collateral: ["usdc", "btc", "add", "ada"],
      liquidationLTV: 90,
      credoraRating: "CCC+ / BBB",
      unsecuredBorrowAmount: 7890.12,
      unsecuredBorrowValue: 4.98,
      unsecuredAPY: 16.8,
      allocation: 0,
      liquidationLTV2: 130,
    },
    {
      allocationColor: "green",
      supplyAmount: 5432.1,
      supplyCurrency: "USDT",
      supplyValue: 3.25,
      collateral: ["usdc", "btc", "add", "ada", "ant"],
      liquidationLTV: 85,
      credoraRating: "BB+ / AA-",
      unsecuredBorrowAmount: 6543.21,
      unsecuredBorrowValue: 3.67,
      unsecuredAPY: 13.5,
      allocation: 0,
      liquidationLTV2: 130,
    },
    {
      allocationColor: "yellow",
      supplyAmount: 7654.32,
      supplyCurrency: "USDA",
      supplyValue: 1.55,
      collateral: ["usdc", "btc", "add", "ada"],
      liquidationLTV: 95,
      credoraRating: "CC+ / A-",
      unsecuredBorrowAmount: 4321.09,
      unsecuredBorrowValue: 2.45,
      unsecuredAPY: 17.5,
      allocation: 0,
      liquidationLTV2: 130,
    },
  ];

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
          <tr className="">
            <th style={{ width: "300px" }} className="p-6">
              <TableHeaderCell title="Wallet" infoText="" />
            </th>
            <th style={{ width: "300px" }} className="p-6">
              <div className="flex justify-start">
                <TableHeaderCell
                  title="Supply"
                  infoText="The total amount of tokens currently lent in the given market."
                />
              </div>
            </th>
            <th style={{ width: "100px" }} className="p-6">
              <div className="flex justify-center">
                <TableHeaderCell title="Share" infoText="" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-transparent">
          {tableData.map((item, index, arr) => (
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
                    style={{ backgroundColor: item.allocationColor }}
                    className={`w-[20px] h-[20px]  rounded-full mr-3`}
                  ></span>
                  <span>0x1234...xxyz</span>
                </div>
              </td>

              <td className="p-6">
                <div className="flex justify-start items-center gap-2 ml-3">
                  <FormatTokenMillion
                    value={item.supplyAmount}
                    token={item.supplyCurrency}
                    totalValue={item.supplyValue}
                  />
                </div>
              </td>

              <td className="p-6">
                <div className="flex gap-1 justify-center">
                  <FormatPourcentage
                    value={item.unsecuredAPY}
                  ></FormatPourcentage>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};
export default SuppliersMoreTable;
