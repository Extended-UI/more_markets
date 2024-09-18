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
import { getTokenInfo, getTimestamp, formatTokenValue } from "@/utils/utils";
import {
  getTokenAllowance,
  setTokenAllowance,
  setTokenPermit,
  getPermitNonce,
  repayLoanToMarkets,
} from "@/utils/contract";

interface Props {
  item: BorrowPosition;
  amount: number;
  validRepay: () => void;
  closeModal: () => void;
  setTxHash: (hash: string) => void;
}

const VaultRepayPush: React.FC<Props> = ({
  item,
  amount,
  setTxHash,
  validRepay,
  closeModal,
}) => {
  const { address: userAddress } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [hasApprove, setHasApprove] = useState(false);
  const [hasPermit, setHasPermit] = useState(false);
  const [signHash, setSignHash] = useState("");
  const [deadline, setDeadline] = useState(BigInt(0));
  const [permitNonce, setPermitNonce] = useState(0);

  const borrowToken = getTokenInfo(item.borrowedToken.id);
  const collateralToken = getTokenInfo(item.marketParams.collateralToken);
  const loanToken = borrowToken.symbol;
  const repayAmount = parseUnits(amount.toString(), borrowToken.decimals);
  const loanAmount = formatTokenValue(item.loan, item.borrowedToken.id);

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
          ])
        : [0, BigInt(0), BigInt(0), false];

      setPermitNonce(nonce);

      if (allowance >= repayAmount) setHasApprove(true);
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
          repayAmount
        );

        setHasApprove(true);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
  };

  const handlePermit = async () => {
    if (userAddress && repayAmount > BigInt(0)) {
      setIsLoading(true);
      try {
        const permitDeadline =
          deadline == BigInt(0) ? getTimestamp() : deadline;

        const signHash = await setTokenPermit(
          item.borrowedToken.id,
          repayAmount,
          permitNonce,
          contracts.MORE_BUNDLER,
          permitDeadline
        );

        setSignHash(signHash);
        setDeadline(permitDeadline);
        setHasPermit(true);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
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
          item.borrowedToken.id,
          repayAmount,
          permitNonce,
          deadline,
          signHash,
          item.marketParams
        );

        validRepay();
        setTxHash(txHash);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="more-bg-secondary rounded-[20px] h-full w-full px-8 py-4">
      <div className="mb-10  pt-5  text-4xl">Review Transaction</div>
      <div className="flex items-center mb-10  gap-2">
        <ListIconToken
          iconNames={[
            item.marketParams.collateralToken,
            item.marketParams.loanToken,
          ]}
          className="w-7 h-7"
        />
        <div className="text-l flex items-center'">
          {collateralToken.symbol} / {loanToken}
        </div>
      </div>

      <div className="more-bg-primary px-8 rounded-t-[5px] ">
        <TokenAmount
          title="Repay"
          token={item.marketParams.loanToken}
          amount={amount}
          ltv={""}
          totalTokenAmount={amount}
        />
        <div className="flex flex-row justify-between items-center h-20">
          <div className="text-xl">Projeted rate</div>
          <div className="flex  items-center gap-2">
            <FormatPourcentage value={"N/A"} />{" "}
            <ArrowLongRightIcon className="w-4 h-4 text-grey" />{" "}
            <FormatPourcentage value={"N/A"} />
          </div>
        </div>
      </div>

      {/* <div className="more-bg-primary rounded-b-[5px] mt-[1px] px-8 flex flex-col gap-4 py-8">
        <div className="text-grey ">Position Change</div>
        <div className="flex flex-row justify-between items-center ">
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

        <div className="flex flex-row justify-between items-center ">
          <div className="text-xl">LTV / Liquidation LTV</div>
          <div className="flex  items-center gap-2">
            <FormatPourcentage value={apy} />{" "}
            <ArrowLongRightIcon className="w-4 h-4 text-grey" />{" "}
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

      <div className="py-8 px-2">
        By confirming this transaction, you agree to the{" "}
        <a className="underline" href="#goto">
          Terms of Use
        </a>{" "}
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
