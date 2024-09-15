import React from "react";
import { formatUnits } from "ethers";
import { BorrowMarket } from "@/types";
import InfoDetailGrey from "./InfoDetailGrey";

interface Props {
  item: BorrowMarket;
}

const InfosBorrowDetails: React.FC<Props> = ({ item }) => {
  const totalSupply = BigInt(item.totalSupply);
  const utilization =
    totalSupply == BigInt(0)
      ? 0
      : Number((BigInt(item.totalBorrow) * BigInt(100)) / totalSupply);

  return (
    <div className="flex w-full flex-col overflow-visible">
      <div
        className="flex w-full overflow-x-auto"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", // Works in Firefox
          msOverflowStyle: "none", // Works in IE and Edge
          width: "calc(100% + 2rem)",
          position: "relative",
          left: "0",
          overflow: "visible",
        }}
      >
        <InfoDetailGrey
          title="Total Deposit"
          infoText="The total amount of tokens that have been deposited into the vault and made available to borrowers for loans."
          className="flex-1 m-2 min-w-[180px]"
        >
          <span className="text-[#888888] font-[600] ">$</span>{" "}
          <span className="">
            {Number(formatUnits(item.totalSupply)).toLocaleString()}
          </span>
        </InfoDetailGrey>
        <InfoDetailGrey
          title="Total Borrow"
          infoText="The total amount of tokens currently lent in the given market."
          className="flex-1 m-2 min-w-[220px]"
        >
          <span className="text-[#888888] font-[600] ">$</span>{" "}
          <span className="">
            {Number(formatUnits(item.totalBorrow)).toLocaleString()}
          </span>
          <span className="text-secondary text-[14px] ml-4">
            ({utilization}%)
          </span>{" "}
        </InfoDetailGrey>
        <InfoDetailGrey
          title="Available Liquidity"
          infoText="The total value available for withdrawal during the current epoch."
          className="flex-1 m-2 min-w-[180px]"
        >
          <span className="text-[#888888] font-[600] ">$</span>{" "}
          <span className="">
            {(
              Number(formatUnits(item.totalSupply)) -
              Number(formatUnits(item.totalBorrow))
            ).toLocaleString()}
          </span>
        </InfoDetailGrey>
        <InfoDetailGrey
          title="1D Borrow APY"
          infoText="The average annualized rate that borrowers paid over the trailing 24-hour period."
          className="flex-1 m-2 min-w-[180px]"
        >
          <span className="">{"N/A"}</span>
          {/* <span className="text-[#888888] font-[600] ">%</span> */}
        </InfoDetailGrey>
      </div>
      {/* <h1 className="text-2xl mt-16 mb-8">Open a position</h1>
      <div
        className="flex  w-full overflow-x-auto"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", // Works in Firefox
          msOverflowStyle: "none", // Works in IE and Edge
          width: "calc(100% + 2rem)",
          position: "relative",
          left: "0",
        }}
      >
        <InfoDetail
          title="Your Credora Rating"
          className="flex-1 m-2 min-w-[200px]"
        >
          <span className=" font-[600] ">BBB/AA</span>{" "}
        </InfoDetail>
        <InfoDetail
          title="Unsecured Loan Limit"
          className="flex-1 m-2 min-w-[200px]"
        >
          <span className="">17.1</span>
          <span className="text-[#888888] font-[600] ">%</span>
        </InfoDetail>
        <InfoDetail
          title="Your LiquidationLTV"
          className="flex-1 m-2 min-w-[200px]"
        >
          <span className="text-[#888888] font-[600] ">$</span>
          <span className="">194.7k</span>{" "}
        </InfoDetail>
        <InfoDetail
          title="1D Unsecured APY"
          className="flex-1 m-2 min-w-[200px]"
        >
          <span className="">20</span>
          <span className="text-[#888888] font-[600] ">%</span>
        </InfoDetail>
      </div> */}
    </div>
  );
};

export default InfosBorrowDetails;
