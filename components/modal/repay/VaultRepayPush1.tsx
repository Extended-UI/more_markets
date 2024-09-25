"use client";

import { useAccount } from "wagmi";
import { parseUnits } from "ethers";
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
import { contracts } from "@/utils/const";
import { getTokenInfo, getTimestamp, notifyError } from "@/utils/utils";
import {
  getTokenAllowance,
  setTokenAllowance,
  setTokenPermit,
  getPermitNonce,
  repayLoanToMarkets,
  getBorrowedAmount,
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
  const [hasPermit, setHasPermit] = useState(false);
  const [borrowed, setBorrowed] = useState(BigInt(0));
  const [signHash, setSignHash] = useState("");
  const [deadline, setDeadline] = useState(BigInt(0));
  const [permitNonce, setPermitNonce] = useState(0);

  const borrowToken = getTokenInfo(item.borrowedToken.id);
  const collateralToken = getTokenInfo(item.inputToken.id);
  const loanToken = borrowToken.symbol;
  const repayAmount = parseUnits(amount.toString(), borrowToken.decimals);
  // const loanAmount = formatTokenValue(item.loan, item.borrowedToken.id);

  useEffect(() => {
    const initApprove = async () => {
      const [nonce, allowance] = userAddress
        ? await Promise.all([
            getPermitNonce([
              userAddress,
              item.borrowedToken.id,
              contracts.MORE_BUNDLER,
            ]),
            getTokenAllowance(
              item.borrowedToken.id,
              userAddress,
              contracts.PERMIT2
            ),
            // getBorrowedAmount(item.id, item.lastMultiplier, item.loan),
          ])
        : [0, BigInt(0), BigInt(0)];

      setPermitNonce(nonce);

      const repayEnough = repayAmount >= item.loan;
      setBorrowed(repayEnough ? item.loan : repayAmount);

      if (!repayEnough && allowance >= (repayEnough ? item.loan : repayAmount))
        setHasApprove(true);
      else setHasApprove(false);
    };

    initApprove();
  }, [userAddress, item, repayAmount]);

  const handleApprove = async () => {
    if (userAddress) {
      setIsLoading(true);
      try {
        await setTokenAllowance(
          item.borrowedToken.id,
          contracts.PERMIT2,
          borrowed
        );

        setHasApprove(true);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        notifyError(err);
      }
    }
  };

  const handlePermit = async () => {
    if (userAddress && borrowed > BigInt(0)) {
      setIsLoading(true);
      try {
        const permitDeadline =
          deadline == BigInt(0) ? getTimestamp() : deadline;

        const signHash = await setTokenPermit(
          item.borrowedToken.id,
          borrowed,
          permitNonce,
          contracts.MORE_BUNDLER,
          permitDeadline
        );

        setSignHash(signHash);
        setDeadline(permitDeadline);
        setHasPermit(true);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        notifyError(err);
      }
    }
  };

  const handleRepay = async () => {
    // generate borrow tx
    if (userAddress && hasApprove && hasPermit) {
      setIsLoading(true);
      try {
        const txHash = await repayLoanToMarkets(
          userAddress,
          borrowed,
          permitNonce,
          deadline,
          signHash,
          useMax,
          item
        );

        validRepay();
        setTxHash(txHash);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        notifyError(err);
      }
    }
  };

  return (
    <div className="more-bg-secondary rounded-[20px] h-full w-full">
      <div className="mb-10 pt-5 text-4xl px-4">Review Transaction</div>
      <div className="flex items-center mb-5 gap-2 px-4">
        <ListIconToken
          iconNames={[item.inputToken.id, item.borrowedToken.id]}
          className="w-7 h-7"
        />
        <div className="text-l flex items-center'">
          {collateralToken.symbol} / {loanToken}
        </div>
      </div>
      <div className="more-bg-primary px-8 rounded-t-[5px] mx-4">
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

      <div className="py-5 px-5">
        By confirming this transaction, you agree to the{" "}
        <a className="underline" href="#goto">
          Terms of Use
        </a>{" "}
        and the services provisions relating to the MORE Protocol Vault.
      </div>
      <div className="flex justify-end py-5 more-bg-primary rounded-b-[20px] px-4">
        <div className="mr-5">
          <MoreButton
            className="text-2xl py-2"
            text="Cancel"
            onClick={closeModal}
            color="gray"
          />
        </div>
        {hasApprove && hasPermit ? (
          <MoreButton
            className="text-2xl py-2"
            text="Repay"
            disabled={isLoading}
            onClick={handleRepay}
            color="primary"
          />
        ) : hasApprove ? (
          <MoreButton
            className="text-2xl py-2"
            text="Permit"
            disabled={isLoading}
            onClick={handlePermit}
            color="primary"
          />
        ) : (
          <MoreButton
            className="text-2xl py-2"
            text="Approve"
            disabled={isLoading}
            onClick={handleApprove}
            color="primary"
          />
        )}
      </div>
    </div>
  );
};

export default VaultRepayPush;
