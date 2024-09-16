"use client";

import { useAccount } from "wagmi";
import React, { useState } from "react";
import { parseEther } from "ethers";
import MoreButton from "../../moreButton/MoreButton";
import TokenAmount from "../../token/TokenAmount";
import PositionChangeToken from "@/components/token/PositionChangeToken";
import { BorrowPosition } from "@/types";
import { getTokenInfo } from "@/utils/utils";
import ListIconToken from "@/components/token/ListIconToken";
import { withdrawCollateral } from "@/utils/contract";

interface Props {
  item: BorrowPosition;
  amount: number;
  validWithdraw: () => void;
  closeModal: () => void;
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

  const handleWithdraw = async () => {
    try {
      if (userAddress) {
        const txHash = await withdrawCollateral(
          item.marketParams,
          parseEther(amount.toString()),
          userAddress
        );

        validWithdraw();
        setTxHash(txHash);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
    validWithdraw();
  };

  const collateralToken = getTokenInfo(
    item.marketParams.collateralToken
  ).symbol;
  const loanToken = getTokenInfo(item.marketParams.loanToken).symbol;

  return (
    <div className="more-bg-secondary rounded-[20px] h-full w-full px-4">
      <div className="mb-10 px-4 pt-5  text-xl">Review Transaction</div>
      <div className="flex items-center mb-10 px-8 gap-2">
        <ListIconToken iconNames={["usdc", "abt"]} className="w-7 h-7" />
        <div className="text-l   flex items-center'">
          {" "}
          {collateralToken} / {loanToken}
        </div>
      </div>

      <div className="more-bg-primary rounded-b-[5px] mt-[1px] py-8 px-8 ">
        <TokenAmount
          title="Withdraw Collateral"
          token={collateralToken}
          amount={amount}
          ltv=""
          totalTokenAmount={amount}
        />
      </div>

      <div className="more-bg-primary rounded-b-[5px] mt-[1px] py-8 px-8 ">
        <div className="text-grey pb-4"> Position Change </div>
        <PositionChangeToken
          title="Collateral"
          value={amount}
          token={collateralToken}
          value2={0}
        />
      </div>

      <div className="py-5 px-2">
        By confirming this transaction, you agree to the{" "}
        <a className="underline" href="#goto">
          Terms of Use
        </a>{" "}
        and the services provisions relating to the MORE Protocol Vault.
      </div>
      <div className="flex justify-end py-5  rounded-b-[20px] px-4">
        <div className="mr-5">
          <MoreButton
            className="text-2xl py-2"
            text="Cancel"
            onClick={closeModal}
            color="gray"
          />
        </div>
        <MoreButton
          className="text-2xl py-2"
          text="Confirm"
          disabled={isLoading}
          onClick={handleWithdraw}
          color="primary"
        />
      </div>
    </div>
  );
};

export default VaultWithdrawBorrowPush;
