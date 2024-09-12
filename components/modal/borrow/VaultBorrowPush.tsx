"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { parseUnits } from "ethers";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import MoreButton from "../../moreButton/MoreButton";
import TokenAmount from "@/components/token/TokenAmount";
import BorrowTokenAmount from "../../token/BorrowTokenAmount";
import { BorrowMarket } from "@/types";
import { contracts, tokens } from "@/utils/const";
import { getTimestamp } from "@/utils/utils";
import {
  getTokenAllowance,
  setTokenAllowance,
  setTokenPermit,
  getPermitNonce,
  supplycollateralAndBorrow,
} from "@/utils/contract";

interface Props {
  item: BorrowMarket;
  supplyAmount: number;
  borrowAmount: number;
  closeModal: () => void;
  validDeposit: () => void;
  setTxHash: (hash: string) => void;
}

const VaultBorrowPush: React.FC<Props> = ({
  item,
  supplyAmount,
  borrowAmount,
  validDeposit,
  closeModal,
  setTxHash,
}) => {
  const { address: userAddress } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [hasApprove, setHasApprove] = useState(false);
  const [hasPermit, setHasPermit] = useState(false);
  const [signHash, setSignHash] = useState("");
  const [deadline, setDeadline] = useState(BigInt(0));
  const [permitNonce, setPermitNonce] = useState(0);

  const supplyTokenAmount = parseUnits(supplyAmount.toString());
  const borrowTokenAmount = parseUnits(borrowAmount.toString());

  useEffect(() => {
    const initApprove = async () => {
      const nonce = userAddress
        ? await getPermitNonce([
            userAddress,
            item.inputToken.id,
            contracts.MORE_BUNDLER,
          ])
        : 0;
      setPermitNonce(nonce);

      const allowance = userAddress
        ? await getTokenAllowance(
            item.inputToken.id,
            userAddress,
            contracts.PERMIT2
          )
        : BigInt(0);

      if (allowance >= supplyTokenAmount) setHasApprove(true);
      else setHasApprove(false);

      if (supplyAmount == 0) setHasPermit(true);
    };

    initApprove();
  }, [userAddress, item, supplyAmount, borrowAmount, isLoading]);

  const handleApprove = async () => {
    if (userAddress) {
      setIsLoading(true);
      try {
        await setTokenAllowance(
          item.inputToken.id,
          contracts.PERMIT2,
          supplyTokenAmount
        );

        setHasApprove(true);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    } else {
      alert("No supply queue");
    }
  };

  const handlePermit = async () => {
    if (userAddress && supplyAmount > 0) {
      setIsLoading(true);
      try {
        const deadline = getTimestamp();
        const signHash = await setTokenPermit(
          item.inputToken.id,
          supplyTokenAmount,
          permitNonce,
          contracts.MORE_BUNDLER,
          deadline
        );

        setSignHash(signHash);
        setDeadline(deadline);

        setHasPermit(true);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    } else {
      alert("No supply queue");
    }
  };

  const handleBorrow = async () => {
    // generate borrow tx
    if (userAddress && hasApprove && hasPermit) {
      try {
        const txHash = await supplycollateralAndBorrow(
          item.inputToken.id,
          userAddress,
          signHash,
          deadline,
          supplyTokenAmount,
          borrowTokenAmount,
          permitNonce,
          item.marketParams
        );

        validDeposit();
        setTxHash(txHash);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    } else {
      alert("Not allowed before approve and permit");
    }
  };

  return (
    <div className="more-bg-secondary rounded-[20px] h-full w-full">
      <div className="mb-10 px-4 pt-8  text-2xl">Review Transaction</div>
      <div className="text-l flex mb-5 px-4">
        <span>
          <CheckCircleIcon className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5" />
        </span>
        Authorize the MORE to execute multiple actions in a single transaction
        when updating your positions
      </div>
      {supplyAmount > 0 && (
        <div className="text-l flex mb-5 px-4">
          <span>
            <CheckCircleIcon className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5" />
          </span>
          Approve the bundler to spend {supplyAmount}{" "}
          {tokens[item.borrowedToken.id].toUpperCase()} (via permit)
        </div>
      )}
      <div className="text-l flex mb-5 px-4">
        <span>
          <CheckCircleIcon className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5" />
        </span>
        Execute the following actions
      </div>
      {supplyAmount > 0 && (
        <div className="more-bg-primary px-4 mx-5">
          <TokenAmount
            title="Supply"
            token={tokens[item.borrowedToken.id]}
            amount={supplyAmount}
            ltv={"ltv"}
            totalTokenAmount={supplyAmount}
          />
        </div>
      )}
      <div className="more-bg-primary px-4 mx-5">
        <BorrowTokenAmount
          token={"title"}
          amount={borrowAmount}
          ltv={"ltv"}
          totalTokenAmount={borrowAmount}
        />
      </div>

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
            text="Borrow"
            disabled={isLoading}
            onClick={() => handleBorrow()}
            color="primary"
          />
        ) : hasApprove ? (
          <MoreButton
            className="text-2xl py-2"
            text="Permit"
            disabled={isLoading}
            onClick={() => handlePermit()}
            color="primary"
          />
        ) : (
          <MoreButton
            className="text-2xl py-2"
            text="Approve"
            disabled={isLoading}
            onClick={() => handleApprove()}
            color="primary"
          />
        )}
      </div>
    </div>
  );
};

export default VaultBorrowPush;
