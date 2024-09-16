"use client";

import React, { useState } from "react";
import MoreButton from "../../moreButton/MoreButton";

interface Props {
  wallet: string;
  closeModal: () => void;
}

const GetFaucet: React.FC<Props> = ({ wallet, closeModal }) => {
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initFaucet = async () => {
    if (wallet) {
      setCompleted(false);
      setIsLoading(true);
      try {
        const res = await fetch("/api/faucet", {
          method: "POST",
          body: JSON.stringify({ wallet }),
          headers: {
            "content-type": "application/json",
          },
        });

        if (res.ok) {
          // console.log("Yeai!");
        } else {
          // console.log("Oops! Something is wrong.");
        }

        setCompleted(true);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="more-bg-secondary w-full rounded-[20px]">
      <div className="text-4xl mb-10 px-4 pt-10 ">
        Faucet - Get Your Testnet Tokens
      </div>
      <div className="text-xl mb-5 px-4">
        <p className="mb-5">
          Claim free tokens to use within MORE Markets on Flow Testnet. These
          tokens are for testing purposes only and have no real-world value.
        </p>
        <p />
        <p className="text-xl">Action Summary:</p>1 Flow will be transferred to
        your account. 1000 USDf, 1000 USDCf, 1000 ETHf, 1000 BTCf, and 1000
        ankr.FLOW will be transferred.
      </div>
      <div className="more-bg-primary px-4  py-2 rounded-b-[20px]">
        <div className="flex justify-end mr-5">
          {completed ? (
            <MoreButton
              className="text-2xl py-2"
              text="Done"
              onClick={closeModal}
              color="primary"
            />
          ) : (
            <MoreButton
              className="text-2xl py-2"
              text="Request"
              onClick={initFaucet}
              color="primary"
              disabled={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GetFaucet;
