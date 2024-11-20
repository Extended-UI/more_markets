import React from "react";
import { useAccount } from "wagmi";
import IconToken from "../token/IconToken";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import ButtonDialog from "../buttonDialog/buttonDialog";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTokenMillion from "../tools/formatTokenMillion";
import FormatTwoPourcentage from "../tools/formatTwoPourcentage";
import { BorrowPosition, IBorrowMarketProp } from "@/types";
import HoverCardComp from "../hoverCard/HoverCard";
import {
  formatTokenValue,
  getPremiumLltv,
  getAvailableLiquidity,
} from "@/utils/utils";

interface Prop extends IBorrowMarketProp {
  index: number;
}

const BorrowMoreTableRow: React.FC<Prop> = ({ item, index, updateInfo }) => {
  const { address: userAddress } = useAccount();

  const totalSupply = item.marketInfo.totalSupplyAssets;
  const utilization =
    totalSupply == BigInt(0)
      ? 0
      : Number((item.marketInfo.totalBorrowAssets * BigInt(1e4)) / totalSupply);

  return (
    <>
      <td className="p-6">
        <div className="flex items-center">
          <IconToken
            className="mr-3 w-8 h-8"
            tokenName={item.inputToken.id}
            showSymbol={true}
          />
        </div>
      </td>
      <td className="p-6">
        <div className="flex items-center">
          <IconToken
            className="mr-3 w-8 h-8"
            tokenName={item.borrowedToken.id}
            showSymbol={true}
          />
        </div>
      </td>
      <td className="p-6">
        <div className="flex gap-1 justify-start">
          <FormatTwoPourcentage
            value={formatTokenValue(item.lltv, "", 18)}
            value2={getPremiumLltv(item.marketParams)}
          />
        </div>
      </td>
      <td className="p-6">
        <div className="flex justify-start items-center">
          <div className="mr-3">
            <FormatPourcentage value={item.borrow_apr} />
          </div>
          {/* <HoverCardComp apy={item.netAPY} /> */}
        </div>
      </td>
      <td className="p-6">
        <div className="flex">
          <FormatPourcentage value={utilization / 100} multiplier={1} />
        </div>
      </td>
      <td className="p-6">
        <div className="flex justify-start">
          <IconToken
            className="mr-3 w-8 h-8"
            tokenName={item.borrowedToken.id}
          />
          <FormatTokenMillion
            value={getAvailableLiquidity(
              item.marketInfo,
              item.borrowedToken.id
            )}
            token={item.borrowedToken.id}
            totalValue={0}
            inTable={true}
          />
        </div>
      </td>
      {userAddress && (
        <td
          className="px-6 py-4 items-center justify-end"
          style={{
            paddingRight: 10,
            right: 0,
            backgroundColor: `${index % 2 === 0 ? "#141414" : "#191919"}`,
          }}
        >
          <div onClick={(event) => event.stopPropagation()}>
            <ButtonDialog color="secondary" buttonText="Borrow">
              {(closeModal) => (
                <div className="w-full">
                  <VaultBorrow
                    item={item as BorrowPosition}
                    updateInfo={updateInfo}
                    closeModal={closeModal}
                  />
                </div>
              )}
            </ButtonDialog>
          </div>
        </td>
      )}
    </>
  );
};

export default BorrowMoreTableRow;
