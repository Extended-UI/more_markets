"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import IconToken from "../token/IconToken";
import VaultAdd from "../modal/add/VaultAdd";
import TableHeaderCell from "./MoreTableHeader";
import VaultRepay from "../modal/repay/VaultRepay";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import ButtonDialog from "../buttonDialog/buttonDialog";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTokenMillion from "../tools/formatTokenMillion";
import FormatTwoPourcentage from "../tools/formatTwoPourcentage";
import VaultWithdrawBorrow from "../modal/withdrawBorrow/VaultWithdrawBorrow";
import { formatTokenValue, getPremiumLltv } from "@/utils/utils";
import { GraphPosition, BorrowPosition, BorrowMarket } from "@/types";

interface Props {
  positions: GraphPosition[];
  borrowMarkets: BorrowMarket[];
  updateInfo: (marketId: string) => void;
}

const LoanMoreTable: React.FC<Props> = ({
  positions,
  borrowMarkets,
  updateInfo,
}) => {
  const { address: userAddress } = useAccount();
  const [borrowPositions, setBorrowPositions] = useState<BorrowPosition[]>([]);

  useEffect(() => {
    const initMarkets = async () => {
      if (positions && borrowMarkets && borrowMarkets.length > 0) {
        const promises = borrowMarkets.map(async (marketItem) => {
          const selPositions = positions.filter(
            (position) => position.market.id == marketItem.id
          );

          if (selPositions.length > 0) {
            let totalLoan = BigInt(0);
            let totalCollateral = BigInt(0);

            for (const selPosition of selPositions) {
              if (selPosition.id.includes("-BORROWER-")) {
                for (const borrow of selPosition.borrows) {
                  totalLoan += BigInt(borrow.amount);
                }
              } else if (selPosition.id.includes("-COLLATERAL-")) {
                totalCollateral += BigInt(selPosition.balance);
              }
            }

            return {
              ...marketItem,
              loan: totalLoan,
              collateral: totalCollateral,
            } as BorrowPosition;
          }
        });

        const borrowMarketList = (await Promise.all(promises))
          .filter((item) => item !== undefined)
          .filter(
            (item) => item.collateral > BigInt(0) && item.loan > BigInt(0)
          );
        console.log(borrowMarketList, borrowMarketList.length);
        setBorrowPositions(borrowMarketList);
      }
    };

    initMarkets();
  }, [userAddress, positions, borrowMarkets]);

  return (
    <>
      {borrowPositions.length > 0 && (
        <>
          <h1 className="text-4xl mb-4">My Loans</h1>
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
                style={{
                  boxShadow: "inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)",
                }}
              >
                <tr className="rounded-t-lg">
                  <th style={{ width: "500px" }} className="rounded-tl-lg">
                    <TableHeaderCell
                      title="Collateral"
                      infoText="The token(s) that borrowers must lock in order to borrow funds."
                    />
                  </th>
                  <th style={{ width: "400px" }}>
                    <div className=" justify-start pr-8 ">
                      <TableHeaderCell title="Loan" infoText="" />
                    </div>
                  </th>
                  <th>
                    <div className="flex justify-start ">
                      <TableHeaderCell
                        title="Liquidation LTV"
                        infoText="The standard maximum proportion of loan value to collateral value that borrowers must maintain in order to avoid liquidation."
                      />
                    </div>
                  </th>
                  <th>
                    <div className="flex justify-start ">
                      <TableHeaderCell
                        title="1D Borrow APY"
                        infoText="The average annualized rate that borrowers paid over the trailing 24-hour period."
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-transparent">
                {borrowPositions.map((item, index, arr) => (
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
                    className={`last:border-b-0 text-[12px]  ${
                      index % 2 === 0 ? "bg-transparent" : "dark:bg-[#191919]"
                    }`}
                  >
                    <td className=" py-4 px-6 items-center h-full gap-2">
                      <div className="flex gap-2 items-center">
                        <div className="flex items-center">
                          <IconToken
                            className="mr-2 w-6 h-6"
                            tokenName={item.marketParams.collateralToken}
                          />
                        </div>
                        <FormatTokenMillion
                          value={formatTokenValue(
                            item.collateral,
                            item.marketParams.collateralToken
                          )}
                          token={item.marketParams.collateralToken}
                          totalValue={0}
                        />
                        <div className="ml-8"></div>
                        <ButtonDialog color="secondary" buttonText="Add">
                          {(closeModal) => (
                            <div className=" w-full h-full">
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
                            <div className=" w-full h-full">
                              <VaultWithdrawBorrow
                                item={item}
                                closeModal={closeModal}
                                updateInfo={updateInfo}
                              />
                            </div>
                          )}
                        </ButtonDialog>
                      </div>
                    </td>

                    <td className=" py-4 px-6 items-center h-full gap-2">
                      <div className="flex gap-2 items-center">
                        <IconToken
                          className="w-6 h-6"
                          tokenName={item.marketParams.loanToken}
                        />
                        <FormatTokenMillion
                          value={formatTokenValue(
                            item.loan,
                            item.marketParams.loanToken
                          )}
                          token={item.marketParams.loanToken}
                          totalValue={0}
                        />
                        <div className="ml-8"></div>
                        <ButtonDialog
                          color="secondary"
                          buttonText="Borrow More"
                        >
                          {(closeModal) => (
                            <div className=" w-full h-full">
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
                            <div className=" w-full h-full">
                              <VaultRepay
                                title="Repay"
                                token="USDC"
                                apy={14.1}
                                balance={473.18}
                                ltv="90% / 125%"
                                totalRepay={3289.62}
                                totalTokenAmount={1.96}
                                curator="Flowverse"
                                closeModal={closeModal}
                              />
                            </div>
                          )}
                        </ButtonDialog>
                      </div>
                    </td>

                    <td className="py-4 pl-4 items-center h-full ">
                      <div className="flex gap-1 justify-start">
                        <FormatTwoPourcentage
                          value={formatTokenValue(BigInt(item.lltv), "", 18)}
                          value2={getPremiumLltv(item.marketParams)}
                        />
                      </div>
                    </td>
                    <td className="py-4 items-center h-full   ">
                      <div className="flex justify-start ml-3">
                        <FormatPourcentage value={"N/A"} />
                      </div>
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
