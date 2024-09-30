"use client";

import { useAccount } from "wagmi";
import { parseUnits } from "ethers";
import React, { useEffect, useState } from "react";
import MoreButton from "../../moreButton/MoreButton";
import TokenAmount from "@/components/token/TokenAmount";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { BorrowPosition } from "@/types";
import { contracts, MoreAction } from "@/utils/const";
import { getTimestamp, getTokenInfo, notifyError, delay } from "@/utils/utils";
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
  item: BorrowPosition;
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

  const doApprove = async () => {
    await setTokenAllowance(
      item.inputToken.id,
      contracts.PERMIT2,
      supplyTokenAmount
    );

    setHasApprove(true);
    await delay(2);
  };

  const doAuthorize = async (authDeadline: bigint): Promise<string> => {
    if (userAddress) {
      const authHash = await setMarketsAuthorize(
        userAddress,
        authorizeNonce,
        authDeadline
      );

      setHasAuth(true);
      await delay(2);

      return authHash;
    }

    return "";
  };

  const doPermit = async (permitDeadline: bigint): Promise<string> => {
    const signHash = await setTokenPermit(
      item.inputToken.id,
      supplyTokenAmount,
      permitNonce,
      contracts.MORE_BUNDLER,
      permitDeadline
    );

    setHasPermit(true);
    await delay(2);

    return signHash;
  };

  const doBorrow = async (
    deadline: bigint,
    authorizeHash: string,
    signHash: string
  ) => {
    if (userAddress) {
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

      await delay(2);
      validDeposit();
      setTxHash(txHash);
    }
  };

  const handleBorrow = async () => {
    // generate borrow tx
    setIsLoading(true);
    try {
      const deadline = getTimestamp();

      if (!hasApprove) await doApprove();
      const authorizeHash = hasAuth ? "" : await doAuthorize(deadline);
      const permitHash = hasPermit ? "" : await doPermit(deadline);
      await doBorrow(deadline, authorizeHash, permitHash);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      notifyError(err, onlyBorrow ? MoreAction.BORROW_MORE : MoreAction.BORROW);
    }
  };

  return (
    <div className="more-bg-secondary w-full rounded-[20px] modal-base">
      <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
      <div className="text-[24px] mb-[40px] font-semibold">Review Transaction</div>
      <div className="relative flex items-start text-[20px] leading-[1.5] mb-[30px]">
        <span>
          <CheckCircleIcon className="text-secondary text-xl cursor-pointer w-[30px] !h-[30px] mr-5" />
        </span>
        Authorize the MORE to execute multiple actions in a single transaction
        when updating your positions
      </div>
      {!onlyBorrow && (
        <div className="relative flex items-start text-[20px] leading-[1.2] mb-[30px]">
          <span>
            <CheckCircleIcon className="text-secondary text-xl cursor-pointer w-[30px] !h-[30px] mr-5" />
          </span>
          Approve the bundler to spend {supplyAmount} {borrowToken.symbol} (via
          permit)
        </div>
      )}
      <div className="relative flex items-start text-[20px] leading-[1.2] mb-[30px]">
        <span>
          <CheckCircleIcon className="text-secondary text-xl cursor-pointer w-[30px] !h-[30px] mr-5" />
        </span>
        Execute the following actions
      </div>
      {supplyAmount > 0 && (
        <div className="relative more-bg-primary rounded-[12px] p-[20px] mb-6">
          <TokenAmount
            title="Supply"
            token={item.inputToken.id}
            amount={supplyAmount}
            ltv={"ltv"}
            totalTokenAmount={supplyAmount}
          />
        </div>
      )}
      <div className="relative more-bg-primary rounded-[12px] p-[20px] mb-6">
        <TokenAmount
          title="Borrow"
          token={item.borrowedToken.id}
          amount={borrowAmount}
          ltv={"ltv"}
          totalTokenAmount={borrowAmount}
        />
      </div>

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
          text="Borrow"
          disabled={isLoading}
          onClick={handleBorrow}
          color="primary"
        />
      </div>
      </div>
    </div>
  );
};

export default VaultBorrowPush;
