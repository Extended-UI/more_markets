import React from "react";
import InfoDetailGrey from "./InfoDetailGrey";
import InfoDetail from "./InfoDetail";
import { InvestmentData } from "@/types";

interface Props {
  vault: InvestmentData;
  totalBorrow: number;
}

const InfosEarnDetails: React.FC<Props> = ({ vault, totalBorrow }) => {
  return (
    <div className="flex w-full flex-col overflow-visible">
      <div
        className="flex w-full overflow-x-auto overflow-visible"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", // Works in Firefox
          msOverflowStyle: "none", // Works in IE and Edge
          width: "calc(100% + 2rem)",
          position: "relative",
          overflow: "visible",
          left: "0",
        }}
      >
        <InfoDetailGrey
          title="Total Deposit"
          infoText="The total amount of tokens that have been deposited into the vault and made available to borrowers for loans."
          className="flex-1 m-2  min-w-[200px]"
        >
          <span className="text-[#888888] font-[600] ">$</span>{" "}
          <span>{vault.totalDeposits.toLocaleString()}</span>
        </InfoDetailGrey>
        <InfoDetailGrey
          title="Available Liquidity"
          infoText="The total value available for withdrawal during the current epoch."
          className="flex-1 m-2  min-w-[200px]"
        >
          <span className="text-[#888888] font-[600] ">$</span>{" "}
          <span>{(vault.totalDeposits - totalBorrow).toLocaleString()}</span>{" "}
        </InfoDetailGrey>
        <InfoDetailGrey
          title="Total 7D APY"
          infoText=""
          className="flex-1 m-2  min-w-[200px]"
        >
          <span>{"N/A"}</span>
          {/* <span className="text-[#888888] font-[600] ">%</span> */}
        </InfoDetailGrey>
        {/* <InfoDetailGrey
          title="Utilization"
          infoText=""
          className="flex-1 m-2  min-w-[200px]"
        >
          <span>89.82</span>
          <span className="text-[#888888] font-[600] ">%</span>
        </InfoDetailGrey> */}
      </div>
      {/* <div
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
          title="Credora Min/Avg"
          className="flex-1 m-2  min-w-[200px]"
        >
          <span className=" font-[600] ">BBB/AA</span>{" "}
        </InfoDetail>
        <InfoDetail
          title="Unsecured Borrow"
          className="flex-1 m-2  min-w-[200px]"
        >
          <span className="text-[#888888] font-[600] ">$</span>
          <span>194.7k</span>{" "}
        </InfoDetail>
        <InfoDetail
          title="Unsecured Borrow APY"
          className="flex-1 m-2  min-w-[200px]"
        >
          <span>17.1</span>
          <span className="text-[#888888] font-[600] ">%</span>
        </InfoDetail>
        <InfoDetail
          title="Performance APY"
          className="flex-1 m-2  min-w-[200px]"
        >
          <span>20</span>
          <span className="text-[#888888] font-[600] ">%</span>
        </InfoDetail>
      </div> */}
    </div>
  );
};

export default InfosEarnDetails;
