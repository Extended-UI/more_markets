import React from "react";
import FormatPourcentage from "./formatPourcentage";

interface Props {
  value: number;
  value2?: number | null;
}

const FormatTwoPourcentage: React.FC<Props> = ({ value, value2 }) => {
  // Vous pouvez ajouter une vérification ici si besoin
  return (
    <div className="flex gap-1 justify-end">
      {" "}
      <FormatPourcentage value={value} />{" "}
      {value2 ? (
        <>
          <div className="text-grey px-1">/</div>{" "}
          <FormatPourcentage value={value2} />{" "}
        </>
      ) : null}
    </div>
  );
};

export default FormatTwoPourcentage;
