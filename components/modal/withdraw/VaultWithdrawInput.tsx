"use client";

import React, { useState, useEffect } from "react";
import MoreButton from "../../moreButton/MoreButton";
import InputTokenMax from "../../input/InputTokenMax";
import FormatTwoPourcentage from "@/components/tools/formatTwoPourcentage";
import { IInvestment } from "@/types";
import { errMessages } from "@/utils/errors";
import { getVaultDetail } from "@/utils/contract";
import { zeroBigInt, vaultDailyWithdraw } from "@/utils/const";
import {
  getTokenInfo,
  formatNumberLocale,
  notify,
  validAmountWithBool,
  fetchVaultWithdraw,
  formatTokenValue,
} from "@/utils/utils";

interface Props extends IInvestment {
  useMax: boolean;
  setAmount: (amount: string) => void;
  setUseMax: (useMax: boolean) => void;
}

const VaultWithdrawInput: React.FC<Props> = ({
  item,
  useMax,
  setAmount,
  closeModal,
  setUseMax,
}) => {
  const [withdraw, setWithdraw] = useState("");
  const [showMaxMsg, setShowMaxMsg] = useState(false);
  const [withdrawable, setWithdrawable] = useState(-1);

  useEffect(() => {
    const fetchWithdraw = async () => {
      const withdrawShares = await fetchVaultWithdraw(item.vaultId);
      const dailyWithdrawLimit =
        (item.totalDeposits * vaultDailyWithdraw) / 1e2;
      if (withdrawShares > zeroBigInt) {
        const withdrawnAmount = formatTokenValue(
          (await getVaultDetail(item.vaultId, "convertToAssets", [
            withdrawShares,
          ])) as bigint,
          item.assetAddress
        );
        const withdrawCap =
          withdrawnAmount >= dailyWithdrawLimit
            ? 0
            : dailyWithdrawLimit - withdrawnAmount;
        setWithdrawable(withdrawCap);
        if (withdrawCap == 0) setShowMaxMsg(true);
        else setShowMaxMsg(false);
      } else {
        setWithdrawable(dailyWithdrawLimit);
        setShowMaxMsg(true);
      }
    };

    fetchWithdraw();
  }, [item]);

  useEffect(() => {
    if (
      withdraw.length > 0 &&
      (Number(withdraw) == 0 || Number(withdraw) > withdrawable)
    ) {
      setShowMaxMsg(true);
    } else {
      setShowMaxMsg(false);
    }

    if (Number(withdraw) >= item.userDeposits) setUseMax(true);
    else setUseMax(false);
  }, [withdrawable, withdraw]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWithdraw(event.target.value);
  };

  const handleSetMax = (maxValue: string) => {
    const maxAmount =
      withdrawable >= Number(maxValue) ? maxValue : withdrawable.toString();
    setWithdraw(maxAmount);
  };

  const handleWithdraw = () => {
    if (validAmountWithBool(withdraw, useMax)) {
      if (!showMaxMsg) {
        if (!useMax && Number(withdraw) > item.userDeposits) {
          notify(errMessages.withdraw_exceeded);
        } else {
          setAmount(withdraw);
        }
      }
    } else {
      notify(errMessages.invalid_amount);
    }
  };

  const tokenInfo = getTokenInfo(item.assetAddress);

  return (
    <>
      {withdrawable < 0 ? null : (
        <div className="more-bg-secondary w-full modal-base relative">
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
            <div className="text-[24px] mb-[40px] font-semibold">
              {item.vaultName}
            </div>
            <div className="text-[16px] mb-5">Withdraw {tokenInfo.symbol}</div>
            <div className="w-full flex justify-center">
              <InputTokenMax
                type="number"
                value={withdraw}
                onChange={handleInputChange}
                placeholder="0"
                token={item.assetAddress}
                balance={item.userDeposits.toString()}
                setMax={handleSetMax}
              />
            </div>
            <div className="text-right text-[16px] font-semibold more-text-gray px-4 mt-4">
              Your Deposits: {formatNumberLocale(item.userDeposits)}{" "}
              {tokenInfo.symbol}
            </div>
            {showMaxMsg && (
              <div className="mt-8">
                <div className="text-[16px] p-[20px] text-[#E0DFE3] bg-[#E51F201A] border border-dashed border-[#E51F20] leading-[24px] rounded-[8px]">
                  The protocol is temporarily limiting withdrawals to protect
                  all users from significant spontaneous drawdowns in liquidity.
                  You can withdraw up to {withdrawable.toFixed(2)}{" "}
                  {tokenInfo.symbol}.
                </div>
              </div>
            )}
            <div className="flex justify-end mt-8">
              <div className="mr-5">
                <MoreButton
                  className="text-2xl py-2"
                  text="Cancel"
                  onClick={closeModal}
                  color="grey"
                />
              </div>
              <MoreButton
                className="text-2xl py-2"
                text="Withdraw"
                onClick={handleWithdraw}
                color={showMaxMsg ? "grey" : "primary"}
                disabled1={showMaxMsg}
              />
            </div>
          </div>
          <div className="w-[50%] mx-15 flex justify-center mx-auto">
            <div className="glowing-text-primary !pb-0 w-full" />
          </div>
          <div className="items-center more-bg-primary rounded-b-[20px] px-12 py-8 text-[16px] font-normal">
            <div className="flex justify-between">
              <span>APY</span>
              <FormatTwoPourcentage
                value={item.netAPY.total_apy}
                multiplier={1}
              />
            </div>
            <div className="flex justify-between pt-5">
              <span>Available Liquidity</span>
              <FormatTwoPourcentage
                value={withdrawable.toFixed(2) + " " + tokenInfo.symbol}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VaultWithdrawInput;
