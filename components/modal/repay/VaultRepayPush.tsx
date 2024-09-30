"use client";

import { useAccount } from "wagmi";
import { parseUnits, MaxUint256 } from "ethers";
import React, { useState, useEffect } from "react";
import TokenAmount from "../../token/TokenAmount";
import MoreButton from "../../moreButton/MoreButton";
import FormatPrice from "@/components/tools/formatPrice";
import ListIconToken from "@/components/token/ListIconToken";
import { ArrowLongRightIcon } from "@heroicons/react/16/solid";
import FormatPourcentage from "@/components/tools/formatPourcentage";
import PositionChangeToken from "@/components/token/PositionChangeToken";
import FormatTwoPourcentage from "@/components/tools/formatTwoPourcentage";
import { BorrowPosition } from "@/types";
import { contracts, MoreAction } from "@/utils/const";
import { getTokenInfo, notifyError, delay } from "@/utils/utils";
import {
  getTokenAllowance,
  setTokenAllowance,
  repayLoanViaMarkets,
} from "@/utils/contract";

interface Props {
  amount: number;
  useMax: boolean;
  item: BorrowPosition;
  validRepay: () => void;
  closeModal: () => void;
  setTxHash: (hash: string) => void;
}

const VaultRepayPush: React.FC<Props> = ({
  item,
  amount,
  useMax,
  setTxHash,
  validRepay,
  closeModal,
}) => {
  const { address: userAddress } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [hasApprove, setHasApprove] = useState(false);

  const borrowToken = getTokenInfo(item.borrowedToken.id);
  const collateralToken = getTokenInfo(item.inputToken.id);
  const loanToken = borrowToken.symbol;
  const repayAmount = parseUnits(amount.toString(), borrowToken.decimals);
  // const loanAmount = formatTokenValue(item.loan, item.borrowedToken.id);

  useEffect(() => {
    const initApprove = async () => {
      const allowance = userAddress
        ? await getTokenAllowance(
            item.borrowedToken.id,
            userAddress,
            contracts.MORE_MARKETS
          )
        : BigInt(0);

      if (allowance >= repayAmount) setHasApprove(true);
      else setHasApprove(false);
    };

    initApprove();
  }, [userAddress, item, repayAmount]);

  const doApprove = async () => {
    await setTokenAllowance(
      item.borrowedToken.id,
      contracts.MORE_MARKETS,
      useMax ? MaxUint256 : repayAmount
    );

    setHasApprove(true);
    await delay(2);
  };

  const doRepay = async () => {
    if (userAddress) {
      const txHash = await repayLoanViaMarkets(
        userAddress,
        repayAmount,
        useMax,
        item
      );

      await delay(2);
      validRepay();
      setTxHash(txHash);
    }
  };

  const handleRepay = async () => {
    // generate borrow tx
    setIsLoading(true);
    try {
      if (!hasApprove) await doApprove();
      await doRepay();

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      notifyError(err, MoreAction.REPAY);
    }
  };

  return (
    <div className="more-bg-secondary w-full rounded-[20px] modal-base">
      <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
      <div className="text-[24px] mb-[40px] font-semibold">Review Transaction</div>
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
          title="Repay"
          token={item.borrowedToken.id}
          amount={amount}
          ltv={""}
          totalTokenAmount={amount}
        />
      </div>

      {/* <div className="more-bg-primary rounded-b-[5px] mt-[1px] px-8 flex flex-col gap-4 py-8">
        <div className="text-grey">Position Change</div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-xl">Loan</div>
          <div className="flex  items-center gap-2">
            <FormatPrice value={loanAmount} token={loanToken} />
          </div>
        </div>

        <PositionChangeToken
          title="Borrow"
          token={loanToken}
          value={loanAmount}
          value2={loanAmount - amount}
        />

        <div className="flex flex-row justify-between items-center">
          <div className="text-xl">LTV / Liquidation LTV</div>
          <div className="flex  items-center gap-2">
            <FormatPourcentage value={apy} />
            <ArrowLongRightIcon className="w-4 h-4 text-grey" />
            <FormatTwoPourcentage value={apy} />
          </div>
        </div>

        <PositionChangeToken
          title="Collateral liq.price"
          token={token}
          value={balance}
          value2={balance}
        /> 
      </div> */}

      <div className="pt-5 px-5 text-[16px] leading-10">
        By confirming this transaction, you agree to the{" "}
        <a className="underline" href="#goto">
          Terms of Use
        </a>{" "}
        and the services provisions relating to the MORE Protocol Vault.
      </div>
      <div className="flex justify-end more-bg-primary rounded-b-[20px] px-[28px] py-[30px]">
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
          text="Repay"
          disabled={isLoading}
          onClick={handleRepay}
          color="primary"
        />
      </div>
    </div>
    </div>
  );
};

export default VaultRepayPush;
