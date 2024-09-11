"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import { parseEther } from "ethers";
import MoreButton from "../../moreButton/MoreButton";
import TokenAmount from "../../token/TokenAmount";
import PositionChangeToken from "@/components/token/PositionChangeToken";
import MoreToggle from "@/components/moreToggle/MoreToggle";
import FormatTwoPourcentage from "@/components/tools/formatTwoPourcentage";
import IconToken from "@/components/token/IconToken";
import { DepositMoreData } from "@/types";
import { sendToMarkets } from "@/utils/contract";

interface Props {
  item: DepositMoreData;
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
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdraw = async () => {
    if (item.market && userAddress) {
      setIsLoading(true);
      try {
        const hash = await sendToMarkets("withdraw", [
          item.market.params,
          0,
          parseEther(item.depositAmount.toString()),
          userAddress,
          userAddress,
        ]);

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
      <div className="text-l mb-1 px-4 pt-5 ">{item.tokenName}</div>
      <div className="flex flex-row justify-between mt-4 items-center">
        <div className="flex gap-2 text-l mb-5  px-4 items-center">
          {" "}
          <span className="more-text-gray">Curator:</span>
          <IconToken className="w-6 h-6" tokenName="abt" />{" "}
          <span>{"curator"}</span>
        </div>
        <div className="flex gap-2 text-l mb-5 px-4">
          <span className="more-text-gray">Liquidation LTV:</span>{" "}
          <FormatTwoPourcentage value={90} value2={125} />{" "}
        </div>
      </div>
      <div className="more-bg-primary px-8 rounded-t-[5px] ">
        <TokenAmount
          title="Withdraw"
          token={item.tokenName}
          amount={amount}
          ltv={"ltv"}
          totalTokenAmount={item.depositAmount}
        />
      </div>
      <div className="more-bg-primary rounded-b-[5px] mt-[1px] py-8 px-8 ">
        <div className="text-grey pb-4"> Position Change </div>
        <PositionChangeToken
          title="Withdraw"
          value={amount}
          token={item.tokenName}
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
        <MoreButton
          className="text-2xl py-2"
          text="Withdraw"
          disabled={isLoading}
          onClick={handleWithdraw}
          color="primary"
        />
      </div>
    </div>
  );
};

export default VaultWithdrawPush;
