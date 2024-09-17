import React from "react";
import { useAccount } from "wagmi";
import IconToken from "../token/IconToken";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import ButtonDialog from "../buttonDialog/buttonDialog";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTokenMillion from "../tools/formatTokenMillion";
import FormatTwoPourcentage from "../tools/formatTwoPourcentage";
import { BorrowMarket } from "@/types";
import { formatTokenValue, getPremiumLltv } from "@/utils/utils";

interface BorrowMoreTableRowProps {
  index: number;
  item: BorrowMarket;
  updateInfo: (marketId: string) => void;
}

const BorrowMoreTableRow: React.FC<BorrowMoreTableRowProps> = ({
  item,
  index,
  updateInfo,
}) => {
  const { address: userAddress } = useAccount();

  const totalSupply = BigInt(item.totalSupply);
  const utilization =
    totalSupply == BigInt(0)
      ? 0
      : Number((BigInt(item.totalBorrow) * BigInt(100)) / totalSupply);

  return (
    <>
      <td className="py-4 px-6 items-center h-full">
        <div className="flex items-center">
          <IconToken
            className="mr-2 w-6 h-6"
            tokenName={item.inputToken.id}
            showSymbol={true}
          />
        </div>
      </td>
      <td className="py-4 px-6 items-center h-full  ">
        <div className="flex items-center">
          <IconToken
            className="mr-2 w-6 h-6"
            tokenName={item.borrowedToken.id}
            showSymbol={true}
          />
        </div>
      </td>
      <td className="py-4  items-center h-full ">
        <div className="flex gap-1 justify-start">
          <FormatTwoPourcentage
            value={formatTokenValue(BigInt(item.lltv), "", 18)}
            value2={getPremiumLltv(item.marketParams)}
          />
        </div>
      </td>
      <td className="py-4 px-6 items-center h-full">
        <div className="flex justify-start">
          <FormatPourcentage value={"N/A"} />
        </div>
      </td>
      <td className="py-4 px-6 items-center h-full">
        <div className="flex">
          <FormatPourcentage value={utilization / 100} />
        </div>
      </td>
      <td className="py-4 px-6 items-center   h-full ">
        <div className="flex justify-start">
          <IconToken
            className="mr-2 mt-1 w-6 h-6"
            tokenName={item.borrowedToken.id}
          />
          <FormatTokenMillion
            value={formatTokenValue(
              item.marketInfo.totalSupplyAssets -
                item.marketInfo.totalBorrowAssets,
              item.borrowedToken.id
            )}
            token={item.borrowedToken.id}
            totalValue={0}
          />
        </div>
      </td>
      {userAddress && (
        <td
          className="py-4 px-6 items-center justify-end h-full"
          style={{
            paddingRight: 10,
            right: 0,
            backgroundColor: `${index % 2 === 0 ? "#141414" : "#191919"}`,
          }}
        >
          <div onClick={(event) => event.stopPropagation()}>
            <ButtonDialog color="secondary" buttonText="Borrow">
              {(closeModal) => (
                <div className="w-full h-full">
                  <VaultBorrow item={item} updateInfo={updateInfo} closeModal={closeModal} />
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
