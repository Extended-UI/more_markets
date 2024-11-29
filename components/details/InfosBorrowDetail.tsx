import millify from "millify";
import InfoDetailGrey from "./InfoDetailGrey";
import { BorrowMarket } from "@/types";
import usePrice from "@/hooks/usePrice";
import { formatTokenValue, getTokenInfo, getUtilization } from "@/utils/utils";

interface Props {
  item: BorrowMarket;
}

const InfosBorrowDetails: React.FC<Props> = ({ item }) => {
  const { tokenPrice: collatTokenPrice } = usePrice(item.inputToken.id);
  const { tokenPrice: borrowTokenPrice } = usePrice(item.borrowedToken.id);

  const totalSupply = item.marketInfo.totalSupplyAssets;
  const totalBorrow = item.marketInfo.totalBorrowAssets;
  const supplyAmount = formatTokenValue(totalSupply, item.borrowedToken.id);
  const borrowAmount = formatTokenValue(totalBorrow, item.borrowedToken.id);
  // formatTokenValue(totalSupply - totalBorrow, item.borrowedToken.id)

  return (
    <div className="flex w-full flex-col overflow-visible">
      <div
        className="flex w-full overflow-x-auto"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", // Works in Firefox
          msOverflowStyle: "none", // Works in IE and Edge
          //width: "calc(100% + 2rem)",
          width: "100%",
          position: "relative",
          left: "0",
          overflow: "visible",
        }}
      >
        <InfoDetailGrey
          title="Total Deposit"
          infoText="The total amount of tokens that have been deposited into the vault and made available to borrowers for loans."
          className="flex-1 m-2 ml-0 min-w-[180px]"
        >
          <span className="text-[#888888] font-[600]">$ </span>
          {millify(borrowTokenPrice * supplyAmount, { precision: 2 })}
        </InfoDetailGrey>
        <InfoDetailGrey
          title="Total Borrow"
          infoText="The total amount of tokens currently lent in the given market."
          className="flex-1 m-2 min-w-[220px]"
        >
          <span className="text-[#888888] font-[600]">$ </span>
          {millify(borrowTokenPrice * borrowAmount, { precision: 2 })}
          <span className="text-secondary text-[14px] ml-4">
            ({getUtilization(totalSupply, totalBorrow)}%)
          </span>
        </InfoDetailGrey>
        <InfoDetailGrey
          title="Total Collateral"
          infoText=""
          className="flex-1 m-2 min-w-[180px]"
        >
          <span className="text-[#888888] font-[600]">$ </span>
          {millify(item.totalCollateral * collatTokenPrice, { precision: 2 })}
        </InfoDetailGrey>
        <InfoDetailGrey
          title="1D Borrow APY"
          infoText="The average annualized rate that borrowers paid over the trailing 24-hour period."
          className="flex-1 m-2 mr-0 min-w-[180px]"
        >
          {(item.borrow_apr * 100).toFixed(2)}
          <span className="text-[#888888] font-[600]">%</span>
        </InfoDetailGrey>
      </div>
    </div>
  );
};

export default InfosBorrowDetails;
