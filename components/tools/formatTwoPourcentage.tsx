import React from "react";
import FormatPourcentage from "./formatPourcentage";

interface Props {
  value: number | string;
  value2?: number | null;
  multiplier?: number;
}

const FormatTwoPourcentage: React.FC<Props> = ({
  value,
  value2,
  multiplier = 100,
}) => {
  // Vous pouvez ajouter une vérification ici si besoin
  return (
    <div className="flex gap-1 justify-end">
      <FormatPourcentage value={value} multiplier={multiplier} />
      {value2 ? (
        <>
          <div className="text-grey px-1"> / </div>
          <FormatPourcentage value={value2} multiplier={multiplier} />
        </>
      ) : null}
    </div>
  );
};

export default FormatTwoPourcentage;
