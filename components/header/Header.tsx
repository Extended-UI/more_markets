"use client";

import { FC } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import Menu from "./Menu";
import ButtonDialog from "../buttonDialog/buttonDialog";
import GetFaucet from "@/components/modal/faucet/getFaucet";
import { WalletConnect } from "../walletConnect/WalletConnect";
import logo from "@/public/assets/icons/logo.png";

const Header: FC = () => {
  const { address: userAddress } = useAccount();

  return (
    <header className="pt-3">
      <nav className="flex sm:flex-row flex-col justify-between items-center">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image src={logo} alt="Logo" width={35} height={35} />
          </div>
          <Menu />
        </div>

        <div className="w-full flex justify-end space-x-4 mt-10 sm:mt-0 text-[16px]">
          {userAddress && (
            <ButtonDialog color="primary" buttonText="Get Testnet Tokens">
              {(closeModal) => (
                <div className="h-full w-full">
                  <GetFaucet wallet={userAddress} closeModal={closeModal} />
                </div>
              )}
            </ButtonDialog>
          )}
          <WalletConnect />
        </div>
      </nav>
    </header>
  );
};

export default Header;
