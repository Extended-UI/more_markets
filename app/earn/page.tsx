"use client";

import { useReadContract } from "wagmi";
import React, { useEffect } from "react";
import { contracts } from "@/utils/const";
import { VaultsAbi } from "@/app/abi/VaultsAbi";
import EarnMoreTable from "@/components/moreTable/EarnMoreTable";
import DepositMoreTable from "@/components/moreTable/DepositMoreTable";

const EarnPage: React.FC = () => {
  const {
    data: arrayOfVaults,
    isError: issuesIsError,
    isSuccess,
    isPending,
    queryKey: issuesQueryKey,
    refetch: refetchProject,
  } = useReadContract({
    address: contracts.MORE_VAULTS as `0x${string}`,
    abi: VaultsAbi,
    functionName: "arrayOfMorphos",
    args: [],
  });

  useEffect(() => {
    refetchProject?.();
  }, [isSuccess]);

  if (isPending) return <div> ...isLoading</div>;
  else if (arrayOfVaults !== undefined)
    return (
      <div>
        <h1 className="text-4xl mb-8">My Deposits</h1>
        <DepositMoreTable></DepositMoreTable>

        <h1 className="text-4xl mb-8">MORE Vaults</h1>
        <EarnMoreTable availableVaults={arrayOfVaults}></EarnMoreTable>
      </div>
    );
};

export default EarnPage;
