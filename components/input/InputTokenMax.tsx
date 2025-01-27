import React from "react";
import millify from "millify";
import { isUndefined, toNumber } from "lodash";
import IconToken from "../token/IconToken";
import MoreButton from "../moreButton/MoreButton";
import usePrice from "@/hooks/usePrice";

interface Props {
  type: string;
  value?: string;
  token: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  balance: string;
  setMax: (maxValue: string) => void;
}

const InputTokenMax: React.FC<Props> = ({
  type,
  value,
  onChange,
  placeholder,
  token,
  balance,
  setMax,
}) => {
  const { tokenPrice } = usePrice(token);

  const numAmount = toNumber(value);

  return (
    <div className="w-full flex  rounded-[12px] more-input-bg-color justify-between items-center p-[16px] gap-4">
      <div className="flex w-full flex-col items-center gap-2">
        <input
          type={type}
          value={!isUndefined(value) ? value : ""}
          onChange={onChange}
          className="noBorder noArrows input mt-0 text-left text-[20px] w-full more-input-text-color more-input-bg-color"
          placeholder={placeholder}
        />
        {!isUndefined(value) && numAmount > 0 && (
          <div className="flex mt-0 pl-3 text-[16px] justify-start w-full items-center">
            <span className="text-grey">
              ${millify(tokenPrice * numAmount, { precision: 2 })}
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-3 items-center">
        <IconToken className="h-8 w-8" tokenName={token} showSymbol={true} />
        <MoreButton
          text="Max"
          onClick={() => setMax(balance)}
          color="grey"
          className="py-2 w-20 text-xl ml-3"
        />
      </div>

      <style jsx>{`
        .noBorder {
          border: none;
          outline: none;
        }

        .noArrows::-webkit-inner-spin-button,
        .noArrows::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .noArrows {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default InputTokenMax;
