"use client";

import { useAccount } from "wagmi";
import { parseUnits, MaxUint256 } from "ethers";
import React, { useState, useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import TokenAmount from "../../token/TokenAmount";
import MoreButton from "../../moreButton/MoreButton";
import IconToken from "@/components/token/IconToken";
import PositionChangeToken from "@/components/token/PositionChangeToken";
import FormatTwoPourcentage from "@/components/tools/formatTwoPourcentage";
import { InvestmentData } from "@/types";
import { getTimestamp, getTokenInfo, notifyError, delay } from "@/utils/utils";
import {
  withdrawFromVaults,
  getVaultNonce,
  setVaultPermit,
  getAuthorizeNonce,
  checkAuthorized,
  setMarketsAuthorize,
} from "@/utils/contract";

interface Props {
  amount: number;
  useMax: boolean;
  item: InvestmentData;
  closeModal: () => void;
  validWithdraw: () => void;
  setTxhash: (hash: string) => void;
}

const VaultWithdrawPush: React.FC<Props> = ({
  item,
  amount,
  useMax,
  setTxhash,
  closeModal,
  validWithdraw,
}) => {
  const { address: userAddress } = useAccount();
  const [hasAuth, setHasAuth] = useState(false);
  const [hasPermit, setHasPermit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vaultNonce, setVaultNonce] = useState(BigInt(0));
  const [authorizeNonce, setAuthorizeNonce] = useState(BigInt(0));

  const tokenInfo = getTokenInfo(item.assetAddress);
  const tokenAmount = parseUnits(amount.toString(), tokenInfo.decimals);
  const userDepositAmount = parseUnits(
    item.userDeposits.toString(),
    tokenInfo.decimals
  );

  useEffect(() => {
    const initApprove = async () => {
      const [nonce, aNonce, authInfo] = userAddress
        ? await Promise.all([
            getVaultNonce(item.vaultId as `0x${string}`, userAddress),
            getAuthorizeNonce(userAddress),
            checkAuthorized(userAddress),
          ])
        : [BigInt(0), BigInt(0), false];

      setVaultNonce(nonce);
      setHasAuth(authInfo);
      setAuthorizeNonce(aNonce);
    };

    initApprove();
  }, [userAddress, item]);

  const doPermit = async (permitDeadline: bigint): Promise<string> => {
    if (userAddress) {
      const signHash = await setVaultPermit(
        item.vaultName,
        userAddress,
        item.vaultId,
        MaxUint256,
        vaultNonce,
        permitDeadline
      );

      setHasPermit(true);
      await delay(2);

      return signHash;
    }

    return "";
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

  const doWithdraw = async (
    deadline: bigint,
    permitHash: string,
    authorizeHash: string
  ) => {
    if (userAddress) {
      const hash = await withdrawFromVaults(
        userAddress,
        tokenAmount,
        deadline,
        permitHash,
        authorizeHash,
        authorizeNonce,
        useMax || tokenAmount >= userDepositAmount,
        item
      );

      await delay(2);

      setTxhash(hash);
      validWithdraw();
    }
  };

  const handleWithdraw = async () => {
    if (userAddress) {
      setIsLoading(true);
      try {
        const deadline = getTimestamp();

        const authorizeHash = hasAuth ? "" : await doAuthorize(deadline);
        const permitHash = hasPermit ? "" : await doPermit(deadline);

        await doWithdraw(deadline, permitHash, authorizeHash);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        notifyError(err);
      }
    }
  };

  return (
    <div className="more-bg-secondary rounded-[20px] h-full w-full">
      <div className="mb-5 px-4 pt-10 text-3xl">Review Transaction</div>
      <div className="text-3xl mb-5 pt-5 px-4">{item.vaultName}</div>
      <div className="flex flex-row justify-between mt-4 items-center">
        <div className="flex gap-2 text-l mb-5  px-4 items-center">
          <span className="more-text-gray">Curator:</span>
          <IconToken className="w-6 h-6" tokenName="wflow" />
          <span>{"curator"}</span>
        </div>
        <div className="flex gap-2 text-l mb-5 px-4">
          <span className="more-text-gray">Net APY:</span>
          <FormatTwoPourcentage value={item.netAPY} />
        </div>
      </div>
      <div className="relative more-bg-primary px-8 rounded-t-[5px] mx-4">
        <TokenAmount
          title="Authorize"
          token={item.assetAddress}
          amount={amount}
          ltv={"ltv"}
          totalTokenAmount={item.totalDeposits}
        />
        {hasAuth && (
          <CheckCircleIcon
            className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5"
            style={{ position: "absolute", top: "1.5rem", left: "8.5rem" }}
          />
        )}
      </div>
      <div className="relative more-bg-primary px-8 rounded-t-[5px] mx-4">
        <TokenAmount
          title="Permit"
          token={item.assetAddress}
          amount={amount}
          ltv={"ltv"}
          totalTokenAmount={item.totalDeposits}
        />
        {hasPermit && (
          <CheckCircleIcon
            className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5"
            style={{ position: "absolute", top: "1.5rem", left: "6.5rem" }}
          />
        )}
      </div>
      <div className="more-bg-primary px-8 rounded-t-[5px] mx-4">
        <TokenAmount
          title="Withdraw"
          token={item.assetAddress}
          amount={amount}
          ltv={"ltv"}
          totalTokenAmount={item.totalDeposits}
        />
      </div>
      <div className="more-bg-primary rounded-b-[5px] mt-[1px] py-8 px-8 mx-4">
        <div className="text-grey pb-4">Position Change</div>
        <PositionChangeToken
          title="Withdraw"
          value={item.userDeposits}
          token={tokenInfo.symbol}
          value2={item.userDeposits - amount}
        />
      </div>

      {/* <div className="flex flex-row justify-between items-center h-20 pl-2 pr-8 pt-4
        Unwrap USDC
        <MoreToggle />
      </div> */}

      <div className="py-5 px-2 px-4">
        By confirming this transaction, you agree to the{" "}
        <a className="underline" href="#goto">
          Terms of Use
        </a>{" "}
        and the services provisions relating to the MORE Protocol Vault.
      </div>
      <div className="flex justify-end py-5 more-bg-primary rounded-b-[20px] px-4 gap-2">
        <MoreButton
          className="text-2xl py-2"
          text="Cancel"
          onClick={closeModal}
          color="gray"
        />
        <MoreButton
          className="text-2xl py-2"
          text="Withdraw"
          disabled={isLoading}
          onClick={handleWithdraw}
          color="primary"
        />
      </div>
    </div>
  );
};

export default VaultWithdrawPush;
