"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { parseUnits } from "ethers";
import MoreButton from "../../moreButton/MoreButton";
import TokenAmount from "@/components/token/TokenAmount";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { BorrowMarket } from "@/types";
import { contracts } from "@/utils/const";
import { getTimestamp, getTokenInfo } from "@/utils/utils";
import {
  getTokenAllowance,
  setTokenAllowance,
  setTokenPermit,
  getPermitNonce,
  supplycollateralAndBorrow,
  getAuthorizeNonce,
  checkAuthorized,
  setMarketsAuthorize,
} from "@/utils/contract";

interface Props {
  item: BorrowMarket;
  supplyAmount: number;
  borrowAmount: number;
  onlyBorrow?: boolean;
  closeModal: () => void;
  validDeposit: () => void;
  setTxHash: (hash: string) => void;
}

const VaultBorrowPush: React.FC<Props> = ({
  item,
  onlyBorrow,
  supplyAmount,
  borrowAmount,
  validDeposit,
  closeModal,
  setTxHash,
}) => {
  const { address: userAddress } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [hasAuth, setHasAuth] = useState(false);
  const [hasApprove, setHasApprove] = useState(false);
  const [hasPermit, setHasPermit] = useState(false);
  const [signHash, setSignHash] = useState("");
  const [authorizeHash, setAuthorizeHash] = useState("");
  const [deadline, setDeadline] = useState(BigInt(0));
  const [permitNonce, setPermitNonce] = useState(0);
  const [authorizeNonce, setAuthorizeNonce] = useState(BigInt(0));

  const supplyToken = getTokenInfo(item.inputToken.id);
  const borrowToken = getTokenInfo(item.borrowedToken.id);
  const supplyTokenAmount = parseUnits(
    supplyAmount.toString(),
    supplyToken.decimals
  );
  const borrowTokenAmount = parseUnits(
    borrowAmount.toString(),
    borrowToken.decimals
  );

  useEffect(() => {
    const initApprove = async () => {
      const [nonce, allowance, authNonce, authInfo] = userAddress
        ? await Promise.all([
            getPermitNonce([
              userAddress,
              item.inputToken.id,
              contracts.MORE_BUNDLER,
            ]),
            getTokenAllowance(
              item.inputToken.id,
              userAddress,
              contracts.PERMIT2
            ),
            getAuthorizeNonce(userAddress),
            checkAuthorized(userAddress),
          ])
        : [0, BigInt(0), BigInt(0), false];

      console.log(authNonce);

      setPermitNonce(nonce);
      setAuthorizeNonce(authNonce);
      setHasAuth(authInfo);

      if (onlyBorrow) {
        setHasApprove(true);
      } else {
        if (allowance >= supplyTokenAmount) setHasApprove(true);
        else setHasApprove(false);
      }

      if (supplyAmount == 0) setHasPermit(true);
    };

    initApprove();
  }, [userAddress, item, supplyAmount, onlyBorrow]);

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

  const handleAuthorize = async () => {
    if (userAddress && !hasAuth) {
      setIsLoading(true);
      try {
        const authDeadline = getTimestamp();
        const authHash = await setMarketsAuthorize(
          userAddress,
          authorizeNonce,
          authDeadline
        );

        setHasAuth(true);
        setAuthorizeHash(authHash);
        setDeadline(authDeadline);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
  };

  const handlePermit = async () => {
    if (userAddress && supplyAmount > 0) {
      setIsLoading(true);
      try {
        const permitDeadline =
          deadline == BigInt(0) ? getTimestamp() : deadline;

        const signHash = await setTokenPermit(
          item.inputToken.id,
          supplyTokenAmount,
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
    } else {
      alert("No supply queue");
    }
  };

  const handleBorrow = async () => {
    // generate borrow tx
    if (userAddress && hasApprove && hasPermit) {
      setIsLoading(true);
      try {
        const txHash = await supplycollateralAndBorrow(
          authorizeHash,
          authorizeNonce,
          item.inputToken.id,
          userAddress,
          signHash,
          deadline,
          supplyTokenAmount,
          borrowTokenAmount,
          permitNonce,
          item.marketParams,
          onlyBorrow ? true : false
        );

        validDeposit();
        setTxHash(txHash);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    } else {
      alert("Not allowed before approve and permit");
    }
  };

  console.log(hasAuth, "hasAuth");

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
      {!onlyBorrow && (
        <div className="text-l flex mb-5 px-4">
          <span>
            <CheckCircleIcon className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5" />
          </span>
          Approve the bundler to spend {supplyAmount} {borrowToken.symbol} (via
          permit)
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
            token={item.inputToken.id}
            amount={supplyAmount}
            ltv={"ltv"}
            totalTokenAmount={supplyAmount}
          />
        </div>
      )}
      <div className="more-bg-primary px-4 mx-5">
        <TokenAmount
          title="Borrow"
          token={item.borrowedToken.id}
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
        {hasAuth && hasApprove && hasPermit ? (
          <MoreButton
            className="text-2xl py-2"
            text="Borrow"
            disabled={isLoading}
            onClick={handleBorrow}
            color="primary"
          />
        ) : !hasAuth ? (
          <MoreButton
            className="text-2xl py-2"
            text="Authorize"
            disabled={isLoading}
            onClick={handleAuthorize}
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

export default VaultBorrowPush;
