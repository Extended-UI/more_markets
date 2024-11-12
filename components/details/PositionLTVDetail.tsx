import { formatEther } from "ethers";
import usePrice from "@/hooks/usePrice";
import { BorrowPosition } from "@/types";
import { getPositionLtv, formatTokenValue } from "@/utils/utils";

interface Props {
  item: BorrowPosition;
}

const PositionLTVDetail: React.FC<Props> = ({ item }) => {
  const { tokenPrice: collateralPrice } = usePrice(item.inputToken.id);
  const { tokenPrice: borrowPrice } = usePrice(item.borrowedToken.id);

  const lltvVal = Number(formatEther(item.lltv * BigInt(1e2)));
  const loanAmount = formatTokenValue(item.loan, item.inputToken.id);
  const collateralAmount = formatTokenValue(
    item.collateral,
    item.borrowedToken.id
  );

  const positionLTV = getPositionLtv(
    collateralAmount,
    loanAmount,
    collateralPrice,
    borrowPrice
  );

  const isSafe = positionLTV <= lltvVal - 10;
  const bgColor = isSafe ? "#F58420" : "#C02E2D";

  return (
    <div className="flex justify-between items-center mx-3">
      <div className="w-[80px] mr-[20px]">
        <div style={{ color: bgColor }} className="text-[14px] mb-1">
          {positionLTV.toFixed(2)}%
        </div>
        <div className="text-[#888888] text-[14px]">Current LTV</div>
      </div>
      <div>
        <div className="relative bg-white w-[100px] h-[3px]">
          <div
            style={{
              backgroundColor: bgColor,
              width: `${positionLTV}%`,
            }}
            className="absolute h-[3px]"
          />
          <div
            style={{
              backgroundColor: bgColor,
              left: `${lltvVal}%`,
            }}
            className="absolute w-[1px] h-[12px] top-[-4px]"
          />
        </div>
      </div>
      <div className="w-[100px] ml-[20px]">
        <div className="text-[#E0DFE3] text-[14px] mb-1">
          {lltvVal.toFixed(2)}
          <span className="text-[#888888] text-[14px]">%</span>
        </div>
        <div className="text-[#888888] text-[14px] whitespace-nowrap">
          Liquidation LTV
        </div>
      </div>
    </div>
  );
};

export default PositionLTVDetail;
