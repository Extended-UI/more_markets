"use client";

import MoreGraphicLinear from "@/components/graphics/MoreGraphicsLinear";
import MoreGraphicsV2 from "@/components/graphics/MoreGraphicsV2";
import MoreGraphicsV3 from "@/components/graphics/MoreGraphicsV3";
import React from "react";

// Fonction pour générer une map de dates avec des pourcentages pour chaque semaine de l'année 2024
function generateWeeklyData(): Map<string, number> {
  const startDate = new Date("2024-01-01");
  const data = new Map<string, number>();

  let money = 0;
  let cnt = 52;
  let moneyStep = 300 / cnt;
  for (let week = 0; week < cnt; week++) {
    // Calculer la date de début de chaque semaine
    const currentDate = new Date(startDate.getTime());
    currentDate.setDate(startDate.getDate() + week * 7);

    const dateString = currentDate.toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
    });

    // Ajouter la date et le pourcentage aléatoire à la map
    money += moneyStep;
    data.set(dateString, money + Math.random() * 30);
  }

  return data;
}

const ExploreGraphBorrowDetail = () => {
  //EXEMPLE 1 (GAUCHE)
  //Pourcentage 0 to 100 step 10
  // const labelsX = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];

  // const datasets = [
  //     {
  //       label: "<90% Borrow APY",
  //       data: [5,6,7,8,9,10,11,12,13,45],
  //       borderColor:'#1DA1F2',
  //       backgroundColor: '#1DA1F2'
  //     },
  //     {
  //       label: ">90% Max Borrow APY",
  //       data: [5,6,7,8,9,10,11,12,13,50],
  //       borderColor:'#1DF2A1',
  //       backgroundColor: '#1DF2A1'
  //     },
  //     {
  //       label: "<90% Retail APY",
  //       data: [5,7,9,11,13,15,17,19,21,55],
  //       borderColor:'#A11DF2',
  //       backgroundColor: '#A11DF2'
  //     },
  //     {
  //       label: ">90% Max Supply APY",
  //       data: [5,7,9,11,13,15,17,19,21,53],
  //       borderColor:'#F2A11D',
  //       backgroundColor: '#F2A11D'
  //     },
  //   ]

  // const guideLines = [
  //   {"labelX":"2024-03-25", "name":"Important Date"},
  //   {"labelX":"2024-04-21", "name":"Super Date"},
  // ]

  //EXEMPLE 2 (DROITE)
  //Pourcentage 0 to 100 step 10
  // const labelsX = ["0%", "25%", "50%", "75%", "100%", "125%"];

  // const datasets = [
  //     {
  //       label: "Base Interest Rate",
  //       data: [1,1],
  //       borderColor:'#1DF2A1',
  //       backgroundColor: '#1DF2A1'
  //     },
  //     {
  //       label: "Credora CCC Rating",
  //       data: [1,1,1,1,1.5,2],
  //       borderColor:'#1DA1F2',
  //       backgroundColor: '#1DA1F2'
  //     },
  //     {
  //       label: "Credora BBB+ Rating",
  //       data: [1,1,1,1,2],
  //       borderColor:'#A11DF2',
  //       backgroundColor: '#A11DF2'
  //     },
  //    ]
  //max={3}

  // Utiliser la fonction pour générer les données
  const weeklyPercentages = generateWeeklyData();
  const labelsX = Array.from(weeklyPercentages.keys());
  const datasets = [
    {
      label: "Data",
      data: Array.from(weeklyPercentages.values()),
      borderColor: "#1DA1F2",
      backgroundColor: "#1DA1F2",
    },
  ];

  return (
    <>
      <div className="text-[20px] font-semibold mt-16 mb-8">Explore Market (Coming Soon)</div>

      <div
        className="mockup-window border-[#343434] border p-4"
        style={{ backgroundColor: "#181818" }}
      >
        <MoreGraphicsV3
          datasets={datasets}
          labelsX={labelsX}
          total={"$100M"}
          isFill={true}
          transparency={5}
          afterSignY="M"
          beforeSignY="$"
        ></MoreGraphicsV3>
      </div>
    </>
  );
};

export default ExploreGraphBorrowDetail;
