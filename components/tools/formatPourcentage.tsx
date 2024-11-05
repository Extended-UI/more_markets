import React from "react";

interface Props {
  value: number | string; // Définit clairement que la prop attendue est un nombre
  multiplier?: number;
}

const FormatPourcentage: React.FC<Props> = ({ value, multiplier = 100 }) => {
  // Vous pouvez ajouter une vérification ici si besoin
  return (
    <div className="flex gap-1 justify-end">
      <div>
        {typeof value == "string"
          ? value
          : ((value <= 0 ? 0 : value) * multiplier).toFixed(2)}
      </div>
      <div className="text-grey">{typeof value == "string" ? "" : "%"}</div>
    </div>
  );
};

export default FormatPourcentage;
