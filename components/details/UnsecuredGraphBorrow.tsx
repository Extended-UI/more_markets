"use client";

import MoreGraphicLinear from "@/components/graphics/MoreGraphicsLinear";
import MoreGraphicsV2 from "@/components/graphics/MoreGraphicsV2";
import React from "react";

const UnsecuredGraphBorrowDetail = () => {
  //EXEMPLE 1 (GAUCHE)
  //Pourcentage 0 to 100 step 10

  const labelsX = ["0%", "25%", "50%", "75%", "100%", "125%"];

  const datasets = [
    {
      label: "Base Interest Rate",
      data: [1, 1],
      borderColor: "#1DF2A1",
      backgroundColor: "#1DF2A1",
    },
    {
      label: "Credora CCC Rating",
      data: [1, 1, 1, 1, 1.5, 2],
      borderColor: "#1DA1F2",
      backgroundColor: "#1DA1F2",
    },
    {
      label: "Credora BBB+ Rating",
      data: [1, 1, 1, 1, 2],
      borderColor: "#A11DF2",
      backgroundColor: "#A11DF2",
    },
  ];

  return (
    <>
      <div className="text-2xl mb-5 ">Unsecured Borrower - Specific LLTV (Coming Soon)</div>
      <div
        className="mockup-window border-[#343434] border p-4"
        style={{ backgroundColor: "#181818" }}
      >
        <MoreGraphicsV2
          datasets={datasets}
          labelsX={labelsX}
          comment="Learn MORE about ratings and how to get rated here."
        ></MoreGraphicsV2>
      </div>
    </>
  );
};

export default UnsecuredGraphBorrowDetail;
