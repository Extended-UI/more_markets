import React from "react";

interface Props {
  value: number; // Définit clairement que la prop attendue est un nombre
}

const formatNumber = (value: number): string => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const FormatNumber: React.FC<Props> = ({ value }) => {
  // Vous pouvez ajouter une vérification ici si besoin
  return <span>{formatNumber(value)}</span>; // Utilisez <span> ou autre élément selon le contexte d'usage
};

export default FormatNumber;
