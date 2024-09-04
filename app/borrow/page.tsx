"use client";

import BorrowMoreTable from "@/components/moreTable/BorrowMoreTable";
import LoanMoreTable from "@/components/moreTable/LoanMoreTable";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { useReadContract } from "wagmi";
import React, { useEffect, useState } from "react";
import { contracts } from "@/utils/const";

const BorrowPage: React.FC = () => {
  const {
    data: arrayOfMarkets,
    isError: issuesIsError,
    isSuccess,
    isPending,
    queryKey: issuesQueryKey,
    refetch: refetchProject,
  } = useReadContract({
    address: contracts.MORE_MARKETS as `0x${string}`,
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
        <LoanMoreTable availableMarkets={arrayOfMarkets}></LoanMoreTable>

        <h1 className="text-4xl mb-4">MORE Markets</h1>
        <BorrowMoreTable availableMarkets={arrayOfMarkets}></BorrowMoreTable>
      </div>
    );
};

export default BorrowPage;
