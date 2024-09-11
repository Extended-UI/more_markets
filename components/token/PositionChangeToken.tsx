import React from "react";
import TotalVolumeToken from "./TotalVolumeToken";
import IconToken from "./IconToken";
import FormatTokenMillion from "../tools/formatTokenMillion";
import { ArrowLongRightIcon } from "@heroicons/react/16/solid";

interface Props {
  title: string;
  token: string;
  value: number;
  value2: number;
}

const PositionChangeToken: React.FC<Props> = ({
  title,
  token,
  value,
  value2,
}) => {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-row justify-between items-center ">
        <div className="text-xl">{title}</div>
        <div className="flex  items-center gap-2">
          {value} <span className="text-grey"> {token} </span>{" "}
          <ArrowLongRightIcon className="w-4 h-4 text-grey" /> {value2}{" "}
          <span className="text-grey"> {token} </span>
        </div>
      </div>
    </div>
  );
};

export default PositionChangeToken;
