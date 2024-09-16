"use client";

import React from "react";
import IconToken from "../token/IconToken";
import { InvestmentData } from "@/types";

interface Props {
  item: InvestmentData;
}

const VaultDetail: React.FC<Props> = ({ item }) => {
  return (
    <div className="more-bg-secondary rounded-[20px] h-full w-full">
      <div className="mb-7 px-4 pt-5  text-xl">{item.vaultName}</div>
      <div className="flex flex-row justify-between items-center">
        <div className="text-l flex items-center gap-2 flex mb-5 px-4">
          <span className="more-text-gray">Curator:</span>
          <IconToken className="w-6 h-6" tokenName={item.assetAddress} />
          <span>{item.curator}</span>
        </div>
      </div>
      <div className="px-4 my-4 text-gray">
        This is a blurb that describes the strategy of the vault and any
        specific information that the curator might want to communicate to
        depositors. It can include things like the rationale, the risk
        tolerance, any calculations or other information that is helpful to the
        user. This text should be limited to 4 lines (however many characters
        that makes since this is about that.
      </div>
      <div className="w-[50%] mx-15 flex justify-center mx-auto">
        <div className="glowing-text-primary w-full"></div>
      </div>
      <div className="more-bg-primary px-4 rounded-b-[10px] py-2">
        <div className="flex justify-between mt-5">
          <div>Vault Address:</div>
          <div>{item.vaultId}</div>
        </div>
        <div className="flex justify-between mt-5">
          <div>Vault Deployment Date</div>
          <div className="">July 2024</div>
        </div>
        <div className="flex justify-between mt-5">
          <div>Guardian Address</div>
          <div>{item.guardian}</div>
        </div>
        <div className="flex justify-between mt-5 pb-4 ">
          <div>Risk Curator Tumelock</div>
          <div>1 Days</div>
        </div>
      </div>
    </div>
  );
};

export default VaultDetail;
