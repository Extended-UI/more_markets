import React from "react";
import SuppliersMoreTable from "../moreTable/SuppliersMoreTable";
import BorrowersMoreTable from "../moreTable/BorrowersMoreTable";
import { IMarketUserProps } from "@/types";
// import LiquidationInfo from "./LiquidationInfo";

const ActivityBorrowDetail: React.FC<IMarketUserProps> = ({
  marketUsers,
  item,
}) => {
  return (
    <div className="flex w-full flex-col">
      <h1 className="text-[30px] font-semibold mt-16 mb-8">Activity</h1>
      <div className="flex flex-col w-full">
        <SuppliersMoreTable item={item} marketUsers={marketUsers} />
        <BorrowersMoreTable item={item} marketUsers={marketUsers} />
        {/* <LiquidationInfo /> */}
      </div>
    </div>
  );
};

export default ActivityBorrowDetail;
