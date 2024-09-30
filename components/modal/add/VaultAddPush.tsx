"use client";

import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import { parseUnits, formatEther } from "ethers";
import MoreButton from "../../moreButton/MoreButton";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import TokenAmount from "@/components/token/TokenAmount";
// import PositionChangeToken from "@/components/token/PositionChangeToken";
import ListIconToken from "@/components/token/ListIconToken";
import { BorrowPosition } from "@/types";
import { contracts, MoreAction } from "@/utils/const";
import { getTimestamp, getTokenInfo, notifyError, delay } from "@/utils/utils";
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

  const collateralToken = getTokenInfo(item.inputToken.id);
  const loanToken = getTokenInfo(item.borrowedToken.id).symbol;
  const supplyAmount = parseUnits(amount.toString(), collateralToken.decimals);

  useEffect(() => {
    const initApprove = async () => {
      const [nonce, allowance] = userAddress
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
          ])
        : [0, BigInt(0)];

      setPermitNonce(nonce);
      if (allowance >= supplyAmount) setHasApprove(true);
      else setHasApprove(false);
    };

    initApprove();
  }, [userAddress, item, supplyAmount]);

  const doApprove = async () => {
    await setTokenAllowance(
      item.inputToken.id,
      contracts.PERMIT2,
      supplyAmount
    );

    setHasApprove(true);
    await delay(2);
  };

  const doPermit = async (deadline: bigint): Promise<string> => {
    if (userAddress && supplyAmount) {
      const signHash = await setTokenPermit(
        item.inputToken.id,
        supplyAmount,
        permitNonce,
        contracts.MORE_BUNDLER,
        deadline
      );

      setHasPermit(true);
      await delay(2);

      return signHash;
    }

    return "";
  };

  const doSupplyCollateral = async (deadline: bigint, signHash: string) => {
    if (userAddress) {
      const txHash = await supplycollateral(
        item.inputToken.id,
        userAddress,
        signHash,
        deadline,
        supplyAmount,
        permitNonce,
        item.marketParams
      );

      await delay(2);
      validAdd();
      setTxHash(txHash);
    }
  };

  const handleSupply = async () => {
    // generate borrow tx
    setIsLoading(true);
    try {
      const deadline = getTimestamp();

      if (!hasApprove) await doApprove();
      const permitHash = hasPermit ? "" : await doPermit(deadline);
      await doSupplyCollateral(deadline, permitHash);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      notifyError(err, MoreAction.ADD_COLLATERAL);
    }
  };

  return (
    <div className="more-bg-secondary w-full rounded-[20px]">
      <div className="text-4xl mb-10 px-4 pt-10">Review Transaction</div>
      <div className="flex items-center mb-10 px-4 gap-3">
        <ListIconToken
          iconNames={[item.inputToken.id, item.borrowedToken.id]}
          className="w-7 h-7"
        />
        <div className="text-l flex items-center'">
          {collateralToken.symbol} / {loanToken}
        </div>
      </div>
      <div className="flex items-center text-l mb-5 px-4">
        <span>
          <CheckCircleIcon className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5" />
        </span>
        Approve the bundler to spend {amount} {collateralToken.symbol} (via
        permit)
      </div>
      <div className="flex items-center text-l mb-5 px-4">
        <span>
          <CheckCircleIcon className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5" />
        </span>
        Bundle the following actions
      </div>

      <div className="more-bg-primary px-4 mx-5 rounded-t-[5px]">
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
          text="Add Collateral"
          disabled={isLoading}
          onClick={handleSupply}
          color="primary"
        />
      </div>
    </div>
  );
};

export default VaultAddPush;
