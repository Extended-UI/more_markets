"use client";

import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import { type GetBalanceReturnType } from "@wagmi/core";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { parseEther, ZeroAddress, formatEther, MaxUint256 } from "ethers";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import MoreButton from "@/components/moreButton/MoreButton";
import InputTokenMax from "@/components/input/InputTokenMax";
import TableHeaderCell from "@/components/moreTable/MoreTableHeader";
import { notifyError, notify, validInputAmount, delay } from "@/utils/utils";
import { contracts, initBalance, MoreAction, zeroBigInt } from "@/utils/const";
import {
  depositToVaults,
  waitForTransaction,
  getTokenBallance,
  getTokenAllowance,
  getVaultDetail,
  getLoopWithdraw,
  wrapFlow,
  unwrapWFlow,
  setTokenAllowance,
  loopstrategyWithdraw,
} from "@/utils/contract";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionSubTitleContent
} from "@/components/accordion/Accordion";
import expandIcon from '@/public/assets/icons/expand-icon.svg'

interface ILoopStrategyInfo {
  flowBalance: GetBalanceReturnType;
  sharesBalance: GetBalanceReturnType;
  wflowBalance: GetBalanceReturnType;
  userAssets: bigint;
  wflowAllowance: bigint;
}

const accordionContent = [
  {title:'What are my known risks?', subContent: [{title:'Smart contract risk', description:'While the MORE protocol and MORE vaults smart contracts have been rigorously audited by top tier auditing firms, the protocol is still new, but will be audited multiple times over the coming months.', progress:'70%'},{title:'Liquidation risk (1/10)', description:'This strategy loops FLOW and ankr.FLOW in order to compound ankr.FLOW staking yield. Several reasons contribute to the stability of this position. FLOW and ankr.FLOW are correlated assets. ankr.FLOW generally grows at a higher rate than the FLOW borrow rate. The position maintains a LLTV of 85% at each loop.', progress:'40%'}]},
  {title:'What are my known risks?', subContent: [{title:'Smart contract risk', description:'While the MORE protocol and MORE vaults smart contracts have been rigorously audited by top tier auditing firms, the protocol is still new, but will be audited multiple times over the coming months.', progress:'60%'},{title:'Liquidation risk (1/10)', description:'This strategy loops FLOW and ankr.FLOW in order to compound ankr.FLOW staking yield. Several reasons contribute to the stability of this position. FLOW and ankr.FLOW are correlated assets. ankr.FLOW generally grows at a higher rate than the FLOW borrow rate. The position maintains a LLTV of 85% at each loop.', progress:'20%'}]},
  {title:'What are my known risks?', subContent: [{title:'Smart contract risk', description:'While the MORE protocol and MORE vaults smart contracts have been rigorously audited by top tier auditing firms, the protocol is still new, but will be audited multiple times over the coming months.', progress:'95%'},{title:'Liquidation risk (1/10)', description:'This strategy loops FLOW and ankr.FLOW in order to compound ankr.FLOW staking yield. Several reasons contribute to the stability of this position. FLOW and ankr.FLOW are correlated assets. ankr.FLOW generally grows at a higher rate than the FLOW borrow rate. The position maintains a LLTV of 85% at each loop.', progress:'10%'}]}
]

