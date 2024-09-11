import React from "react";
import TotalVolumeToken from "../token/TotalVolumeToken";
import FormatNumber from "./formatNumber";

interface Props {
  token: string;
  value: number;
}

const FormatPrice: React.FC<Props> = ({ token, value }) => {
  // Vous pouvez ajouter une vérification ici si besoin
  return (
    <div className="flex gap-1 justify-center items-center gap-2  ">
      <div className=" ">
        <FormatNumber value={value}></FormatNumber>
      </div>
      <div className="text-grey ">{token}</div>
    </div>
  );
};

export default FormatPrice;
