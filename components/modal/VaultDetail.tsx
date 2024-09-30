"use client";

import React from "react";
import { formatEther } from "viem";
import IconToken from "../token/IconToken";
import MoreButton from "../moreButton/MoreButton";
import { InvestmentData } from "@/types";

interface Props {
  item: InvestmentData;
  closeModal: () => void;
}

const VaultDetail: React.FC<Props> = ({ item, closeModal }) => {
  return (
    <div className="more-bg-secondary w-full rounded-[20px] modal-base">
      <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
      <div className="text-[24px] mb-[40px] font-semibold">{item.vaultName}</div>
      <div className="flex flex-row justify-between items-center mb-[30px]">
        <div className="text-[20px] font-semibold flex items-center gap-3">
          <span className="more-text-gray text-[16px]">Curator:</span>
          <IconToken className="w-6 h-6" tokenName={item.assetAddress} />
          <span>{item.curator}</span>
        </div>
      </div>
      <div className="my-[30px] text-[16px] text-[#E0DFE3]">
        This vault manages liquidity allocations of Flow-indexed tokens based on
        supply and demand for liquid staked FLOW and FLOW
      </div>
      </div>
      <div className="w-[50%] mx-15 flex justify-center mx-auto">
        <div className="glowing-text-primary !p-0 w-full"></div>
      </div>
      <div className="more-bg-primary px-[28px] py-[30px]">
        <div className="flex justify-between mb-[20px]">
          <div>Vault Address:</div>
          <div>{item.vaultId}</div>
        </div>
        <div className="flex justify-between mb-[20px]">
          <div>Vault Deployment Date</div>
          <div className="">Sep 2024</div>
        </div>
        <div className="flex justify-between mb-[20px]">
          <div>Guardian Address</div>
          <div>{item.guardian}</div>
        </div>
        <div className="flex justify-between ">
          <div>Risk Curator Tumelock</div>
          <div>{formatEther(item.timelock)} Days</div>
        </div>
      </div>
      <div className="px-[28px] py-[30px] flex justify-end">
          <MoreButton
            className="text-2xl py-2"
            text="Close"
            onClick={closeModal}
            color="grey"
          />
      </div>
    </div>
  );
};

export default VaultDetail;
