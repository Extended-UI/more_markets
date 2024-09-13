import React from "react";

interface Props {
  value: number | string; // Définit clairement que la prop attendue est un nombre
}

const FormatPourcentage: React.FC<Props> = ({ value }) => {
  // Vous pouvez ajouter une vérification ici si besoin
  return (
    <div className="flex gap-1 justify-end">
      {" "}
      <div className=" ">
        {typeof value == "string" ? value : (value * 100).toFixed(2)}
      </div>{" "}
      <div className="text-grey">{typeof value == "string" ? "" : "%"}</div>
    </div>
  );
};

export default FormatPourcentage;
