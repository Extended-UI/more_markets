"use client";

import { FC } from "react";
import Image from "next/image";
import Menu from "./Menu";
import { WalletConnect } from "../walletConnect/WalletConnect";
import logo from "@/public/assets/icons/logo.png";

const Header: FC = () => {
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
          <WalletConnect />
        </div>
      </nav>
    </header>
  );
};

export default Header;
