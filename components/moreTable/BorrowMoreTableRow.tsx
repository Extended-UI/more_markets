import React from "react";
import { formatEther } from "ethers";
import TokenName from "../token/TokenName";
import FormatTwoPourcentage from "../tools/formatTwoPourcentage";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTokenMillion from "../tools/formatTokenMillion";
import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import { BorrowMarket } from "@/types";
import { tokens } from "@/utils/const";

interface BorrowMoreTableRowProps {
  item: BorrowMarket;
  index: number;
}

const BorrowMoreTableRow: React.FC<BorrowMoreTableRowProps> = ({
  item,
  index,
}) => {
  const totalSupply = BigInt(item.totalSupply);
  console.log(item.totalSupply, item.totalBorrow);
  const utilization =
    totalSupply == BigInt(0)
      ? 0
      : Number((BigInt(item.totalBorrow) * BigInt(100)) / totalSupply);

  return (
    <>
      <td className="py-4 px-6 items-center h-full">
        <TokenName token={item.inputToken.id} />
      </td>
      <td className="py-4 px-6 items-center h-full  ">
        <TokenName token={item.borrowedToken.id} />
      </td>
      <td className="py-4  items-center h-full ">
        <div className="flex gap-1 justify-start">
          <FormatTwoPourcentage
            value={Number(formatEther(BigInt(item.lltv)))}
            value2={
              item.marketParams.isPremiumMarket &&
              item.marketParams.categoryLltv.length > 0
                ? Number(
                    formatEther(
                      item.marketParams.categoryLltv[
                        item.marketParams.categoryLltv.length - 1
                      ]
                    )
                  )
                : null
            }
          />
        </div>
      </td>
      <td className="py-4 px-6 items-center h-full">
        <div className="flex justify-start">
          <FormatPourcentage value={0} />
        </div>
      </td>
      <td className="py-4 px-6 items-center h-full">
        <div className="flex">
          <FormatPourcentage value={utilization / 100} />
        </div>
      </td>
      <td className="py-4 px-6 items-center   h-full ">
        <div className="flex justify-start">
          <FormatTokenMillion
            value={Number(formatEther(item.totalSupply))}
            token={tokens[item.inputToken.id]}
            totalValue={Number(formatEther(item.totalSupply))}
          />
        </div>
      </td>
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
              <div className=" w-full h-full">
                <VaultBorrow item={item} closeModal={closeModal} />
              </div>
            )}
          </ButtonDialog>
        </div>
      </td>
    </>
  );
};

export default BorrowMoreTableRow;
