import millify from "millify";
import InfoDetailGrey from "./InfoDetailGrey";
import { BorrowMarket } from "@/types";
import { formatTokenValue, getTokenInfo, getUtilization } from "@/utils/utils";

interface Props {
  item: BorrowMarket;
}

const InfosBorrowDetails: React.FC<Props> = ({ item }) => {
  const totalSupply = item.marketInfo.totalSupplyAssets;
  const totalBorrow = item.marketInfo.totalBorrowAssets;
  const borrowToken = getTokenInfo(item.borrowedToken.id);

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
          {/* <span className="text-[#888888] font-[600]">$</span> */}
          {millify(formatTokenValue(totalSupply, item.borrowedToken.id), {
            precision: 1,
          }) +
            " " +
            borrowToken.symbol}
        </InfoDetailGrey>
        <InfoDetailGrey
          title="Total Borrow"
          infoText="The total amount of tokens currently lent in the given market."
          className="flex-1 m-2 min-w-[220px]"
        >
          {/* <span className="text-[#888888] font-[600]">$</span> */}
          {millify(formatTokenValue(totalBorrow, item.borrowedToken.id), {
            precision: 1,
          }) +
            " " +
            borrowToken.symbol}
          <span className="text-secondary text-[14px] ml-4">
            ({getUtilization(totalSupply, totalBorrow)}%)
          </span>
        </InfoDetailGrey>
        <InfoDetailGrey
          title="Available Liquidity"
          infoText="The total value available for withdrawal during the current epoch."
          className="flex-1 m-2 min-w-[180px]"
        >
          {/* <span className="text-[#888888] font-[600]">$</span> */}
          {millify(
            formatTokenValue(totalSupply - totalBorrow, item.borrowedToken.id),
            {
              precision: 1,
            }
          ) +
            " " +
            borrowToken.symbol}
        </InfoDetailGrey>
        <InfoDetailGrey
          title="1D Borrow APY"
          infoText="The average annualized rate that borrowers paid over the trailing 24-hour period."
          className="flex-1 m-2 mr-0 min-w-[180px]"
        >
          {(item.borrow_apr * 100).toFixed(2)} %
          {/* <span className="text-[#888888] font-[600]">%</span> */}
        </InfoDetailGrey>
      </div>
    </div>
  );
};

export default InfosBorrowDetails;
