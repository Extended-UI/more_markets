"use client";

import axios from "axios";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { config } from "@/utils/wagmi";
import { CHAINALYSIS_KEY } from "@/utils/const";

export const WalletConnect = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        let unsafe = false;
        if (account) {
          axios
            .get(
              "https://public.chainalysis.com/api/v1/address/" +
                account.address,
              {
                headers: {
                  Accept: "application/json",
                  "X-API-Key": CHAINALYSIS_KEY,
                },
              }
            )
            .then((resp) => {
              const respData = resp.data;
              console.log(respData, resp);
              if (
                !(
                  respData.identifications &&
                  respData.identifications.length == 0
                )
              )
                unsafe = true;
            })
            .catch((err) => {
              console.log(err);
            });
        }

        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (unsafe) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="text-lg px-5 py-2 wallet-networks ml-3"
                  >
                    Sactioned Address
                  </button>
                );
              }

              if (!(account && chain && mounted)) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="text-lg px-5 py-2 wallet-networks ml-3"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="text-lg px-5 py-2 wallet-networks ml-3"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex">
                  <Menu as="div" className="relative inline-block">
                    <MenuButton className="flex" type="button">
                      <div className="flex items-center text-[16px] text-lg px-5 py-2 wallet-networks wallet-menu">
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                style={{ width: 12, height: 12 }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </div>
                      <div className="pl-2 pr-3 py-2 wallet-networks wallet-chevron">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="-mr-1 h-7 w-8 text-gray-400"
                        />
                      </div>
                    </MenuButton>

                    <MenuItems
                      transition
                      className="absolute mt-1 right-0 z-10 w-56 origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {config.chains.map((network) => (
                        <div className="py-1" key={network.id}>
                          <MenuItem>
                            <div
                              onClick={openChainModal}
                              className="flex cursor-pointer text-[16px] px-4 py-2 text-md text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              <img
                                alt={network.name ?? "Chain icon"}
                                src={network.iconUrl}
                                style={{ width: 12, height: 12 }}
                                className="mr-3 mt-1"
                              />
                              {network.name}
                            </div>
                          </MenuItem>
                        </div>
                      ))}
                    </MenuItems>
                  </Menu>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="text-lg px-5 py-2 wallet-networks ml-3"
                  >
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
