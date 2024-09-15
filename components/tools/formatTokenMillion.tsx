import React from "react";
import TotalVolumeToken from "../token/TotalVolumeToken";
import FormatNumber from "./formatNumber";
import usePrice from "@/hooks/usePrice";

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
  console.log(tokenPrice, token);

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
      <div className="text-grey ">{token ? token.toUpperCase() : ""}</div>
      <TotalVolumeToken totalDanger={totalDanger}>
        {/* {totalValue} */}
        {(tokenPrice * value).toFixed(2)}
      </TotalVolumeToken>
    </div>
  );
};

export default FormatTokenMillion;
