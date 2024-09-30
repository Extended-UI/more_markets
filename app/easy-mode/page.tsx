"use client";

import React, { useState, useEffect } from "react";
import MoreButton from "@/components/moreButton/MoreButton";
import InputTokenMax from "@/components/input/InputTokenMax";
import FormatTokenMillion from "@/components/tools/formatTokenMillion";

const EasyModePage: React.FC = () => {

  const handleDeposit = () => {
    console.log("Deposit clicked");
  };

  const handleInputChange = () => {
    console.log("Input changed");
  }

  const handleSetMax = () => {
    console.log("Set max clicked");
  }


  return (
    <>
    <div className="max-w-[600px] flex justify-center">
      <div className="more-bg-secondary w-full rounded-[20px] modal-base">
      <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
      <div className="text-[24px] mb-[40px] font-semibold">Deposit FLOW, st.FLOW or ankr.FLOW</div>
      <div className="text-l text-[16px] mb-5">
        Deposit USDC {/* Deposit {flowVault ? "Flow" : tokenInfo.symbol} */}
      </div>
      <div>

        { true ? ( //flowVault
          <InputTokenMax
            type="number"
            //value={deposit}
            value={0}
            onChange={handleInputChange}
            placeholder="0"
            //token={ZeroAddress}
            token={''}
            //balance={Number(flowBalance.formatted)}
            balance={5}
            setMax={handleSetMax}
          />
        ) : (
          <InputTokenMax
            type="number"
            //value={deposit}
            value={0}
            onChange={handleInputChange}
            placeholder="0"
            //token={item.assetAddress}
            token={''}
            //balance={Number(balanceString.formatted)}
            balance={5}
            setMax={handleSetMax}
          />
        )}
      </div>
      {true ? ( //flowVault
        <div className="text-right text-[16px] font-semibold more-text-gray px-4 mt-4">
          Balance: 473.18 USDC Flow {/*{flowBalance.formatted} */}
        </div>
      ) : (
        <div className="text-right text-[16px] font-semibold more-text-gray px-4 mt-4">
          Balance: 473.18 USDC Flow {/* Balance: {balanceString.formatted} {tokenInfo.symbol} */}
        </div>
      )}
        <div className="flex justify-end mt-[40px]">
          <MoreButton
            className="text-2xl py-2 "
            text="Deposit"
            onClick={() => handleDeposit()}
            color="primary"
          />
        </div>
      </div>
      <div className=""></div>
        <div className="more-bg-primary rounded-b-[20px] px-[28px] pb-[40px] pt-[30px] text-[16px] font-normal">
          <div className="flex justify-between mb-4">
            <div>APY:</div>
            <div>
              {/* {item.netAPY}
              <span className="more-text-gray">%</span> */}
              N/A
            </div>
          </div>
          <div className="flex justify-between mt-12">
            <div className="">Total Deposits</div>
            <div>
              <FormatTokenMillion
                value={1} //item.totalDeposits
                totalValue={0}
                token={'123'} //item.assetAddress
                inTable={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default EasyModePage;
