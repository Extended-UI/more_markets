import millify from "millify";
import TotalVolumeToken from "../token/TotalVolumeToken";
import usePrice from "@/hooks/usePrice";
import { formatNumberLocale, getTokenInfo } from "@/utils/utils";

interface Props {
  token?: string;
  value: number;
  totalValue: number;
  totalDanger?: boolean;
  currency?: string;
  align?: boolean;
  inTable?: boolean;
}

const FormatTokenMillion: React.FC<Props> = ({
  token,
  value,
  totalValue,
  totalDanger,
  currency,
  align,
  inTable,
}) => {
  const { tokenPrice } = usePrice(token);
  const tokenInfo = getTokenInfo(token);
  const decimalsLimit = Math.min(tokenInfo.decimals, 8);

  // Vous pouvez ajouter une vérification ici si besoin
  return (
    <div
      className={
        "flex  items-center gap-2 " + (align ? "" : "justify-center")
      }
    >
      <div>
        <span className="text-grey">{currency}</span>
        {formatNumberLocale(value, inTable ? 2 : decimalsLimit)}
      </div>
      <div className="text-grey">{tokenInfo.symbol}</div>
      <TotalVolumeToken totalDanger={totalDanger}>
        {/* {totalValue} */}
        {millify(tokenPrice * value, { precision: 2 })}
      </TotalVolumeToken>
    </div>
  );
};

export default FormatTokenMillion;
