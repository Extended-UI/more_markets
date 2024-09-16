import React from "react";
import usePrice from "@/hooks/usePrice";
import { getTokenInfo } from "@/utils/utils";

import TotalVolumeToken from "../token/TotalVolumeToken";
import FormatNumber from "./formatNumber";

interface Props {
  token?: string;
  value: number;
  totalValue: number;
  totalDanger?: boolean;
  currency?: string;
  align?: boolean;
}

const FormatTokenMillion: React.FC<Props> = ({
  token,
  value,
  totalValue,
  totalDanger,
  currency,
  align,
}) => {
  const { fetchTokenPrice } = usePrice();
  const tokenPrice = value > 0 ? fetchTokenPrice(token) : 0;

  const tokenInfo = getTokenInfo(token);

  // Vous pouvez ajouter une vérification ici si besoin
  return (
    <div
      className={
        "flex gap-1 items-center gap-2 " + (align ? "" : "justify-center")
      }
    >
      <div className=" ">
        <span className="text-grey">{currency}</span>
        <FormatNumber value={value} />
      </div>
      <div className="text-grey">{tokenInfo.symbol}</div>
      <TotalVolumeToken totalDanger={totalDanger}>
        {/* {totalValue} */}
        {(tokenPrice * value).toFixed(2)}
      </TotalVolumeToken>
    </div>
  );
};

export default FormatTokenMillion;
