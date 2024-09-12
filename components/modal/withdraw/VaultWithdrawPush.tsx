"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { parseUnits } from "ethers";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import MoreButton from "../../moreButton/MoreButton";
import TokenAmount from "../../token/TokenAmount";
import PositionChangeToken from "@/components/token/PositionChangeToken";
import MoreToggle from "@/components/moreToggle/MoreToggle";
import FormatTwoPourcentage from "@/components/tools/formatTwoPourcentage";
import IconToken from "@/components/token/IconToken";
import { InvestmentData } from "@/types";
import { getTimestamp } from "@/utils/utils";
import {
  withdrawFromVaults,
  getVaultNonce,
  setVaultPermit,
} from "@/utils/contract";

interface Props {
  item: InvestmentData;
  amount: number;
  closeModal: () => void;
  validWithdraw: () => void;
  setTxhash: (hash: string) => void;
}

const VaultWithdrawPush: React.FC<Props> = ({
  item,
  amount,
  setTxhash,
  closeModal,
  validWithdraw,
}) => {
  const { address: userAddress } = useAccount();
  const [hasPermit, setHasPermit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [permitHash, setPermitHash] = useState("");
  const [deadline, setDeadline] = useState(BigInt(0));
  const [vaultNonce, setVaultNonce] = useState(BigInt(0));

  const tokenAmount = parseUnits(amount.toString(), item.tokenBalance.decimals);

  useEffect(() => {
    const initApprove = async () => {
      const nonce = userAddress
        ? await getVaultNonce(item.vaultId as `0x${string}`, userAddress)
        : BigInt(0);
      setVaultNonce(nonce);
    };

    initApprove();
  }, [userAddress, item, amount, isLoading]);

  const handlePermit = async () => {
    if (userAddress) {
      try {
        const deadline = getTimestamp();
        const signHash = await setVaultPermit(
          item.vaultName,
          userAddress,
          item.vaultId,
          tokenAmount,
          vaultNonce,
          deadline
        );

        setPermitHash(signHash);
        setHasPermit(true);
        setDeadline(deadline);
      } catch (err) {}
    }
  };

  const handleWithdraw = async () => {
    if (userAddress && hasPermit) {
      setIsLoading(true);
      try {
        const hash = await withdrawFromVaults(
          item.vaultId,
          userAddress,
          tokenAmount,
          deadline,
          permitHash
        );

        setTxhash(hash);
        setIsLoading(false);
        validWithdraw();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="more-bg-secondary rounded-[20px] h-full w-full px-4">
      <div className="mb-10 px-4 pt-10  text-3xl">Review Transaction</div>
      <div className="text-l mb-1 px-4 pt-5 ">{item.tokenSymbol}</div>
      <div className="flex flex-row justify-between mt-4 items-center">
        <div className="flex gap-2 text-l mb-5  px-4 items-center">
          {" "}
          <span className="more-text-gray">Curator:</span>
          <IconToken className="w-6 h-6" tokenName="abt" />{" "}
          <span>{"curator"}</span>
        </div>
        <div className="flex gap-2 text-l mb-5 px-4">
          <span className="more-text-gray">Liquidation LTV:</span>{" "}
          <FormatTwoPourcentage value={90} />{" "}
        </div>
      </div>
      <div className="relative more-bg-primary px-8 rounded-t-[5px] ">
        <TokenAmount
          title="Permit"
          token={item.tokenSymbol}
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
      <div className="more-bg-primary px-8 rounded-t-[5px] ">
        <TokenAmount
          title="Withdraw"
          token={item.tokenSymbol}
          amount={amount}
          ltv={"ltv"}
          totalTokenAmount={item.totalDeposits}
        />
      </div>
      <div className="more-bg-primary rounded-b-[5px] mt-[1px] py-8 px-8 ">
        <div className="text-grey pb-4"> Position Change </div>
        <PositionChangeToken
          title="Withdraw"
          value={amount}
          token={item.tokenSymbol}
          value2={0}
        />
      </div>

      {/* <div className="flex flex-row justify-between items-center h-20 pl-2 pr-8 pt-4 ">
        Unwrap USDC
        <MoreToggle />
      </div> */}

      <div className="py-5 px-2">
        By confirming this transaction, you agree to the{" "}
        <a className="underline" href="#goto">
          Terms of Use
        </a>{" "}
        and the services provisions relating to the MORE Protocol Vault.
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
        {hasPermit ? (
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
