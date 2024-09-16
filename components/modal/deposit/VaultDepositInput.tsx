"use client";

import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import { type GetBalanceReturnType } from "@wagmi/core";
import InputTokenMax from "../../input/InputTokenMax";
import MoreButton from "../../moreButton/MoreButton";
import FormatTokenMillion from "@/components/tools/formatTokenMillion";
import { InvestmentData } from "@/types";
import { getTokenInfo } from "@/utils/utils";
import { initBalance } from "@/utils/const";
import { getTokenBallance } from "@/utils/contract";

interface Props {
  item: InvestmentData;
  closeModal: () => void;
  setAmount: (amount: number) => void;
}

const VaultDepositInput: React.FC<Props> = ({
  item,
  setAmount,
  closeModal,
}) => {
  const { address: userAddress } = useAccount();
  const [deposit, setDeposit] = useState<number>(0);
  const [balanceString, setBalanceString] =
    useState<GetBalanceReturnType>(initBalance);

  useEffect(() => {
    const initBalance = async () => {
      if (userAddress) {
        const balance = await getTokenBallance(item.assetAddress, userAddress);
        setBalanceString(balance);
      }
    };

    initBalance();
  }, [item, userAddress]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.length > 0 ? event.target.value : "0";
    setDeposit(parseFloat(inputValue));
  };

  const handleSetMax = (maxValue: number) => {
    setDeposit(maxValue);
  };

  const handleDeposit = () => {
    if (deposit > 0) {
      setAmount(deposit);
    }
  };

  const tokenInfo = getTokenInfo(item.assetAddress);

  return (
    <div className="more-bg-secondary w-full rounded-[20px]">
      <div className="text-4xl mb-10 px-4 pt-10 ">{item.vaultName}</div>
      <div className="text-l mb-5 px-4">Deposit {tokenInfo.symbol}</div>
      <div className="px-4">
        <InputTokenMax
          type="number"
          value={deposit}
          onChange={handleInputChange}
          placeholder={`Deposit ${tokenInfo.symbol}`}
          token={item.assetAddress}
          balance={Number(balanceString.formatted)}
          setMax={handleSetMax}
        />
      </div>
      <div className="text-right more-text-gray px-4 mt-4">
        Balance: {balanceString.formatted} {tokenInfo.symbol}
      </div>
      <div className="flex justify-end mt-7 mb-7 px-4">
        <div className="mr-5 ">
          <MoreButton
            className="text-2xl py-2"
            text="Cancel"
            onClick={closeModal}
            color="gray"
          />
        </div>
        <MoreButton
          className="text-2xl py-2"
          text="Deposit"
          onClick={() => handleDeposit()}
          color="primary"
        />
      </div>
      <div className="w-[50%] mx-15 flex justify-center mx-auto">
        <div className="glowing-text-primary w-full"></div>
      </div>
      <div className="more-bg-primary px-4 rounded-b-[10px] py-2">
        <div className="flex justify-between mt-10">
          <div>APY:</div>
          <div>
            {item.netAPY}
            <span className="more-text-gray">%</span>
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <div>Total Deposits</div>
          <div>
            <FormatTokenMillion
              value={item.totalDeposits}
              totalValue={item.totalDeposits}
              token={tokenInfo.symbol}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultDepositInput;
