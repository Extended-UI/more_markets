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
import { getTimestamp, getTokenInfo, notifyError, delay } from "@/utils/utils";
import {
  getTokenAllowance,
  setTokenAllowance,
  setTokenPermit,
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
        const [nonce, allowance] = userAddress
          ? await Promise.all([
              getPermitNonce([
                userAddress,
                item.assetAddress,
                contracts.MORE_BUNDLER,
              ]),
              getTokenAllowance(
                item.assetAddress,
                userAddress,
                contracts.PERMIT2
              ),
            ])
          : [0, BigInt(0)];

        setPermitNonce(nonce);
        if (allowance >= tokenAmount) setHasApprove(true);
        else setHasApprove(false);
      }
    };

    initApprove();
  }, [userAddress, item, tokenAmount, flowVault]);

  const doApprove = async () => {
    await setTokenAllowance(item.assetAddress, contracts.PERMIT2, tokenAmount);
    setHasApprove(true);
  };

  const doPermit = async (deadline: bigint): Promise<string> => {
    const signHash = await setTokenPermit(
      item.assetAddress,
      tokenAmount,
      permitNonce,
      contracts.MORE_BUNDLER,
      deadline
    );

    setHasPermit(true);

    // sleep 1 sec
    await delay(2);
    return signHash;
  };

  const doDeposit = async (deadline: bigint, signHash: string) => {
    if (userAddress) {
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

      await delay(2);
      validDeposit();
      setTxHash(txHash);
    }
  };

  const handleDeposit = async () => {
    // generate deposit tx
    setIsLoading(true);
    try {
      const deadline = getTimestamp();
      if (!hasApprove) await doApprove();
      const signHash = hasPermit ? "" : await doPermit(deadline);
      await doDeposit(deadline, signHash);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      notifyError(err);
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
      <div className="flex justify-end py-5 more-bg-primary rounded-b-[20px] px-4 gap-2">
        <MoreButton
          className="text-2xl py-2"
          text="Cancel"
          onClick={closeModal}
          color="gray"
        />
        <MoreButton
          className="text-2xl py-2"
          text="Deposit"
          disabled={isLoading}
          onClick={handleDeposit}
          color="primary"
        />
      </div>
    </div>
  );
};

export default VaultDepositPush;
