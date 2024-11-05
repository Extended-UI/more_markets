"use client";

import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import { type GetBalanceReturnType } from "@wagmi/core";
import { formatUnits, parseUnits, ZeroAddress } from "ethers";
import MoreButton from "../../moreButton/MoreButton";
import InputTokenMax from "../../input/InputTokenMax";
import FormatPourcentage from "@/components/tools/formatPourcentage";
import { IBorrowPosition } from "@/types";
import { oraclePriceScale, initBalance } from "@/utils/const";
import {
  getTokenBallance,
  getTokenPairPrice,
  getPosition,
  getBorrowedAmount,
} from "@/utils/contract";
import {
  getTokenInfo,
  getPremiumLltv,
  getAvailableLiquidity,
  mulDivDown,
  wMulDown,
  formatTokenValue,
  formatNumberLocale,
  getExtraMax,
  validInputAmount,
} from "@/utils/utils";

interface Props extends IBorrowPosition {
  onlyBorrow?: boolean;
  setAmount: (amount: string, borrow: string) => void;
}

const VaultBorrowInput: React.FC<Props> = ({
  item,
  onlyBorrow,
  setAmount,
  closeModal,
}) => {
  const [borrow, setBorrow] = useState("");
  const [deposit, setDeposit] = useState("");
  const [pairPrice, setPairPrice] = useState(BigInt(0));
  const [loan, setLoan] = useState(BigInt(0));
  const [collateral, setCollateral] = useState(BigInt(0));
  const [supplyBalance, setSupplyBalance] =
    useState<GetBalanceReturnType>(initBalance);

  const { address: userAddress } = useAccount();

  const collateralToken = getTokenInfo(item.inputToken.id);
  const borrowToken = getTokenInfo(item.borrowedToken.id);
  const lltv2: number | null = getPremiumLltv(item.marketParams);
  const availableLiquidity = getAvailableLiquidity(
    item.marketInfo,
    item.borrowedToken.id
  );

  const isPremiumUser = item.lastMultiplier != BigInt(1e18);

  useEffect(() => {
    const initBalances = async () => {
      const [userSupplyBalance, tokenPairPrice, positionInfo] =
        await Promise.all([
          getTokenBallance(item.inputToken.id, userAddress),
          getTokenPairPrice(item.marketParams.oracle),
          getPosition(userAddress || ZeroAddress, item.id),
        ]);

      setPairPrice(tokenPairPrice);
      setSupplyBalance(userSupplyBalance);
      if (positionInfo) {
        setCollateral(positionInfo.collateral);
        setLoan(
          await getBorrowedAmount(
            item.id,
            positionInfo.lastMultiplier,
            positionInfo.borrowShares
          )
        );
      }
    };

    initBalances();
  }, [item, userAddress]);

  const handleInputDepositChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeposit(event.target.value);
  };

  const handleInputBorrowChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBorrow(event.target.value);
  };

  const handleSetMaxToken = (maxValue: string) => {
    setDeposit(maxValue);
  };

  const handleSetMaxFlow = (maxValue: string) => {
    const totalCollateral = onlyBorrow
      ? item.collateral
      : collateral + parseUnits(deposit, collateralToken.decimals);

    let maxBorrow = mulDivDown(totalCollateral, pairPrice, oraclePriceScale);
    maxBorrow = wMulDown(maxBorrow, item.lltv);
    maxBorrow = getExtraMax(
      maxBorrow,
      onlyBorrow ? item.loan : loan,
      borrowToken.decimals
    );
    setBorrow(formatUnits(maxBorrow, borrowToken.decimals));
  };

  const handleBorrow = () => {
    if (validInputAmount(borrow)) {
      if (onlyBorrow) {
        setAmount("0", borrow);
      } else if (validInputAmount(deposit)) {
        setAmount(deposit, borrow);
      }
    }
  };

  return (
    <div className="more-bg-secondary w-full rounded-[20px] modal-base relative">
      <div
        className="rounded-full bg-[#343434] hover:bg-[#3f3f3f] p-6 absolute right-4 top-4"
        onClick={closeModal}
      >
        <img
          src={"/assets/icons/close.svg"}
          alt="close"
          className="w-[12px] h-[12px]"
        />
      </div>
      <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
        <div className="text-[24px] mb-[40px] font-semibold">Borrow</div>
        {!onlyBorrow && (
          <>
            <div className="text-[16px] mb-5">
              Deposit {collateralToken.symbol} Collateral
            </div>
            <div className="">
              <InputTokenMax
                type="number"
                value={deposit}
                onChange={handleInputDepositChange}
                placeholder="0"
                token={item.inputToken.id}
                balance={supplyBalance.formatted}
                setMax={handleSetMaxToken}
              />
            </div>
            <div className="text-right text-[16px] font-semibold more-text-gray px-4 mt-4">
              Balance: {supplyBalance.formatted + " " + collateralToken.symbol}
            </div>
          </>
        )}
        <div className="text-[16px] mb-5">Borrow {borrowToken.symbol}</div>
        <InputTokenMax
          type="number"
          value={borrow}
          onChange={handleInputBorrowChange}
          placeholder="0"
          token={item.borrowedToken.id}
          balance={availableLiquidity.toString()}
          setMax={handleSetMaxFlow}
        />
        <div className="text-right text-[16px] font-semibold more-text-gray px-4 mt-4">
          Maximum Available to Borrow: {formatNumberLocale(availableLiquidity)}{" "}
          {borrowToken.symbol}
        </div>
        <div className="flex justify-end mt-[40px] mb">
          <div className="mr-5">
            <MoreButton
              className="text-2xl py-2"
              text="Cancel"
              onClick={closeModal}
              color="grey"
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
      </div>
      <div className="w-[50%] mx-15 flex justify-center mx-auto">
        <div className="glowing-text-secondary !p-0 w-full"></div>
      </div>
      <div className="more-bg-primary rounded-b-[20px] px-[28px] pb-[40px] pt-[30px] text-[16px] font-normal">
        <div className="flex justify-between">
          <div>1D Borrow APY:</div>
          <div>
            <span className="more-text-gray">
              {(item.borrow_apr * 100).toFixed(2)} %
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-10 pb-4">
          <div>LLTV:</div>
          <div>
            <FormatPourcentage value={formatTokenValue(item.lltv, "", 18)} />
          </div>
        </div>
        {lltv2 && isPremiumUser && (
          <div className="flex justify-between mt-10 pb-4">
            <div>Your Premium Liquidation LTV:</div>
            <div>
              <FormatPourcentage value={lltv2} />
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
