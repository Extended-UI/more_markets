"use client";

import Image from "next/image";
import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import HeaderEarnDetail from "@/components/details/HeaderEarnDetail";
import InfosEarnDetails from "@/components/details/InfosEarnDetail";
import DetailEarnMoreTable from "@/components/moreTable/DetailEarnMoreTable";
// import { fetchVault, fetchMarkets } from "@/utils/graph";
import { InvestmentData, VaultBreakdown } from "@/types";
import {
  formatTokenValue,
  getPremiumLltv,
  fetchVaultAprs,
  getVaultApyInfo,
} from "@/utils/utils";
import {
  getVaultDetail,
  getMarketData,
  fetchMarkets,
  fetchVault,
  getTokenBallance,
} from "@/utils/contract";
import leftArrow from "@/public/assets/icons/left-arrow.svg";

const EarnDetailPage: React.FC = () => {
  const router = useRouter();
  const params = usePathname();
  const { address: userAddress } = useAccount();

  const [totalBorrow, setTotalBorrow] = useState(0);
  const [breakdowns, setBreakdowns] = useState<VaultBreakdown[]>([]);
  const [vaultInfo, setVaultInfo] = useState<InvestmentData | null>(null);

  const vaultId = params ? params.replace("/earn/", "") : "";

  useEffect(() => {
    const initVault = async () => {
      try {
        if (vaultId.length == 0) {
          router.push("/earn");
        } else {
          const aprDate = 7;
          const [fetchedVault, marketsArr, vaultAprs] = await Promise.all([
            fetchVault(vaultId),
            fetchMarkets(),
            fetchVaultAprs(aprDate, vaultId),
          ]);

          if (fetchedVault) {
            const breakdownList = fetchedVault.supplyQueue.map(
              async (queueItem) => {
                const marketId = queueItem.market.id.toLowerCase();
                const marketItem = marketsArr.find(
                  (item) => item.id.toLowerCase() == marketId
                );

                if (marketItem) {
                  const marketData = await getMarketData(marketItem.id);

                  return {
                    id: marketId,
                    allowcation: 0,
                    supply: formatTokenValue(
                      marketData.info.totalSupplyAssets,
                      fetchedVault.asset.id
                    ),
                    borrow: formatTokenValue(
                      marketData.info.totalBorrowAssets,
                      fetchedVault.asset.id
                    ),
                    supplyToken: fetchedVault.asset.id,
                    collateral: marketItem.inputToken.id,
                    lltv: formatTokenValue(marketItem.lltv, "", 18),
                    lltv2: getPremiumLltv(marketData.params),
                    credora: "rating",
                  } as VaultBreakdown;
                }
              }
            );

            const filtered = (await Promise.all(breakdownList)).filter(
              (item) => item !== undefined
            );

            let totalSupply = 0;
            let totalBorrows = 0;
            for (const breakdown of filtered) {
              totalSupply += breakdown.supply;
              totalBorrows += breakdown.borrow;
            }
            setTotalBorrow(totalBorrows);

            const updated = filtered.map((item) => {
              return {
                ...item,
                allowcation:
                  totalSupply > 0 ? (item.supply * 100) / totalSupply : "0",
              } as VaultBreakdown;
            });
            setBreakdowns(updated);

            const [vaultShares, deposited] = await Promise.all([
              getTokenBallance(fetchedVault.id, userAddress),
              getVaultDetail(vaultId, "totalAssets", []),
            ]);

            let userAssets = BigInt(0);
            if (vaultShares.value > 0) {
              userAssets = (await getVaultDetail(
                fetchedVault.id,
                "convertToAssets",
                [vaultShares.value]
              )) as bigint;
            }

            const aprItem = vaultAprs.find(
              (aprItem) => aprItem.vaultid == vaultId.toLowerCase()
            );

            setVaultInfo({
              vaultId: fetchedVault.id,
              vaultName: fetchedVault.name,
              assetAddress: fetchedVault.asset.id,
              netAPY: getVaultApyInfo(aprItem, aprDate),
              programs: aprItem?.programs,
              userDeposits: formatTokenValue(userAssets, fetchedVault.asset.id),
              userShares: vaultShares.value,
              totalDeposits: formatTokenValue(
                deposited as bigint,
                fetchedVault.asset.id
              ),
              curator: fetchedVault.curator ? fetchedVault.curator.id : "",
              collateral: [],
              guardian: fetchedVault.guardian ? fetchedVault.guardian.id : "",
              timelock: fetchedVault.timelock,
            } as InvestmentData);
          }
        }
      } catch (err) {
        router.push("/earn");
      }
    };

    initVault();
  }, [vaultId, userAddress, router]);

  const updateInfo = async (id: string) => {
    if (vaultInfo) {
      const deposited = (await getVaultDetail(
        vaultId,
        "totalAssets",
        []
      )) as bigint;

      setVaultInfo({
        ...vaultInfo,
        totalDeposits: formatTokenValue(deposited, vaultInfo.assetAddress),
      } as InvestmentData);
    }
  };

  return (
    <>
      {vaultInfo && (
        <>
          <div className="mb-8 overflow-visible mt-14">
            <div className=" mr-10  mb-14">
              <div
                className="flex items-center w-[80px] cursor-pointer"
                onClick={() => router.push("/earn")}
              >
                <Image
                  className="mr-4"
                  src={leftArrow}
                  alt="left-arrow"
                  width={24}
                  height={24}
                />
                <div className="text-[16px] text-white font-medium">Back</div>
              </div>
            </div>
            <HeaderEarnDetail updateInfo={updateInfo} item={vaultInfo} />
            <InfosEarnDetails vault={vaultInfo} totalBorrow={totalBorrow} />
          </div>
          <h1 className="text-4xl !text-[30px] mt-[60px] mb-10 font-semibold">
            Vault Breakdown
          </h1>
          <DetailEarnMoreTable breakdowns={breakdowns} />
        </>
      )}
    </>
  );
};

export default EarnDetailPage;
