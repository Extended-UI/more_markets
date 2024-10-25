"use client";

import React, { useState } from "react";
import MoreButton from "../moreButton/MoreButton";
import { IRewardClaim } from "@/types";
import { MoreAction } from "@/utils/const";
import { notifyError } from "@/utils/utils";
import { doClaimReward } from "@/utils/contract";

interface Props {
  claimList: IRewardClaim[];
  closeModal: () => void;
  setClaimList: (items: IRewardClaim[]) => void;
}

const ClaimRewards: React.FC<Props> = ({
  closeModal,
  setClaimList,
  claimList,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClaim = async () => {
    if (claimList.length > 0) {
      setIsLoading(true);
      try {
        await doClaimReward(claimList);
        setIsLoading(false);
        setClaimList([]);
      } catch (err) {
        setIsLoading(false);
        notifyError(err, MoreAction.CLAIM);
      }
    }
  };

  return (
    <div className="more-bg-secondary w-full rounded-[20px] modal-base relative">
      <div
        className="rounded-full bg-[#343434] hover:bg-[#3f3f3f] p-6 absolute right-4 top-4"
        onClick={closeModal}
      >
        <img
          src={"/assets/icons/close.svg"}
          alt="close"
          className="w-[12px] h-[12px]"
        />
      </div>
      <div className="more-bg-secondary w-full rounded-[20px] modal-base">
        <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
          <img
            src={"assets/icons/logo.png"}
            alt="Logo"
            width={36}
            height={36}
            className="mb-[30px]"
          />
          <div className="text-[24px] mb-[30px] font-semibold">
            Claim Rewards
          </div>
        </div>
        <div className="flex justify-end more-bg-primary rounded-b-[20px] px-[28px] py-[30px]">
          <div className="mr-5">
            <MoreButton
              className="text-2xl py-2"
              text="Cancel"
              onClick={closeModal}
              color="grey"
            />
          </div>
          <MoreButton
            className="text-2xl py-2"
            text="Claim Rewards"
            disabled={isLoading}
            onClick={handleClaim}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default ClaimRewards;
