import millify from "millify";
import FormatNumber from "./formatNumber";
import TotalVolumeToken from "../token/TotalVolumeToken";
import usePrice from "@/hooks/usePrice";
import { getTokenInfo } from "@/utils/utils";

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
  const { tokenPrice } = usePrice(token);
  const tokenInfo = getTokenInfo(token);

  // Vous pouvez ajouter une vérification ici si besoin
  return (
    <div
      className={
        "flex gap-1 items-center gap-2 " + (align ? "" : "justify-center")
      }
    >
      <div>
        <span className="text-grey">{currency}</span>
        <FormatNumber value={value} />
      </div>
      <div className="text-grey">{tokenInfo.symbol}</div>
      <TotalVolumeToken totalDanger={totalDanger}>
        {/* {totalValue} */}
        {millify(tokenPrice * value)}
      </TotalVolumeToken>
    </div>
  );
};

export default FormatTokenMillion;
