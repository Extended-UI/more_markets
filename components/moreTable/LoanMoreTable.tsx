"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import IconToken from "../token/IconToken";
import VaultAdd from "../modal/add/VaultAdd";
import TableHeaderCell from "./MoreTableHeader";
import VaultRepay from "../modal/repay/VaultRepay";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import ButtonDialog from "../buttonDialog/buttonDialog";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTokenMillion from "../tools/formatTokenMillion";
import PositionLTVDetail from "../details/PositionLTVDetail";
import FormatTwoPourcentage from "../tools/formatTwoPourcentage";
import VaultWithdrawBorrow from "../modal/withdrawBorrow/VaultWithdrawBorrow";
import { maxAprRangeGap, zeroBigInt } from "@/utils/const";
import { formatTokenValue, getPremiumLltv } from "@/utils/utils";
import { getPositions, getBorrowedAmount } from "@/utils/contract";
import { BorrowPosition, BorrowMarket, IBorrowMarketProps } from "@/types";

const LoanMoreTable: React.FC<IBorrowMarketProps> = ({
  borrowMarkets,
  updateInfo,
}) => {
  const { address: userAddress } = useAccount();
  const [borrowPositions, setBorrowPositions] = useState<BorrowPosition[]>([]);
  const router = useRouter();

  const goToDetail = (item: BorrowMarket) => {
    router.push("/borrow/" + item.id);
  };

  useEffect(() => {
    const initMarkets = async () => {
      if (userAddress && borrowMarkets && borrowMarkets.length > 0) {
        const marketIds = borrowMarkets.map((marketItem) => marketItem.id);
        const fetchedPositions = await getPositions(userAddress, marketIds);

        const promises = borrowMarkets.map(async (marketItem) => {
          const selPosition = fetchedPositions.find(
            (position) =>
              position.id.toLowerCase() == marketItem.id.toLowerCase()
          );

          if (selPosition) {
            return {
              ...marketItem,
              loan: await getBorrowedAmount(
                marketItem.id,
                selPosition.lastMultiplier,
                selPosition.borrowShares
              ),
              borrowShares: selPosition.borrowShares,
              collateral: selPosition.collateral,
              lastMultiplier: selPosition.lastMultiplier,
            } as BorrowPosition;
          }
        });

        const borrowPositionList = (await Promise.all(promises))
          .filter((item) => item !== undefined)
          .filter(
            (item) => item.collateral > zeroBigInt || item.loan > zeroBigInt
          );
        setBorrowPositions(borrowPositionList);
      } else {
        setBorrowPositions([]);
      }
    };

    initMarkets();
  }, [userAddress, borrowMarkets]);

  return (
    <>
      {userAddress && borrowPositions.length > 0 && (
        <>
          <h1 className="text-[30px] mb-8 mt-28 font-semibold">My Loans</h1>
          <div
            className="overflow-x-auto rounded-2xl table-wrapper mb-16 more-table"
            style={{
              overflowX: "auto",
              scrollbarWidth: "auto",
              msOverflowStyle: "none",
              position: "relative",
              //overflow: "visible",
            }}
          >
            <table className="w-full rounded-2xl text-sm text-left table overflow-x-scroll">
              <thead
                className="bg-[#212121] h-20 text-white text-xs"
                style={{
                  boxShadow: "inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)",
                }}
              >
                <tr className="rounded-t-lg">
                  <th className="pl-4">
                    <TableHeaderCell
                      title="Collateral"
                      infoText="The token(s) that borrowers must lock in order to borrow funds."
                    />
                  </th>
                  <th className="pl-4">
                    <div className="justify-start pr-8">
                      <TableHeaderCell
                        title="Loan"
                        infoText="The token(s) issued to borrowers as a loan against their collateral in the given market."
                      />
                    </div>
                  </th>
                  <th className="pl-4">
                    <div className="flex justify-start">
                      <TableHeaderCell
                        title="Liquidation LTV"
                        infoText="The standard maximum proportion of loan value to collateral value that borrowers must maintain in order to avoid liquidation."
                      />
                    </div>
                  </th>
                  <th className="pl-4">
                    <div className="flex justify-start">
                      <TableHeaderCell title="Max Borrow" infoText="" />
                    </div>
                  </th>
                  <th className="pl-4">
                    <div className="flex justify-start">
                      <TableHeaderCell
                        title="1D Borrow APY"
                        infoText="The average annualized rate that borrowers paid over the trailing 24-hour period."
                      />
                    </div>
                  </th>
                  <th className="pl-4">
                    <div className="flex justify-start">
                      <TableHeaderCell title="My LTV" infoText="" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-transparent">
                {borrowPositions.map((item, index, arr) => (
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
                    className={`last:border-b-0 text-[14px] border border-[#202020] cursor-pointer ${
                      index % 2 === 0 ? "bg-[#141414]" : "bg-[#191919]"
                    }`}
                  >
                    <td className="px-4 py-[12.5px] items-center gap-2">
                      <div className="flex gap-2 items-center justify-between">
                        <div className="flex items-center">
                          <IconToken
                            className="mr-3 w-8 h-8"
                            tokenName={item.inputToken.id}
                          />
                          <FormatTokenMillion
                            value={formatTokenValue(
                              item.collateral,
                              item.inputToken.id
                            )}
                            token={item.inputToken.id}
                            totalValue={0}
                            inTable={true}
                          />
                        </div>
                        <div
                          className="ml-8 flex gap-5"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <ButtonDialog color="secondary" buttonText="Add">
                            {(closeModal) => (
                              <div className="w-full h-full">
                                <VaultAdd
                                  item={item}
                                  closeModal={closeModal}
                                  updateInfo={updateInfo}
                                />
                              </div>
                            )}
                          </ButtonDialog>
                          <ButtonDialog color="grey" buttonText="Withdraw">
                            {(closeModal) => (
                              <div className="w-full h-full">
                                <VaultWithdrawBorrow
                                  item={item}
                                  closeModal={closeModal}
                                  updateInfo={updateInfo}
                                />
                              </div>
                            )}
                          </ButtonDialog>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-[12.5px] items-center gap-2">
                      <div className="flex gap-2 items-center justify-between">
                        <div className="flex items-center">
                          <IconToken
                            className="mr-3 w-8 h-8"
                            tokenName={item.borrowedToken.id}
                          />
                          <FormatTokenMillion
                            value={formatTokenValue(
                              item.loan,
                              item.borrowedToken.id
                            )}
                            token={item.borrowedToken.id}
                            totalValue={0}
                          />
                        </div>
                        <div
                          className="ml-8 flex gap-5"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <ButtonDialog
                            color="secondary"
                            buttonText="Borrow More"
                          >
                            {(closeModal) => (
                              <div className="w-full h-full">
                                <VaultBorrow
                                  item={item}
                                  onlyBorrow={true}
                                  updateInfo={updateInfo}
                                  closeModal={closeModal}
                                />
                              </div>
                            )}
                          </ButtonDialog>
                          <ButtonDialog color="grey" buttonText="Repay">
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
                      </div>
                    </td>
                    <td className="pl-4 items-center">
                      <div className="flex gap-1 justify-start">
                        <FormatTwoPourcentage
                          value={formatTokenValue(item.lltv, "", 18)}
                          value2={getPremiumLltv(item.marketParams)}
                        />
                      </div>
                    </td>
                    <td className="pl-4 items-center">
                      <div className="flex gap-1 justify-start">
                        <FormatTwoPourcentage
                          value={
                            formatTokenValue(item.lltv, "", 18) - maxAprRangeGap
                          }
                        />
                      </div>
                    </td>
                    <td className="pl-4 items-center">
                      <div className="flex justify-start items-center ml-3">
                        <div className="mr-3">
                          <FormatPourcentage value={item.borrow_apr} />
                        </div>
                        {/* <HoverCardComp apy={item.netAPY} /> */}
                      </div>
                    </td>
                    <td className="pl-4 items-center">
                      <PositionLTVDetail item={item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default LoanMoreTable;
