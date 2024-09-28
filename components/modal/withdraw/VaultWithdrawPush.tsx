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
import { getTimestamp, getTokenInfo, notifyError } from "@/utils/utils";
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
  const [permitHash, setPermitHash] = useState("");
  const [deadline, setDeadline] = useState(BigInt(0));
  const [authorizeHash, setAuthorizeHash] = useState("");
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

  const handlePermit = async () => {
    if (userAddress) {
      setIsLoading(true);
      try {
        const permitDeadline =
          deadline == BigInt(0) ? getTimestamp() : deadline;

        const signHash = await setVaultPermit(
          item.vaultName,
          userAddress,
          item.vaultId,
          MaxUint256,
          vaultNonce,
          permitDeadline
        );

        setPermitHash(signHash);
        setHasPermit(true);
        setDeadline(permitDeadline);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        notifyError(err);
      }
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
        setIsLoading(false);
        notifyError(err);
      }
    }
  };

  const handleWithdraw = async () => {
    if (userAddress && hasPermit) {
      setIsLoading(true);
      try {
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

        setTxhash(hash);
        setIsLoading(false);
        validWithdraw();
      } catch (err) {
        setIsLoading(false);
        notifyError(err);
      }
    }
  };

  return (
    <div className="more-bg-secondary w-full rounded-[20px] modal-base">
      <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
      <div className="text-[24px] mb-[40px] font-semibold">Review Transaction</div>
      <div className="text-[20px] font-medium mb-[30px]">{item.vaultName}</div>
      <div className="flex flex-row justify-between items-center mb-[30px]">
        <div className="text-[20px] font-semibold flex items-center gap-3">
          <span className="more-text-gray text-[16px]">Curator:</span>
          <IconToken className="w-[24px] h-[24px]" tokenName="wflow" />
          <span>{"curator"}</span>
        </div>
        <div className="flex gap-2 mb-5 text-[16px]">
          <span className="more-text-gray">Net APY:</span>
          <FormatTwoPourcentage value={item.netAPY} />
        </div>
      </div>
      <div className="relative more-bg-primary rounded-[12px] p-[20px] mb-6">
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
            style={{ position: "absolute", top: "2rem", left: "12rem"  }}
          />
        )}
      </div>
      <div className="relative more-bg-primary rounded-[12px] p-[20px] mb-6">
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
            style={{ position: "absolute", top: "2rem", left: "12rem"  }}
          />
        )}
      </div>
      <div className="relative more-bg-primary rounded-[12px] p-[20px] mb-6">
        <TokenAmount
          title="Withdraw"
          token={item.assetAddress}
          amount={amount}
          ltv={"ltv"}
          totalTokenAmount={item.totalDeposits}
        />
      </div>
      <div className="relative more-bg-primary rounded-[12px] p-[20px] mb-6">
        <div className="text-grey text-[16px] pb-7">Position Change</div>
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
        {!hasAuth ? (
          <MoreButton
            className="text-2xl py-2"
            text="Authorize"
            disabled={isLoading}
            onClick={handleAuthorize}
            color="primary"
          />
        ) : hasPermit ? (
          <MoreButton
            className="text-2xl py-2"
            text="Withdraw"
            disabled={isLoading}
            onClick={handleWithdraw}
            color="primary"
          />
        ) : (
          <MoreButton
            className="text-2xl py-2"
            text="Permit"
            disabled={isLoading}
            onClick={handlePermit}
            color="primary"
          />
        )}
      </div>
    </div>
  );
};

export default VaultWithdrawPush;
