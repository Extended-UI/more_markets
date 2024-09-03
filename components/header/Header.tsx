import { FC } from "react";
import Image from "next/image";
import FlowButton from "./FlowButton";
import AddressBadge from "./AddressBadge";
import logo from "@/public/assets/icons/logo.png";
import Menu from "./Menu";
import { WalletConnect } from "../walletConnect/WalletConnect"

const Header: FC = () => {
    return (
        <header className=" pt-2">
            <nav className="  flex sm:flex-row flex-col justify-between items-center">
                <div className=" w-full flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Image src={logo} alt="Logo" width={35} height={35} />
                    </div>
                    <Menu></Menu>
                </div>

                <div className="w-full flex justify-end space-x-4 mt-10 sm:mt-0">
                    <WalletConnect />
                </div>
            </nav>
        </header>
    );
};

export default Header;
