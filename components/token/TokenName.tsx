import React, { useEffect } from "react";
import { useReadContract } from "wagmi";
import IconToken from "./IconToken";
import { ERC20Abi } from "@/app/abi/ERC20Abi";

interface TokenNameProps {
  token: string;
}

const TokenName: React.FC<TokenNameProps> = ({ token }) => {
  const {
    data: tokenName,
    isPending,
    refetch: refetchProject,
    isSuccess,
  } = useReadContract({
    address: token as `0x${string}`,
    abi: ERC20Abi,
    functionName: "symbol",
    args: [],
  });

  useEffect(() => {
    refetchProject?.();
  }, [isSuccess]);

  if (isPending) return <div>...</div>;
  else
    return (
      <div className="flex items-center">
        <div className="mr-2 w-6 h-6">
          <IconToken
            tokenName={tokenName !== undefined ? tokenName : "abt"}
          ></IconToken>
        </div>
        {tokenName !== undefined ? tokenName : "NONAME"}
      </div>
    );
};

export default TokenName;
