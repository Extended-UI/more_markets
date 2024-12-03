"use client";

import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import { type GetBalanceReturnType } from "@wagmi/core";
import MoreRadio from "@/components/moreRadio/MoreRadio";
import MoreButton from "@/components/moreButton/MoreButton";
import InputTokenMax from "@/components/input/InputTokenMax";
import FormatTokenMillion from "@/components/tools/formatTokenMillion";
import { IInvestment } from "@/types";
import { initBalance } from "@/utils/const";
import { errMessages } from "@/utils/errors";
import { getTokenBallance } from "@/utils/contract";
import { getTokenInfo, notify, validInputAmount, isFlow } from "@/utils/utils";

interface Props extends IInvestment {
  useFlow: boolean;
  setAmount: (amount: string) => void;
  setUseFlow: (useWflow: boolean) => void;
}

const VaultDepositInput: React.FC<Props> = ({
  item,
  useFlow,
  setAmount,
  closeModal,
  setUseFlow,
}) => {
  const { address: userAddress } = useAccount();
  const [deposit, setDeposit] = useState("");
  const [balanceString, setBalanceString] =
    useState<GetBalanceReturnType>(initBalance);
  const [wflowBalanceString, setWflowBalanceString] =
    useState<GetBalanceReturnType>(initBalance);

  const tokenInfo = getTokenInfo(item.assetAddress);

  useEffect(() => {
    const initBalance = async () => {
      if (userAddress) {
        setBalanceString(
          await getTokenBallance(item.assetAddress, userAddress)
        );

        if (isFlow(item.assetAddress)) {
          setWflowBalanceString(
            await getTokenBallance(item.assetAddress, userAddress, false)
          );
        }
      }
    };

    initBalance();
  }, [item, userAddress]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit(event.target.value);
  };

  const handleSetMax = (maxValue: string) => {
    setDeposit(maxValue);
  };

  const handleDeposit = () => {
    if (validInputAmount(deposit)) {
      if (Number(deposit) > Number(getBalanceStr())) {
        notify(errMessages.insufficient_amount);
      } else {
        setAmount(deposit);
      }
    } else {
      notify(errMessages.invalid_amount);
    }
  };

  const getBalanceStr = (): string => {
    return useFlow ? balanceString.formatted : wflowBalanceString.formatted;
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
        <div className="text-[24px] mb-[40px] font-semibold">
          {item.vaultName}
        </div>
        <div className="text-l text-[16px] mb-5">
          Deposit {tokenInfo.symbol}
        </div>
        <MoreRadio
          useFlow={useFlow}
          setUseFlow={setUseFlow}
          asset={item.assetAddress}
        />
        <InputTokenMax
          type="number"
          value={deposit}
          onChange={handleInputChange}
          placeholder="0"
          token={item.assetAddress}
          balance={getBalanceStr()}
          setMax={handleSetMax}
        />
        <div className="text-right text-[16px] font-semibold more-text-gray px-4 mt-4">
          Balance: {getBalanceStr()} {useFlow ? tokenInfo.symbol : "WFLOW"}
        </div>
        <div className="flex justify-end mt-[40px]">
          <div className="mr-5">
            <MoreButton
              className="text-2xl py-2"
              text="Cancel"
              onClick={closeModal}
              color="grey"
            />
          </div>
          <MoreButton
            className="text-2xl py-2 "
            text="Deposit"
            onClick={handleDeposit}
            color="primary"
          />
        </div>
      </div>
      <div className=""></div>
      <div className="more-bg-primary rounded-b-[20px] px-[28px] pb-[40px] pt-[30px] text-[16px] font-normal">
        <div className="flex justify-between mb-4">
          <div>APY:</div>
          <div>
            <span className="more-text-gray">
              {item.netAPY.total_apy.toFixed(2)} %
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-12">
          <div className="">Total Deposits</div>
          <div>
            <FormatTokenMillion
              value={item.totalDeposits}
              totalValue={0}
              token={item.assetAddress}
              inTable={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultDepositInput;
