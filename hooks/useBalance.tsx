import _ from "lodash";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { type GetBalanceReturnType } from "@wagmi/core";

import { initBalance } from "@/utils/const";
import { getTokenBallance } from "@/utils/contract";

const useBalance = (token: string) => {
  const [tokenBalance, setTokenBalance] =
    useState<GetBalanceReturnType>(initBalance);

  const { address: userAddress } = useAccount();

  useEffect(() => {
    const initBalance = async () => {
      if (userAddress) {
        const balance = await getTokenBallance(token, userAddress);
        setTokenBalance(balance);
      }
    };

    initBalance();
  }, [token, userAddress]);

  return {
    tokenBalance,
  };
};

export default useBalance;
