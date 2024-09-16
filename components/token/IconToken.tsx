import React from "react";
import { getTokenInfo } from "@/utils/utils";

interface IconTokenProps {
  tokenName: string;
  className?: string;
  showSymbol?: boolean;
}

const IconToken: React.FC<IconTokenProps> = ({
  tokenName,
  className,
  showSymbol,
}) => {
  const tokenInfo = getTokenInfo(tokenName);

  return (
    <>
      <div className={`${className}`}>
        <img src={`/assets/tokens/${tokenInfo.symbol}.svg`} alt={tokenName} />
      </div>
      {showSymbol && <div>{tokenInfo.symbol.toUpperCase()}</div>}
    </>
  );
};

export default IconToken;
