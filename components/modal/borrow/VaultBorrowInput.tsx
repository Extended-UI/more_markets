"use client";

import { useAccount } from "wagmi";
import { formatUnits, parseUnits } from "ethers";
import React, { useState, useEffect } from "react";
import { type GetBalanceReturnType } from "@wagmi/core";
import MoreButton from "../../moreButton/MoreButton";
import InputTokenMax from "../../input/InputTokenMax";
import FormatPourcentage from "@/components/tools/formatPourcentage";
import { BorrowPosition } from "@/types";
import { oraclePriceScale } from "@/utils/const";
import { getTokenBallance, getTokenPairPrice } from "@/utils/contract";
import {
  getTokenInfo,
  getPremiumLltv,
  getAvailableLiquidity,
  mulDivDown,
  wMulDown,
} from "@/utils/utils";

interface Props {
  item: BorrowPosition;
  onlyBorrow?: boolean;
  closeModal: () => void;
  setAmount: (amount: number, borrow: number) => void;
}

const VaultBorrowInput: React.FC<Props> = ({
  item,
  onlyBorrow,
  setAmount,
  closeModal,
}) => {
  const [borrow, setBorrow] = useState<number>();
  const [deposit, setDeposit] = useState<number>();
  const [pairPrice, setPairPrice] = useState(BigInt(0));
  const [supplyBalance, setSupplyBalance] =
    useState<GetBalanceReturnType | null>(null);

  const { address: userAddress } = useAccount();

  const collateralToken = getTokenInfo(item.inputToken.id);
  const borrowToken = getTokenInfo(item.borrowedToken.id);
  const lltv2: number | null = getPremiumLltv(item.marketParams);
  const availableLiquidity = getAvailableLiquidity(
    item.marketInfo,
    item.borrowedToken.id
  );

  const handleInputDepositChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputVal =
      event.target.value.length > 0
        ? parseFloat(event.target.value)
        : undefined;
    setDeposit(inputVal);
  };

  const handleInputBorrowChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputVal =
      event.target.value.length > 0
        ? parseFloat(event.target.value)
        : undefined;
    setBorrow(inputVal);
  };

  const handleSetMaxToken = (maxValue: number) => {
    setDeposit(maxValue);
  };

  const handleSetMaxFlow = (maxValue: number) => {
    let maxBorrow = BigInt(0);
    if (onlyBorrow) {
      maxBorrow = mulDivDown(item.collateral, pairPrice, oraclePriceScale);
      maxBorrow = wMulDown(maxBorrow, item.lltv);
      maxBorrow = maxBorrow >= item.loan ? maxBorrow - item.loan : BigInt(0);
    } else if (deposit) {
      const depositAmount = parseUnits(
        deposit.toString(),
        collateralToken.decimals
      );
      maxBorrow = mulDivDown(depositAmount, pairPrice, oraclePriceScale);
      maxBorrow = wMulDown(maxBorrow, item.lltv);
    }

    setBorrow(Number(formatUnits(maxBorrow, borrowToken.decimals)));
  };

  const handleBorrow = () => {
    if (borrow && borrow > 0) {
      if (onlyBorrow) {
        setAmount(0, borrow);
      } else if (deposit && deposit > 0) {
        setAmount(deposit, borrow);
      }
    }
  };

  useEffect(() => {
    const initBalances = async () => {
      const [userSupplyBalance, tokenPairPrice] = await Promise.all([
        getTokenBallance(item.inputToken.id, userAddress),
        getTokenPairPrice(item.marketParams.oracle),
      ]);

      setSupplyBalance(userAddress ? userSupplyBalance : null);
      setPairPrice(tokenPairPrice);
    };

    initBalances();
  }, [item, userAddress]);

  return (
    <div className="more-bg-secondary w-full rounded-[20px]">
      <div className="text-2xl mb-10 px-4 pt-5">Borrow</div>
      {!onlyBorrow && (
        <>
          <div className="text-l mb-1 px-4">
            Deposit {collateralToken.symbol} Collateral
          </div>
          <div className="py-2 px-4">
            <InputTokenMax
              type="number"
              value={deposit}
              onChange={handleInputDepositChange}
              placeholder="0"
              token={item.inputToken.id}
              balance={supplyBalance ? Number(supplyBalance.formatted) : 0}
              setMax={handleSetMaxToken}
            />
          </div>
          <div className="text-right more-text-gray py-2 px-4">
            Balance: {supplyBalance ? Number(supplyBalance.formatted) : 0}{" "}
            {collateralToken.symbol}
          </div>
        </>
      )}
      <div className="text-l mb-1 px-4 py-2 mt-3">
        Borrow {borrowToken.symbol}
      </div>
      <div className="px-4">
        <InputTokenMax
          type="number"
          value={borrow}
          onChange={handleInputBorrowChange}
          placeholder="0"
          token={item.borrowedToken.id}
          balance={availableLiquidity}
          setMax={handleSetMaxFlow}
        />
      </div>
      <div className="text-right more-text-gray py-2 px-4">
        Maximum Available to Borrow: {availableLiquidity} {borrowToken.symbol}
      </div>
      <div className="flex justify-end mt-7 mb-7 px-4">
        <div className="mr-5">
          <MoreButton
            className="text-2xl py-2"
            text="Cancel"
            onClick={closeModal}
            color="gray"
          />
        </div>
        <div className="mr-5">
          <MoreButton
            className="text-2xl py-2"
            text={onlyBorrow ? "Borrow More" : "Borrow"}
            onClick={handleBorrow}
            color="primary"
          />
        </div>
      </div>
      <div className="w-[50%] mx-15 flex justify-center mx-auto">
        <div className="glowing-text-secondary w-full"></div>
      </div>
      <div className="more-bg-primary px-4 rounded-b-[10px] py-2 pb-5">
        <div className="flex justify-between mt-4">
          <div>1D Borrow APY:</div>
          <div>
            N/A
            {/* <span className="more-text-gray">%</span> */}
          </div>
        </div>
        {lltv2 && (
          <div className="flex justify-between mt-10 pb-4">
            <div>Your Premium Liquidation LTV</div>
            <div>
              <FormatPourcentage value={lltv2.toFixed(2)} />{" "}
            </div>
          </div>
        )}

        {/* <div className="flex justify-between mt-10 pb-4">
          <div>Your Credora Rating</div>
          <div className="">{0}</div>
        </div> */}
      </div>
    </div>
  );
};

export default VaultBorrowInput;
