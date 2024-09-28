"use client";

import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import { parseUnits, formatEther } from "ethers";
import MoreButton from "../../moreButton/MoreButton";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import TokenAmount from "@/components/token/TokenAmount";
import PositionChangeToken from "@/components/token/PositionChangeToken";
import ListIconToken from "@/components/token/ListIconToken";
import { BorrowPosition } from "@/types";
import { contracts } from "@/utils/const";
import { getTimestamp, getTokenInfo, notifyError } from "@/utils/utils";
import {
  getTokenAllowance,
  setTokenAllowance,
  setTokenPermit,
  getPermitNonce,
  supplycollateral,
} from "@/utils/contract";

interface Props {
  amount: number;
  item: BorrowPosition;
  closeModal: () => void;
  validAdd: () => void;
  setTxHash: (hash: string) => void;
}

const VaultAddPush: React.FC<Props> = ({
  item,
  amount,
  setTxHash,
  validAdd,
  closeModal,
}) => {
  const { address: userAddress } = useAccount();

  const [hasPermit, setHasPermit] = useState(false);
  const [permitNonce, setPermitNonce] = useState(0);
  const [hasApprove, setHasApprove] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signHash, setSignHash] = useState("");
  const [deadline, setDeadline] = useState(BigInt(0));

  const collateralToken = getTokenInfo(item.inputToken.id);
  const loanToken = getTokenInfo(item.borrowedToken.id).symbol;
  const roundedAmount = Number(amount.toFixed(collateralToken.decimals));
  const supplyAmount = parseUnits(roundedAmount.toString(), collateralToken.decimals);

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

      if (allowance >= supplyAmount) setHasApprove(true);
      else setHasApprove(false);
    };

    initApprove();
  }, [userAddress, item, supplyAmount]);

  const handleApprove = async () => {
    if (userAddress) {
      setIsLoading(true);
      try {
        await setTokenAllowance(
          item.inputToken.id,
          contracts.PERMIT2,
          supplyAmount
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
    if (userAddress && supplyAmount > 0) {
      setIsLoading(true);
      try {
        const deadline = getTimestamp();
        const signHash = await setTokenPermit(
          item.inputToken.id,
          supplyAmount,
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

  const handleSupply = async () => {
    // generate borrow tx
    if (userAddress && hasApprove && hasPermit) {
      setIsLoading(true);
      try {
        const txHash = await supplycollateral(
          item.inputToken.id,
          userAddress,
          signHash,
          deadline,
          supplyAmount,
          permitNonce,
          item.marketParams
        );

        validAdd();
        setTxHash(txHash);
        setIsLoading(false);
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
      <div className="flex items-center mb-[30px] font-semibold text-[20px] gap-2">
        <ListIconToken
          iconNames={[item.inputToken.id, item.borrowedToken.id]}
          className="w-[24px] h-[24px]"
        />
        <div className="ml-3 flex items-center">
          {collateralToken.symbol} / {loanToken}
        </div>
      </div>
      <div className="relative flex items-start text-[20px] leading-[1.2] mb-[30px]">
        <span>
          <CheckCircleIcon className="text-secondary text-xl cursor-pointer w-[30px] !h-[30px] mr-5" />
        </span>
        Approve the bundler to spend {amount} {collateralToken.symbol} (via
        permit)
      </div>
      <div className="relative flex items-start text-[20px] leading-[1.2] mb-[30px]">
        <span>
          <CheckCircleIcon className="text-secondary text-xl cursor-pointer w-[30px] !h-[30px] mr-5" />
        </span>
        Bundle the following actions
      </div>

      <div className="relative more-bg-primary rounded-[12px] p-[20px] mb-6">
        <TokenAmount
          title="Add Collateral"
          token={item.inputToken.id}
          amount={amount}
          ltv={formatEther(item.marketParams.lltv)}
          totalTokenAmount={amount}
        />
      </div>
      {/* <div className="more-bg-primary rounded-b-[5px] mt-[1px] py-8 px-8">
        <div className="text-grey pb-4"> Position Change </div>
        <PositionChangeToken
          title="Deposit"
          value={amount}
          token={collateralToken.symbol}
          value2={0}
        />
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
        {hasApprove && hasPermit ? (
          <MoreButton
            className="text-2xl py-2"
            text="Add Collateral"
            disabled={isLoading}
            onClick={handleSupply}
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
            onClick={() => handleApprove()}
            color="primary"
          />
        )}
      </div>
    </div>
  );
};

export default VaultAddPush;
