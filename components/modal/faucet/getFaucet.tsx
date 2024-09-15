"use client";

import React, { useState } from "react";
import MoreButton from "../../moreButton/MoreButton";

interface Props {
  wallet: string;
  closeModal: () => void;
}

const GetFaucet: React.FC<Props> = ({ wallet, closeModal }) => {
  const [completed, setCompleted] = useState(false);

  const initFaucet = async () => {
    if (wallet) {
      setCompleted(false);
      try {
        const res = await fetch("/api/faucet", {
          method: "POST",
          body: JSON.stringify({ wallet }),
          headers: {
            "content-type": "application/json",
          },
        });

        console.log(res);
        if (res.ok) {
          console.log("Yeai!");
        } else {
          console.log("Oops! Something is wrong.");
        }

        setCompleted(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="more-bg-secondary w-full rounded-[20px]">
      <div className="text-4xl mb-10 px-4 pt-10 ">Faucet</div>
      <div className="text-l mb-5 px-4">Transfer 10 Flow</div>
      <div className="text-l mb-5 px-4">Transfer each 1000 test tokens</div>
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GetFaucet;
