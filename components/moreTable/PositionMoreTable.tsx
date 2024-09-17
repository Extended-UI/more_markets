"use client";

import React from "react";
import { useAccount } from "wagmi";
import { formatUnits } from "ethers";
import IconToken from "../token/IconToken";
import TableHeaderCell from "./MoreTableHeader";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import ButtonDialog from "../buttonDialog/buttonDialog";
import FormatTokenMillion from "../tools/formatTokenMillion";
import FormatTwoPourcentage from "../tools/formatTwoPourcentage";
import { BorrowMarket } from "@/types";
import { getTokenInfo, getPremiumLltv, formatTokenValue } from "@/utils/utils";

interface Props {
  item: BorrowMarket;
  updateInfo: (marketId: string) => void;
}

const PositionMoreTable: React.FC<Props> = ({ item, updateInfo }) => {
  const { address: userAddress } = useAccount();

  const collateralToken = getTokenInfo(item.marketParams.collateralToken);
  const loanToken = getTokenInfo(item.marketParams.loanToken);

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
                  <IconToken tokenName={collateralToken.symbol} />
                </div>
                <FormatTokenMillion
                  value={formatTokenValue(
                    BigInt(item.totalSupply),
                    "",
                    collateralToken.decimals
                  )}
                  totalValue={0}
                  token={collateralToken.symbol}
                />
              </div>
            </td>

            <td className="py-4  items-center h-full ">
              <div className="flex gap-1 justify-start items-center gap-2">
                <div className="mr-2 w-8 h-8">
                  <IconToken tokenName={loanToken.symbol} />
                </div>
                <FormatTokenMillion
                  value={formatTokenValue(
                    BigInt(item.totalBorrow),
                    "",
                    loanToken.decimals
                  )}
                  totalValue={0}
                  token={loanToken.symbol}
                  totalDanger={true}
                />
              </div>
            </td>

            <td className="py-4 px-6 items-center flex  ">
              <div className=" flex justify-start w-full py-4 ">
                <FormatTwoPourcentage
                  value={formatTokenValue(BigInt(item.lltv), "", 18)}
                  value2={getPremiumLltv(item.marketParams)}
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
                      <div className=" w-full h-full">
                        <VaultBorrow
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
  );
};

export default PositionMoreTable;