const EarnPage2: React.FC = () => {
  const [chain, setChain] = useState("Flow");
  const [deposit, setDeposit] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loopInfo, setLoopInfo] = useState<ILoopStrategyInfo>({
    flowBalance: initBalance,
    sharesBalance: initBalance,
    wflowBalance: initBalance,
    userAssets: zeroBigInt,
    wflowAllowance: zeroBigInt,
  });

  const { address: userAddress } = useAccount();

  const initValues = async () => {
    if (userAddress) {
      const [flowBal, wflowBal, sharesBal, sharesAllow] = await Promise.all([
        getTokenBallance(contracts.WNATIVE, userAddress),
        getTokenBallance(contracts.WNATIVE, userAddress, false),
        getTokenBallance(contracts.LOOP_STRATEGY, userAddress),
        getTokenAllowance(
          contracts.WNATIVE,
          userAddress,
          contracts.LOOP_STRATEGY
        ),
      ]);

      const userAssets = (await getVaultDetail(
        contracts.LOOP_STRATEGY,
        "convertToAssets",
        [sharesBal.value]
      )) as bigint;

      setLoopInfo({
        flowBalance: flowBal,
        sharesBalance: sharesBal,
        wflowBalance: wflowBal,
        userAssets: userAssets,
        wflowAllowance: sharesAllow,
      });
    } else {
      setLoopInfo({
        flowBalance: initBalance,
        sharesBalance: initBalance,
        wflowBalance: initBalance,
        userAssets: zeroBigInt,
        wflowAllowance: zeroBigInt,
      });
    }
  };

  useEffect(() => {
    initValues();
  }, [userAddress]);

  const handleAction = async () => {
    if (userAddress && validInputAmount(deposit)) {
      // generate deposit tx
      setIsLoading(true);
      const isDeposit = tabValue === 0;
      try {
        const txHash = isDeposit
          ? await handleDeposit(userAddress)
          : await handleWithdraw(userAddress);
        if (txHash && txHash.length > 0) {
          await waitForTransaction(txHash);

          // if withdraw, do unwrap
          if (!isDeposit) {
            await delay(1);
            const wflowBalance = await getTokenBallance(
              contracts.WNATIVE,
              userAddress,
              false
            );
            if (wflowBalance.value > zeroBigInt)
              await unwrapWFlow(wflowBalance.value);
          }

          await initValues();
          notify(isDeposit ? "Deposit successed" : "Withdraw successed");
        }

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        notifyError(
          err,
          isDeposit ? MoreAction.LOOP_DEPOSIT : MoreAction.LOOP_WITHDRAW
        );
      }
    }
  };

  const handleWithdraw = async (account: `0x${string}`): Promise<string> => {
    const depositAmount = parseEther(deposit);
    const useShare = depositAmount >= loopInfo.userAssets;

    let errMsg = "";

    const expectedWithdraw = await getLoopWithdraw(
      useShare ? loopInfo.userAssets : depositAmount
    );
    const amountToReapay = expectedWithdraw[0] + parseEther("0.001");

    // if has insufficient wflow
    if (loopInfo.wflowBalance.value < amountToReapay) {
      // check has sufficient FLOW to wrap
      if (loopInfo.flowBalance.value < amountToReapay) {
        errMsg = "You do not have enough FLOW to repay.";
      } else {
        // wrap flow to wflow
        await wrapFlow(amountToReapay);
        await delay(1);
      }

      // then do approve
      if (errMsg.length == 0 && loopInfo.wflowAllowance < amountToReapay) {
        await setTokenAllowance(
          contracts.WNATIVE,
          contracts.LOOP_STRATEGY,
          MaxUint256
        );
        await delay(1);
      }
    }

    if (errMsg.length > 0) {
      notify(errMsg);
      return "";
    }

    // then withdraw
    return loopstrategyWithdraw(
      useShare,
      account,
      useShare ? loopInfo.sharesBalance.value : depositAmount
    );
  };

  const handleDeposit = async (account: string): Promise<string> => {
    return await depositToVaults(
      contracts.LOOP_STRATEGY,
      ZeroAddress,
      account,
      "",
      zeroBigInt,
      parseEther(deposit),
      0,
      true,
      false,
      true
    );
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

  const updateTabValue = (newTab: number) => {
    setDeposit("");
    setTabValue(newTab);
  };

  const useDeposit = tabValue === 0;

  useEffect(()=>{
    console.log('isExpanded > ', isExpanded)
  },[isExpanded])

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
      <div className={`${isExpanded ? 'max-w-[1200px]' : 'max-w-[600px]'}`}>
        <div className={`more-bg-secondary w-full rounded-[20px] modal-base border-[#343434] border-[8.25px] ${isExpanded ? 'flex justify-between' : ''}`}>
            <div>
              <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
                <div className="flex justify-between relative">
                  <div className="flex items-center">
                      <div
                        className={`${
                          useDeposit ? "glowing-text-primary" : "text-[#FFF]"
                        } !pb-5 text-[16px] mr-[4.5rem] ml-[2rem] cursor-pointer`}
                        onClick={() => updateTabValue(0)}
                      >
                        Deposit
                      </div>
                      <div
                        className={`${
                          tabValue === 1 ? "glowing-text-primary" : "text-[#FFF]"
                        } !pb-5 text-[16px] cursor-pointer`}
                        onClick={() => {updateTabValue(1); setIsExpanded(false)}}
                      >
                        Withdraw
                      </div>
                  </div>
                  <div>
                    {tabValue === 0 && (
                      <div className="absolute top-[-30px] right-[-10px] cursor-pointer w-[48px] h-[48px] flex items-center justify-center rounded-full bg-[#343434] hover:bg-[#414040]" onClick={()=>setIsExpanded(!isExpanded)}>
                      <Image 
                        src={expandIcon} 
                        alt="expand" 
                        className="w-[24px]"
                      />
                    </div>
                    )}
                  </div>
                </div>
                <div className="text-[24px] mb-[40px] pt-[50px] font-semibold">
                  FLOW Dynamic Loop Super Vault
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
                  {useDeposit ? (
                    <>
                      Deposit FLOW or{" "}
                      <span className="text-[#F58420]">ankr.FLOW</span>
                    </>
                  ) : (
                    <>
                      Withdraw FLOW and{" "}
                      <span className="text-[#F58420]">ankr.FLOW</span>
                    </>
                  )}
                </div>
                <div>
                  <InputTokenMax
                    type="number"
                    value={deposit}
                    onChange={handleInputChange}
                    placeholder="0"
                    token={contracts.WNATIVE}
                    balance={
                      useDeposit
                        ? loopInfo.flowBalance.formatted
                        : formatEther(loopInfo.userAssets)
                    }
                    setMax={handleSetMax}
                  />
                </div>
                <div className="text-right text-[16px] font-semibold more-text-gray px-4 mt-4">
                  Balance:{" "}
                  {useDeposit
                    ? loopInfo.flowBalance.formatted
                    : formatEther(loopInfo.userAssets)}{" "}
                  FLOW
                </div>
                {userAddress && (
                  <div className="flex justify-end mt-[40px]">
                    <MoreButton
                      className="text-2xl py-2 "
                      text={useDeposit ? "Deposit" : "Withdraw"}
                      onClick={handleAction}
                      color="primary"
                      disabled={isLoading}
                    />
                  </div>
                )}
              </div>
              <div className="w-[50%] mx-15 flex justify-center mx-auto">
                <div className="glowing-text-primary !pb-0 w-full" />
              </div>
              <div className="more-bg-primary rounded-b-[14px] px-[28px] pb-[40px] pt-[30px] text-[16px] font-normal">
                <div className="flex justify-between">
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
                  {/* <div>
                    <InputTokenMax
                      type="number"
                      value={deposit}
                      onChange={handleInputChange}
                      placeholder="0"
                      token={contracts.WNATIVE}
                      balance={flowBalance.formatted}
                      setMax={handleSetMax}
                    />
                  </div> */}
                </div>
                <div className="flex justify-between mt-7">
                  <div className="flex items-center">
                    {useDeposit ? "Monthly Earnings" : "ankr.FLOW Amount"}
                    <TableHeaderCell
                      infoText="The projected APY is the expected total net APY calculated from the looping strategy after including all incentives and borrowing costs."
                      additionalClasses="ml-3"
                      sortColum={true}
                    />
                  </div>
                  <div>{useDeposit ? "1.4528823" : "0.5538924"}</div>
                </div>
                <div className="flex justify-between mt-7">
                  <div className="flex items-center">
                    {useDeposit ? "Yearly Earnings" : "FLOW Amount"}
                    <TableHeaderCell
                      infoText="The projected APY is the expected total net APY calculated from the looping strategy after including all incentives and borrowing costs."
                      additionalClasses="ml-3"
                      sortColum={true}
                    />
                  </div>
                  <div>{useDeposit ? "15.8423751" : "0.44274291"}</div>
                </div>
                <div className="flex justify-between mt-7 text-[14px] font-normal">
                  *When you withdraw you will receive both FLOW and ankr.FLOW tokens
                </div>
              </div>
            </div>
          { isExpanded && !tabValue ? (
            <div className={"border-l-[8.25px] border-[#343434] pt-[50px] pb-0 w-[540px] duration-200"}>
                <div className="text-[24px] mb-[40px] font-semibold text-[#888888] px-[28px]">
                  Strategy Description
                </div>
                  <Accordion type="single" collapsible className="max-h-[561px] overflow-y-auto" >
                  {accordionContent.map((item, i) => (
                    <AccordionItem value={`item-${i}`} key={i}>
                      <AccordionTrigger>{item.title}</AccordionTrigger>
                      {item.subContent.map((subItem, index)=>(
                      <React.Fragment key={index}>
                        <AccordionSubTitleContent progressBar={subItem.progress}>
                          {subItem.title}
                        </AccordionSubTitleContent>
                        <AccordionContent className="max-h-[160px] overflow-auto">
                          {subItem.description}
                        </AccordionContent>
                      </React.Fragment>
                      ))}
                    </AccordionItem>
                    ))}
                  </Accordion>
              </div>
          ):''}
        </div>
      </div>
    </div>
  );
};

export default EarnPage2;