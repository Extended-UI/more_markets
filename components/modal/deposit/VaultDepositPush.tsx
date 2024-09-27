"use client";

import { useAccount } from "wagmi";
import { parseUnits, ZeroAddress } from "ethers";
import React, { useEffect, useState } from "react";
import MoreButton from "../../moreButton/MoreButton";
import IconToken from "@/components/token/IconToken";
import TokenAmount from "@/components/token/TokenAmount";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import FormatTwoPourcentage from "@/components/tools/formatTwoPourcentage";
import { InvestmentData } from "@/types";
import { contracts } from "@/utils/const";
import { getTimestamp, getTokenInfo, notifyError } from "@/utils/utils";
import {
  getTokenAllowance,
  setTokenAllowance,
  setTokenPermit,
  getTokenPermit,
  getPermitNonce,
  supplyToVaults,
} from "@/utils/contract";

interface Props {
  amount: number;
  useFlow: boolean;
  item: InvestmentData;
  closeModal: () => void;
  validDeposit: () => void;
  setTxHash: (hash: string) => void;
}

const VaultDepositPush: React.FC<Props> = ({
  item,
  amount,
  useFlow,
  setTxHash,
  closeModal,
  validDeposit,
}) => {
  const { address: userAddress } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [hasApprove, setHasApprove] = useState(false);
  const [hasPermit, setHasPermit] = useState(false);
  const [signHash, setSignHash] = useState("");
  const [deadline, setDeadline] = useState(BigInt(0));
  const [permitNonce, setPermitNonce] = useState(0);

  const tokenAmount = parseUnits(
    amount.toString(),
    getTokenInfo(item.assetAddress).decimals
  );

  const flowVault =
    useFlow &&
    item.assetAddress.toLowerCase() == contracts.WNATIVE.toLowerCase();

  useEffect(() => {
    const initApprove = async () => {
      if (flowVault) {
        setHasPermit(true);
        setHasApprove(true);
      } else {
        const nonce = userAddress
          ? await getPermitNonce([
              userAddress,
              item.assetAddress,
              contracts.MORE_BUNDLER,
            ])
          : 0;
        setPermitNonce(nonce);

        const tokenPermit = userAddress
          ? await getTokenPermit([
              userAddress,
              item.assetAddress,
              contracts.MORE_BUNDLER,
            ])
          : BigInt(0);
        if (tokenPermit >= tokenAmount) setHasPermit(true);

        const allowance = userAddress
          ? await getTokenAllowance(
              item.assetAddress,
              userAddress,
              contracts.PERMIT2
            )
          : BigInt(0);

        if (allowance >= tokenAmount) setHasApprove(true);
        else setHasApprove(false);
      }
    };

    initApprove();
  }, [userAddress, item, amount, isLoading, flowVault]);

  const handleApprove = async () => {
    if (userAddress) {
      setIsLoading(true);
      try {
        await setTokenAllowance(
          item.assetAddress,
          contracts.PERMIT2,
          tokenAmount
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
    if (userAddress) {
      setIsLoading(true);
      try {
        const deadline = getTimestamp();
        const signHash = await setTokenPermit(
          item.assetAddress,
          tokenAmount,
          permitNonce,
          contracts.MORE_BUNDLER,
          deadline
        );

        setSignHash(signHash);
        setDeadline(deadline);

        setHasPermit(true);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        notifyError(err);
      }
    }
  };

  const handleDeposit = async () => {
    // generate deposit tx
    if (userAddress && hasApprove && hasPermit) {
      setIsLoading(true);
      try {
        const txHash = await supplyToVaults(
          item.vaultId,
          item.assetAddress,
          userAddress,
          signHash,
          deadline,
          tokenAmount,
          permitNonce,
          flowVault
        );

        validDeposit();
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
      <div className="mb-10 px-4 pt-8  text-2xl">Review Transaction</div>
      <div className="text-l mb-1 px-5 pb-4">{item.vaultName}</div>
      <div className="flex flex-row justify-between items-center px-2">
        <div className="text-l flex items-center gap-2 flex mb-5 px-4">
          <span className="more-text-gray">Curator:</span>
          <IconToken className="w-6 h-6" tokenName="wflow" />
          <span>{item.curator}</span>
        </div>
        <div className="flex gap-2 text-l mb-5 px-4">
          <span className="more-text-gray">Net APY:</span>
          <FormatTwoPourcentage value={item.netAPY} />
        </div>
      </div>
      {!flowVault && (
        <>
          <div className="relative more-bg-primary rounded-[5px] mx-5 px-4 mb-3">
            <TokenAmount
              title="Approve"
              token={item.assetAddress}
              amount={amount}
              ltv={"ltv"}
              totalTokenAmount={item.totalDeposits}
            />
            {hasApprove && (
              <CheckCircleIcon
                className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5"
                style={{ position: "absolute", top: "1.5rem", left: "6.5rem" }}
              />
            )}
          </div>

          <div className="relative more-bg-primary rounded-[5px] mx-5 px-4 mb-3">
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
        </>
      )}

      <div className="more-bg-primary rounded-[5px] mx-5 px-4">
        <TokenAmount
          title="Deposit"
          token={flowVault ? ZeroAddress : item.assetAddress}
          amount={amount}
          ltv={""}
          totalTokenAmount={0}
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
            text="Deposit"
            disabled={isLoading}
            onClick={() => handleDeposit()}
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

export default VaultDepositPush;
