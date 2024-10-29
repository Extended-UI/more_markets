"use client";

import { useAccount } from "wagmi";
import { parseEther, ZeroAddress } from "ethers";
import React, { useState, useEffect } from "react";
import { type GetBalanceReturnType } from "@wagmi/core";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import MoreButton from "@/components/moreButton/MoreButton";
import InputTokenMax from "@/components/input/InputTokenMax";
import TableHeaderCell from "@/components/moreTable/MoreTableHeader";
import { contracts, initBalance, MoreAction } from "@/utils/const";
import { notifyError, notify, validInputAmount } from "@/utils/utils";
import {
  depositToVaults,
  waitForTransaction,
  getTokenBallance,
} from "@/utils/contract";

const EasyModePage: React.FC = () => {
  const [chain, setChain] = useState("Flow");
  const [isLoading, setIsLoading] = useState(false);
  const [deposit, setDeposit] = useState("");
  const [balanceString, setBalanceString] =
    useState<GetBalanceReturnType>(initBalance);

  const { address: userAddress } = useAccount();

  const initValues = async () => {
    const tokenBal = await getTokenBallance(contracts.WNATIVE, userAddress);
    setBalanceString(tokenBal);
  };

  useEffect(() => {
    initValues();
  }, [userAddress]);

  const handleDeposit = async () => {
    if (userAddress && validInputAmount(deposit)) {
      // generate deposit tx
      setIsLoading(true);
      try {
        const txHash = await depositToVaults(
          contracts.LOOP_STRATEGY,
          ZeroAddress,
          userAddress,
          "",
          BigInt(0),
          parseEther(deposit),
          0,
          true,
          false,
          true
        );
        await waitForTransaction(txHash);

        await initValues();
        notify("Deposit successed");
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        notifyError(err, MoreAction.DEPOSIT);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit(event.target.value);
  };

  const handleSetMax = (maxValue: string) => {
    setDeposit(maxValue);
  };

  const openChainModal = (name: string) => {
    setChain(name);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
      <div className="max-w-[600px]">
        <div className="more-bg-secondary w-full rounded-[20px] modal-base border-[#343434] border-[8.25px]">
          <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
            <div className="text-[24px] mb-[40px] font-semibold">
              Maximize Your FLOW Yield
            </div>
            <div className="mb-[40px] hidden">
              <Menu as="div" className="relative inline-block">
                <MenuButton className="flex wallet-connected" type="button">
                  <div className="flex items-center w-[124px] !rounded-l-[8px] text-[16px] px-7 py-3 wallet-networks wallet-menu bg-[#212121] hover:bg-[#171717]">
                    {chain}
                  </div>
                  <div className="pl-2 pr-3 py-4 wallet-networks wallet-chevron bg-[#212121]">
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 h-7 w-8 text-[#888888]"
                    />
                  </div>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute mt-3 right-0 z-10 w-56 origin-top-right divide-y bg-[#343434] shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in rounded-xl "
                >
                  <div className="">
                    <MenuItem>
                      <div
                        onClick={() => openChainModal("FLOW")}
                        className="flex cursor-pointer text-[16px] px-4 py-4 !rounded-t-[8px] text-md text-white data-[focus]:bg-[#171717] data-[focus]:text-white"
                      >
                        FLOW
                      </div>
                    </MenuItem>
                  </div>
                  <div className="">
                    <MenuItem>
                      <div
                        onClick={() => openChainModal("st.FLOW")}
                        className="flex cursor-pointer text-[16px] px-4 py-4 text-md text-white data-[focus]:bg-[#171717] data-[focus]:text-white"
                      >
                        st.FLOW
                      </div>
                    </MenuItem>
                  </div>
                  <div className="">
                    <MenuItem>
                      <div
                        onClick={() => openChainModal("ankr.FLOW")}
                        className="flex cursor-pointer text-[16px] !rounded-b-[8px] px-4 py-4 text-md text-white data-[focus]:bg-[#171717] data-[focus]:text-white"
                      >
                        ankr.FLOW
                      </div>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
            <div className="text-l text-[16px] mb-5">
              Deposit FLOW
              {/* Deposit {flowVault ? "Flow" : tokenInfo.symbol} */}
            </div>
            <div>
              <InputTokenMax
                type="number"
                value={deposit}
                onChange={handleInputChange}
                placeholder="0"
                token={contracts.WNATIVE}
                balance={balanceString.formatted}
                setMax={handleSetMax}
              />
            </div>
            <div className="text-right text-[16px] font-semibold more-text-gray px-4 mt-4">
              Balance: {balanceString.formatted} FLOW
            </div>
            <div className="flex justify-end mt-[40px]">
              <MoreButton
                className="text-2xl py-2 "
                text="Deposit"
                onClick={handleDeposit}
                color="primary"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className=""></div>
          <div className="w-[50%] mx-15 flex justify-center mx-auto">
            <div className="glowing-text-primary !pb-0 w-full" />
          </div>
          <div className="more-bg-primary rounded-b-[14px] px-[28px] pb-[40px] pt-[30px] text-[16px] font-normal">
            <div className="flex justify-between mb-4">
              <div className="flex items-center">
                Current APY
                <TableHeaderCell
                  infoText="The current APY is the APY of the underlying market prior to launching the EasyMode strategy."
                  additionalClasses="ml-3"
                  sortColum={true}
                />
              </div>
              <div>
                {/* {(vaultInfo ? vaultInfo.netAPY.total_apy : 0).toFixed(2)} */}
                0.00
                <span className="more-text-gray">%</span>
              </div>
            </div>
            <div className="flex justify-between mt-12">
              <div className="flex items-center">
                Projected APY
                <TableHeaderCell
                  infoText="The projected APY is the expected total net APY calculated from the looping strategy after including all incentives and borrowing costs."
                  additionalClasses="ml-3"
                  sortColum={true}
                />
              </div>
              <div>13% - 40%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasyModePage;
