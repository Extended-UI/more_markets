"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { parseEther, toBigInt, MaxUint256 } from "ethers";
import { writeContract, waitForTransaction } from "@wagmi/core";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import MoreButton from "../../moreButton/MoreButton";
import TokenAmount from "@/components/token/TokenAmount";
import IconToken from "@/components/token/IconToken";
import FormatTwoPourcentage from "@/components/tools/formatTwoPourcentage";
import { InvestmentData } from "@/types";
import { config } from "@/utils/wagmi";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { ERC20Abi } from "@/app/abi/ERC20Abi";
import { contracts, tokenAddress } from "@/utils/const";
import { getTokenAllowance } from "@/utils/contract";

interface Props {
  item: InvestmentData;
  amount: number;
  closeModal: () => void;
  validDeposit: () => void;
  setTxhash: (hash: string) => void;
}

const VaultDepositConfirm: React.FC<Props> = ({
  item,
  amount,
  setTxhash,
  validDeposit,
  closeModal,
}) => {
  const { address: userAddress } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [hasApprove, setHasApprove] = useState(false);

  const assetAddress = tokenAddress[item.tokenBalance.symbol.toLowerCase()];

  useEffect(() => {
    const initApprove = async () => {
      const allowance = userAddress
        ? await getTokenAllowance(
            assetAddress,
            userAddress,
            contracts.MORE_MARKETS
          )
        : toBigInt(0);

      if (allowance >= item.tokenBalance.value) setHasApprove(true);
      else setHasApprove(false);
    };

    initApprove();
  }, [userAddress, assetAddress, amount]);

  const handleDeposit = async () => {
    // generate deposit tx
    if (item.market && userAddress) {
      setIsLoading(true);
      try {
        const hash = await writeContract(config, {
          address: contracts.MORE_MARKETS as `0x${string}`,
          abi: MarketsAbi,
          functionName: "supply",
          args: [
            item.market.params,
            parseEther(amount.toString()),
            toBigInt(0),
            userAddress,
            "0x",
          ],
        });

        setTxhash(hash);
        setIsLoading(false);
        validDeposit();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    } else {
      alert("No supply queue");
    }
  };

  const handleApprove = async () => {
    if (userAddress) {
      setIsLoading(true);
      try {
        const hash = await writeContract(config, {
          address: assetAddress,
          abi: ERC20Abi,
          functionName: "approve",
          args: [contracts.MORE_MARKETS as `0x${string}`, MaxUint256],
        });

        await waitForTransaction(config, { hash });

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

  return (
    <div className="more-bg-secondary rounded-[20px] h-full w-full">
      <div className="mb-10 px-4 pt-8  text-2xl">Review Transaction</div>
      <div className="text-l mb-1 px-5 pb-4">{item.vaultName}</div>
      <div className="flex flex-row justify-between items-center px-2">
        <div className="text-l flex items-center gap-2 flex mb-5 px-4">
          <span className="more-text-gray">Curator:</span>
          <IconToken className="w-6 h-6" tokenName={item.tokenSymbol} />
          <span>{item.curator}</span>
        </div>
        <div className="flex  gap-2 text-l mb-5 px-4">
          <span className="more-text-gray">Liquidation LTV:</span>{" "}
          <FormatTwoPourcentage value={item.netAPY} value2={item.netAPY} />{" "}
        </div>
      </div>
      <div className="relative more-bg-primary rounded-[5px] mx-5 px-4 mb-3">
        <TokenAmount
          title="Approve"
          token={item.tokenSymbol}
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

      <div className="more-bg-primary rounded-[5px] mx-5 px-4">
        <TokenAmount
          title="Deposit"
          token={item.tokenSymbol}
          amount={amount}
          ltv={"ltv"}
          totalTokenAmount={item.totalDeposits}
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
        {hasApprove ? (
          <MoreButton
            className="text-2xl py-2"
            text="Deposit"
            disabled={isLoading}
            onClick={() => handleDeposit()}
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

export default VaultDepositConfirm;
