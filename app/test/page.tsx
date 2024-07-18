"use client";

import MoreGraphicLinear from '@/components/graphics/MoreGraphicsLinear';
import React from 'react'

const Test = () => {


// Fonction pour générer un pourcentage aléatoire entre 10% et 100%
function randomPercentage(): number {
  return Math.floor(Math.random() * 20) + 10;
}

// Fonction pour générer une map de dates avec des pourcentages pour chaque semaine de l'année 2024
function generateWeeklyData(): Map<string, number> {
  const startDate = new Date('2024-01-01');
  const data = new Map<string, number>();

  for (let week = 0; week < 52; week++) {
      // Calculer la date de début de chaque semaine
      const currentDate = new Date(startDate.getTime());
      currentDate.setDate(startDate.getDate() + week * 7);

      // Formater la date en chaîne de caractères "YYYY-MM-DD"
      const dateString = currentDate.toISOString().split('T')[0];

      // Ajouter la date et le pourcentage aléatoire à la map
      data.set(dateString, randomPercentage());
  }

  return data;
}

// Utiliser la fonction pour générer les données
const weeklyPercentages = generateWeeklyData();

// Afficher les données dans la console
console.log(weeklyPercentages);


  // const labelsX = Array.from(weeklyPercentages.keys());  

  // const datasets = [
  //     {
  //       label: "Pains",
  //       data: Array.from(weeklyPercentages.values()),
  //       borderColor:'#1DA1F2',        
  //       backgroundColor: '#1DA1F2'
  //     },
  //   ]
    
  

  return (
    <>
      <div className="mockup-window border-base-300 border"><MoreGraphicLinear labelsX={[]} datasets={[]} ></MoreGraphicLinear></div>
    </>
  )
}

export default Test
