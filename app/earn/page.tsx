"use client";

import DepositMoreTable from "@/components/moreTable/DepositMoreTable";
import EarnMoreTable from "@/components/moreTable/EarnMoreTable";
import { VaultsAbi } from "@/app/abi/VaultsAbi";
import { type BaseError, useReadContract, useBlockNumber } from "wagmi";
import React, { useEffect, useState } from "react";

const EarnPage: React.FC = () => {
    const {
        data: arrayOfVaults,
        isError: issuesIsError,
        isSuccess,
        isPending,
        queryKey: issuesQueryKey,
        refetch: refetchProject,
    } = useReadContract({
        address: process.env.NEXT_PUBLIC_VAULTS as `0x${string}`,
        abi: VaultsAbi,
        functionName: "arrayOfMorphos",
        args: [],
    });

    useEffect(() => {
        refetchProject?.();
    }, [isSuccess]);

    const vaults: readonly `0x${string}`[] = [`0x0000`, `0x1234`];
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
