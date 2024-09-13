"use client";

import React from "react";
import { useAccount } from "wagmi";
import { formatEther, formatUnits } from "ethers";
import { BorrowMarket } from "@/types";
import TableHeaderCell from "./MoreTableHeader";
import ButtonDialog from "../buttonDialog/buttonDialog";
import IconToken from "../token/IconToken";
import { DetailEarnData } from "@/types/detailEarnData";
import FormatTokenMillion from "../tools/formatTokenMillion";
import FormatTwoPourcentage from "../tools/formatTwoPourcentage";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import FormatPourcentage from "../tools/formatPourcentage";
import { tokens } from "@/utils/const";

interface Props {
  item: BorrowMarket;
}

const PositionMoreTable: React.FC<Props> = ({ item }) => {
  const { address: userAddress } = useAccount();

  const collateralToken =
    tokens[item.marketParams.collateralToken.toLowerCase()].toUpperCase();
  const loanToken =
    tokens[item.marketParams.loanToken.toLowerCase()].toUpperCase();

  const lltv2 =
    item.marketParams.isPremiumMarket &&
    item.marketParams.categoryLltv.length > 0
      ? Number(
          formatEther(
            item.marketParams.categoryLltv[
              item.marketParams.categoryLltv.length - 1
            ]
          )
        )
      : null;

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
      <h1 className="text-2xl mt-16 mb-8">Open a position</h1>
      <table className="w-full text-sm text-left   border border-gray-800 ">
        <thead
          className="bg-[#212121] h-20  text-xs "
          style={{
            boxShadow: "inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          <tr className="rounded-t-lg">
            <th style={{ width: "200px" }} className="rounded-tl-lg">
              <TableHeaderCell
                title="Collateral"
                infoText="The token(s) that borrowers must lock in order to borrow funds."
              />
            </th>
            <th style={{ width: "200px" }}>
              <div className="flex justify-start">
                <TableHeaderCell title="Loan" infoText="" />
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
                <TableHeaderCell title="1D Interest" infoText="" />{" "}
              </div>
            </th> */}
            {/* <th style={{ width: "200px" }}>
              <div className="flex justify-start">
                <TableHeaderCell title="Vault Listing" infoText="" />
              </div>
            </th> */}
            {userAddress && <th style={{ width: "100px" }}></th>}
          </tr>
        </thead>
        <tbody className="bg-transparent ">
          <tr className="last:border-b-0 text-[12px] dark:bg-[#191919] cursor-pointer">
            <td className="py-4  items-center h-full ">
              <div className="flex gap-1 justify-start items-center gap-2 pl-4">
                <div className="mr-2 w-8 h-8">
                  <IconToken tokenName={collateralToken} />
                </div>
                <FormatTokenMillion
                  value={Number(formatUnits(item.totalSupply))}
                  totalValue={Number(formatUnits(item.totalSupply))}
                  token={collateralToken}
                />
              </div>
            </td>

            <td className="py-4  items-center h-full ">
              <div className="flex gap-1 justify-start items-center gap-2">
                <div className="mr-2 w-8 h-8">
                  <IconToken tokenName={loanToken} />
                </div>
                <FormatTokenMillion
                  value={Number(formatUnits(item.totalBorrow))}
                  totalValue={Number(formatUnits(item.totalBorrow))}
                  token={loanToken}
                  totalDanger={true}
                />
              </div>
            </td>

            <td className="py-4 px-6 items-center flex  ">
              <div className=" flex justify-start w-full py-4 ">
                <FormatTwoPourcentage
                  value={Number(formatEther(item.lltv))}
                  value2={lltv2}
                />
              </div>
            </td>

            {/* <td className="py-4 px-6  items-center justify-start h-full ">
                <div className="flex gap-1 justify-start">
                  {" "}
                  <FormatPourcentage value={item.unsecuredAPY} />{" "}
                </div>
              </td> */}

            {/* <td className="py-4 px-6  items-center  h-full flex justify-start">
                <div className="mr-2 w-8 h-8 py-2">
                  <IconToken tokenName="usdt" />
                </div>
              </td> */}

            {userAddress && (
              <td className="py-4 px-6  items-center justify-end h-full">
                <div onClick={(event) => event.stopPropagation()}>
                  <ButtonDialog color="secondary" buttonText="Borrow">
                    {(closeModal) => (
                      <>
                        <div className=" w-full h-full">
                          <VaultBorrow item={item} closeModal={closeModal} />
                        </div>
                      </>
                    )}
                  </ButtonDialog>
                </div>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default PositionMoreTable;
