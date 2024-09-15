import React from "react";
import InfoDetailGrey from "./InfoDetailGrey";
import InfoDetail from "./InfoDetail";
import TotalVolumeToken from "../token/TotalVolumeToken";
import RatesGraphDetail from "./RatesGraphDetail";
import BIRGraphBorrowDetail from "./BIRGraphBorrowDetail";
import UnsecuredGraphBorrowDetail from "./UnsecuredGraphBorrow";
import ExploreGraphBorrowDetail from "./ExploreGraphBorrowDetail";

const GraphsBorrowDetails = () => {
  return (
    <div className="flex w-full flex-col mt-8 gap-8">
      <div className="w-full">
        <RatesGraphDetail />
      </div>

      <div className="flex flex-col sm:flex-row w-full h-full overflow-hidden">
        <div className="flex-1 overflow-hidden sm:mr-4 mr-0 mt-8">
          <BIRGraphBorrowDetail />
        </div>
        <div className="flex-1 overflow-hidden sm:ml-4 ml-0 mt-8 ">
          <UnsecuredGraphBorrowDetail />
        </div>
      </div>
      <div className="w-full">
        <ExploreGraphBorrowDetail />
      </div>
    </div>
  );
};

export default GraphsBorrowDetails;
