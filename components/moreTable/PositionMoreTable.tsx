"use client";

import React from "react";
import { useAccount } from "wagmi";
import IconToken from "../token/IconToken";
import TableHeaderCell from "./MoreTableHeader";
import VaultRepay from "../modal/repay/VaultRepay";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import ButtonDialog from "../buttonDialog/buttonDialog";
import FormatTokenMillion from "../tools/formatTokenMillion";
import FormatTwoPourcentage from "../tools/formatTwoPourcentage";
import { getPremiumLltv, formatTokenValue } from "@/utils/utils";
import { IBorrowPositionProp } from "@/types";

const PositionMoreTable: React.FC<IBorrowPositionProp> = ({
  item,
  updateInfo,
}) => {
  const { address: userAddress } = useAccount();

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
      <div
        className="overflow-x-scroll  rounded-2xl  table-wrapper  mb-16"
        style={{
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          position: "relative",
        }}
      >
        <table className="w-full rounded-2xl text-sm text-left table overflow-x-scroll">
          <thead
            className="bg-[#212121] h-20  text-white text-xs"
            style={{ boxShadow: "inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)" }}
          >
            <tr className="">
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
          <tbody className="bg-transparent">
            <tr className="last:border-b-0 text-[12px] dark:bg-[#191919] cursor-pointer">
              <td className="py-4  items-center h-full">
                <div className="flex gap-1 justify-start items-center gap-2 pl-4">
                  <div className="mr-2 w-8 h-8">
                    <IconToken tokenName={item.inputToken.id} />
                  </div>
                  <FormatTokenMillion
                    value={formatTokenValue(
                      item.collateral,
                      item.inputToken.id
                    )}
                    totalValue={0}
                    token={item.inputToken.id}
                  />
                </div>
              </td>

              <td className="py-4 items-center h-full">
                <div className="flex gap-1 justify-start items-center gap-2">
                  <div className="mr-2 w-8 h-8">
                    <IconToken tokenName={item.borrowedToken.id} />
                  </div>
                  <FormatTokenMillion
                    value={formatTokenValue(item.loan, item.borrowedToken.id)}
                    totalValue={0}
                    token={item.borrowedToken.id}
                    totalDanger={true}
                  />
                </div>
              </td>

              <td className="py-4 px-6 items-center flex">
                <div className="flex justify-start w-full py-4">
                  <FormatTwoPourcentage
                    value={formatTokenValue(item.lltv, "", 18)}
                    value2={getPremiumLltv(item.marketParams)}
                  />
                </div>
              </td>

              {/* <td className="py-4 px-6 items-center justify-start h-full">
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
                <td className="py-4 px-6 items-center justify-end h-full">
                  <div
                    className="flex gap-4"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <ButtonDialog color="secondary" buttonText="Borrow More">
                      {(closeModal) => (
                        <div className="w-full h-full">
                          <VaultBorrow
                            item={item}
                            onlyBorrow={true}
                            closeModal={closeModal}
                            updateInfo={updateInfo}
                          />
                        </div>
                      )}
                    </ButtonDialog>
                    <ButtonDialog color="secondary" buttonText="Repay">
                      {(closeModal) => (
                        <div className="w-full h-full">
                          <VaultRepay
                            item={item}
                            closeModal={closeModal}
                            updateInfo={updateInfo}
                          />
                        </div>
                      )}
                    </ButtonDialog>
                  </div>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionMoreTable;
