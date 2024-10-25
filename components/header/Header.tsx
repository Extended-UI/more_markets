"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import Menu from "./Menu";
import ClaimRewards from "../modal/ClaimRewards";
import ButtonDialog from "../buttonDialog/buttonDialog";
import { WalletConnect } from "../walletConnect/WalletConnect";
import { IRewardClaim } from "@/types";
import { fetchVaultClaims } from "@/utils/utils";
import logo from "@/public/assets/icons/logo.png";

const Header: FC = () => {
  const [claimList, setClaimList] = useState<IRewardClaim[]>([]);
  const { address: userAddress } = useAccount();

  useEffect(() => {
    const initClaim = async () => {
      if (userAddress) {
        setClaimList(await fetchVaultClaims(userAddress));
      } else {
        setClaimList([]);
      }
    };

    initClaim();
  }, [userAddress]);

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
            <ButtonDialog color="primary" buttonText="Claim rewards">
              {(closeModal) => (
                <div className="h-full w-full">
                  <ClaimRewards
                    claimList={claimList}
                    setClaimList={setClaimList}
                    closeModal={closeModal}
                  />
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
