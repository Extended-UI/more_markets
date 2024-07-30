import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ChartOptions } from 'chart.js';
// Enregistrer les éléments nécessaires de Chart.js, y compris Filler pour le remplissage
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);




interface Props {  
  labelsX: string[], // Obligatoire
  datasets: Dataset[], // Obligatoire
  beforeSignY?: string, // Optionnel
  afterSignY?: string, // Optionnel
  isFill?: boolean, // Optionnel
  transparency?: number, // Optionnel
  borderWidth?: number, // Optionnel
  pointRadius?: number, // Optionnel
  minY?: number, // Optionnel
  maxY?: number, // Optionnel
  guideLines?: any[], // Optionnel
}

function getColor(color?:string, transpary?:number):string {

  let colorString = "";
  if (color === undefined) {
    colorString = "rgb(255, 255, 255)";
  }
  else if (color.includes("rgb")) {
    return color
  }  
  else if (color.includes("#")) {
    //Convertir la couleur en hexadécimal en RGB
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    colorString =  "rgb(" + r + "," + g + "," + b + ")";
  }
  else {
    colorString =  color;
  }

  if (transpary != undefined) {
    //replace rgb by rgba
    colorString = colorString.replace("rgb", "rgba");
    colorString = colorString.replace(")", "," + transpary / 100 + ")");
  }

  return colorString;
  
}

// Fonction pour générer une map de dates avec des pourcentages pour chaque semaine de l'année 2024
function generateWeeklyData(): Map<string, number> {
  const startDate = new Date('2024-01-01');
  const data = new Map<string, number>();

  for (let week = 0; week < 52; week++) {
      // Calculer la date de début de chaque semaine
      const currentDate = new Date(startDate.getTime());
      currentDate.setDate(startDate.getDate() + week * 7);

      const dateString = currentDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });

      // Ajouter la date et le pourcentage aléatoire à la map
      data.set(dateString, randomPercentage());
  }

  return data;
}


// Fonction pour générer un pourcentage aléatoire entre 10% et 100%
function randomPercentage(): number {
  return Math.floor(Math.random() * 20) + 10;
}



const MoreGraphicLinear = ({ datasets, labelsX, isFill, afterSignY, beforeSignY, borderWidth, pointRadius, transparency, minY, maxY, guideLines }: Props) => {

  if (afterSignY === undefined) {
    afterSignY = "";
  }

  if (beforeSignY === undefined) {
    beforeSignY = "";
  }

  // Utilisez useState pour conserver et mettre à jour les datasets localement après la première définition
// Utilisation de l'interface Dataset pour typifier l'état
const [chartDatasets, setChartDatasets] = useState<Dataset[]>([]);
const [chartLabels, setChartLabels] = useState<string[]>([]);
const [chartAnnotations, setAnnotations] = useState<any[]>([]);


  useEffect(() => {

    if (datasets.length === 0) {
      
      // Utiliser la fonction pour générer les données
      const weeklyPercentages = generateWeeklyData();
      labelsX = Array.from(weeklyPercentages.keys());  
      datasets = [
          {
            label: "Data",
            data: Array.from(weeklyPercentages.values()),
            borderColor:'#1DA1F2',        
            backgroundColor: '#1DA1F2'
          },
        ]
    }

    const updatedDatasets = datasets.map(dataset => ({
      ...dataset,
      fill: isFill ?? false,
      pointRadius: pointRadius ?? 0,
      borderWidth: borderWidth ?? 1,
      borderColor: getColor(dataset.borderColor),
      backgroundColor: getColor(dataset.backgroundColor, transparency),
    }));

    setChartLabels(labelsX);
    setChartDatasets(updatedDatasets);

    if (guideLines !== undefined) {
      let guideLinesData: any = {};
      let y = 0;
      for (let i = 0; i < guideLines.length; i++) {
        let label = "line" + (i+1);
        let data: any = {};
        data[label] = {
            type: 'line', // Assurez-vous d'utiliser des valeurs littérales pour 'type'
            xMin: guideLines[i]['labelX'],
            xMax: guideLines[i]['labelX'],
            borderColor: 'white',
            borderWidth: 1,
            borderDash: [5, 5], //
            label: {
              display: true,
              backgroundColor: 'rgba(255, 255, 255, 0.0)',
              content: guideLines[i]['name'],  // Le contenu du label
              position: 'end',          // La position du label ('start', 'center', 'end')              
              color: 'white',             // Couleur du texte du label
              font: {
                weight: 'normal', // Correct use of fontWeight
                size: 12,   
              },
              xAdjust: 0,
              yAdjust: y += 20
            }         
          };  
          
        guideLinesData = {
          ...guideLinesData,
          ...data,
        };
        
      }

      console.log("guideLinesData");
      console.log(guideLinesData);
      setAnnotations(guideLinesData);
    }    

  }, [datasets, labelsX, isFill, borderWidth, pointRadius, transparency]);

  const inputData = {
    labels: chartLabels,
    datasets: chartDatasets
  };

  const options: ChartOptions<"line"> = {
    scales: {
      y: {
        beginAtZero: true,
        min: minY ?? undefined, // Valeur minimale de l'axe Y
        max: maxY ?? undefined, // Valeur maximale de l'axe Y
        ticks: {   
          stepSize: 1,  // Chaque unité sur l'axe aura un tick
          autoSkip: true,
          autoSkipPadding: 50,          
          // Ajout de l'unité "€" après chaque valeur
          callback: function(value: any) {
            return  beforeSignY +  `${value}` + afterSignY;
          }
        }                              
      },
      x: {
        ticks: {
            maxRotation: 0, // Empêche la rotation des étiquettes
            minRotation: 0,  // Fixe les étiquettes à l'horizontal
            autoSkip: true,
            autoSkipPadding: 50 
        }
      }      
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const
      },
      annotation: {
        annotations: chartAnnotations 
        }
      }          
  };

  return <Line data={inputData} options={options} />;
};

export default MoreGraphicLinear;

