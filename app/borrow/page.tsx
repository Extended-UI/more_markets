"use client";

import BorrowMoreTable from "@/components/moreTable/BorrowMoreTable";
import LoanMoreTable from "@/components/moreTable/LoanMoreTable";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { type BaseError, useReadContract, useBlockNumber } from "wagmi";
import React, { useEffect, useState } from "react";

const BorrowPage: React.FC = () => {
    const {
        data: arrayOfMarkets,
        isError: issuesIsError,
        isSuccess,
        isPending,
        queryKey: issuesQueryKey,
        refetch: refetchProject,
    } = useReadContract({
        address: process.env.NEXT_PUBLIC_MARKETS as `0x${string}`,
        abi: MarketsAbi,
        functionName: "arrayOfMarkets",
        args: [],
    });

    useEffect(() => {
        refetchProject?.();
    }, [isSuccess]);

    if (isPending) return <div> ...isLoading</div>;
    else if (arrayOfMarkets !== undefined)
        return (
            <div>
                <h1 className="text-4xl mb-4">My Loans</h1>
                <LoanMoreTable
                    availableMarkets={arrayOfMarkets}
                ></LoanMoreTable>

                <h1 className="text-4xl mb-4">MORE Markets</h1>
                <BorrowMoreTable
                    availableMarkets={arrayOfMarkets}
                ></BorrowMoreTable>
            </div>
        );
};

export default BorrowPage;
