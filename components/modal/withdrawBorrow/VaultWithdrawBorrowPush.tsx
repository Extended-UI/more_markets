"use client";

import { useAccount } from "wagmi";
import { parseUnits } from "ethers";
import React, { useState } from "react";
import TokenAmount from "../../token/TokenAmount";
import MoreButton from "../../moreButton/MoreButton";
import ListIconToken from "@/components/token/ListIconToken";
import PositionChangeToken from "@/components/token/PositionChangeToken";
import { IBorrowPosition } from "@/types";
import { MoreAction } from "@/utils/const";
import { withdrawCollateral } from "@/utils/contract";
import { getTokenInfo, notifyError, formatTokenValue } from "@/utils/utils";

interface Props extends IBorrowPosition {
  amount: number;
  validWithdraw: () => void;
  setTxHash: (hash: string) => void;
}

const VaultWithdrawBorrowPush: React.FC<Props> = ({
  item,
  amount,
  validWithdraw,
  closeModal,
  setTxHash,
}) => {
  const { address: userAddress } = useAccount();

  const [isLoading, setIsLoading] = useState(false);

  const collateralToken = getTokenInfo(item.inputToken.id);
  const loanToken = getTokenInfo(item.borrowedToken.id).symbol;
  const tokenAmount = parseUnits(amount.toString(), collateralToken.decimals);

  const collateralAmount = formatTokenValue(
    item.collateral,
    "",
    collateralToken.decimals
  );

  const handleWithdraw = async () => {
    if (userAddress) {
      setIsLoading(true);
      try {
        const txHash = await withdrawCollateral(
          item.marketParams,
          tokenAmount,
          userAddress,
          item.inputToken.id
        );

        validWithdraw();
        setTxHash(txHash);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        notifyError(err, MoreAction.WITHDRAW_COLLATERAL);
      }
    }
  };

  return (
    <div className="more-bg-secondary w-full rounded-[20px] modal-base relative">
      <div className="rounded-full bg-[#343434] hover:bg-[#3f3f3f] p-6 absolute right-4 top-4" onClick={closeModal}>
        <img src={'/assets/icons/close.svg'} alt="close" className="w-[12px] h-[12px]"/>
      </div>
      <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
        <div className="text-[24px] mb-[40px] font-semibold">
          Review Transaction
        </div>
        <div className="flex items-center mb-[30px] font-semibold text-[20px] gap-2">
          <ListIconToken
            iconNames={[item.inputToken.id, item.borrowedToken.id]}
            className="w-7 h-7"
          />
          <div className="text-l flex items-center'">
            {collateralToken.symbol} / {loanToken}
          </div>
        </div>

        <div className="relative more-bg-primary rounded-[12px] p-[20px] mb-6">
          <TokenAmount
            title="Withdraw Collateral"
            token={item.inputToken.id}
            amount={amount}
            ltv=""
            totalTokenAmount={amount}
          />
        </div>

        <div className="relative more-bg-primary rounded-[12px] p-[20px] mb-6">
          <div className="text-grey pb-4"> Position Change </div>
          <PositionChangeToken
            title="Collateral"
            value={collateralAmount}
            token={collateralToken.symbol}
            value2={collateralAmount - amount}
          />
        </div>

        <div className="pt-5 px-5 text-[16px] leading-10">
          By confirming this transaction, you agree to the{" "}
          <a className="underline" href="#goto">
            Terms of Use
          </a>{" "}
          and the services provisions relating to the MORE Protocol Vault.
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
            text="Withdraw Collateral"
            disabled={isLoading}
            onClick={handleWithdraw}
            color="primary"
          />
        </div>
      
    </div>
  );
};

export default VaultWithdrawBorrowPush;
