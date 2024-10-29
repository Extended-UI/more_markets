"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import Menu from "./Menu";
import MoreButton from "../moreButton/MoreButton";
import { WalletConnect } from "../walletConnect/WalletConnect";
import { IRewardClaim } from "@/types";
import { MoreAction } from "@/utils/const";
import { doClaimReward } from "@/utils/contract";
import { fetchVaultClaims, notifyError } from "@/utils/utils";
import logo from "@/public/assets/icons/logo.png";

const Header: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [claimList, setClaimList] = useState<IRewardClaim[]>([]);
  const { address: userAddress, connector } = useAccount();
  const isFlowWallet = connector
    ? connector.name.toLowerCase() == "flow wallet"
    : false;

  useEffect(() => {
    const initClaim = async () => {
      if (userAddress) {
        // setClaimList(await fetchVaultClaims(userAddress));
        setClaimList(
          await fetchVaultClaims("0x000000000000000000000002146dEaA9b9Bc2610")
        );
      } else {
        setClaimList([]);
      }
    };

    initClaim();
  }, [userAddress]);

  const handleClaim = async () => {
    if (claimList.length > 0) {
      setIsLoading(true);
      try {
        await doClaimReward(claimList, isFlowWallet);
        setIsLoading(false);
        setClaimList([]);
      } catch (err) {
        setIsLoading(false);
        notifyError(err, MoreAction.CLAIM);
      }
    }
  };

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
          {userAddress && claimList.length > 0 && (
            <MoreButton
              text="Claim rewards"
              color="primary"
              onClick={handleClaim}
              disabled={isLoading}
            />
          )}
          <WalletConnect />
        </div>
      </nav>
    </header>
  );
};

export default Header;
