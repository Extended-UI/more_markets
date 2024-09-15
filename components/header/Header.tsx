"use client";

import { FC } from "react";
import { useAccount } from "wagmi";
import Image from "next/image";
import logo from "@/public/assets/icons/logo.png";
import Menu from "./Menu";
import ButtonDialog from "../buttonDialog/buttonDialog";
import { WalletConnect } from "../walletConnect/WalletConnect";
import GetFaucet from "@/components/modal/faucet/getFaucet";

const Header: FC = () => {
  const { address: userAddress } = useAccount();

  return (
    <header className=" pt-2">
      <nav className="  flex sm:flex-row flex-col justify-between items-center">
        <div className=" w-full flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image src={logo} alt="Logo" width={35} height={35} />
          </div>
          <Menu />
        </div>

        <div className="w-full flex justify-end space-x-4 mt-10 sm:mt-0">
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
