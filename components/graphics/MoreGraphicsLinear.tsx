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


interface Dataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  fill?: boolean;
  pointRadius?: number;
  borderWidth?: number;  
}

interface Props {  
  labelsX: string[], // Obligatoire
  datasets: Dataset[], // Obligatoire
  signY?: string, // Optionnel
  isFill?: boolean, // Optionnel
  transparency?: number, // Optionnel
  borderWidth?: number, // Optionnel
  pointRadius?: number, // Optionnel
  minY?: number, // Optionnel
  maxY?: number, // Optionnel
}

let datasets = [];
//labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
// [
//   {
//     label: "Revenue",
//     data: [65, 59, 80, 81, 56, 55],
//     borderColor: 'rgb(75, 192, 192)',
//     backgroundColor: 'rgba(75, 192, 192, .2)', // Couleur de fond avec transparence
//     fill: true, // Activer le remplissage
//     tension: 0.0,
//     pointRadius: 0,
//     borderWidth: 2,
//   },
//   {
//     label: "Expenses",
//     data: [28, 48, 40, 19, 86, 27],
//     borderColor: 'rgb(255, 99, 132)',
//     backgroundColor: 'rgba(255, 99, 132, 0.2)', // Couleur de fond avec transparence
//     fill: true, // Activer le remplissage
//     tension: 0.0,
//     pointRadius: 0,
//     borderWidth: 2,
//   }
// ]

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

  console.log('>-- COLOR 2 --<')
  console.log(colorString)

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

      // Formater la date en chaîne de caractères "YYYY-MM-DD"
      const dateString = currentDate.toISOString().split('T')[0];

      // Ajouter la date et le pourcentage aléatoire à la map
      data.set(dateString, randomPercentage());
  }

  return data;
}


// Fonction pour générer un pourcentage aléatoire entre 10% et 100%
function randomPercentage(): number {
  return Math.floor(Math.random() * 20) + 10;
}



const MoreGraphicLinear = ({ datasets, labelsX, isFill, signY, borderWidth, pointRadius, transparency, minY, maxY }: Props) => {

  if (signY === undefined) {
    signY = "";
  }
  else {
    signY = " " + signY;
  }
  
  // Utilisez useState pour conserver et mettre à jour les datasets localement après la première définition
// Utilisation de l'interface Dataset pour typifier l'état
const [chartDatasets, setChartDatasets] = useState<Dataset[]>([]);
const [chartLabels, setChartLabels] = useState<string[]>([]);
const [annotations, setAnnotations] = useState<any[]>([]);



  // line1: {
  //   type: 'line', // Assurez-vous d'utiliser des valeurs littérales pour 'type'
  //   xMin: '2024-03-25',
  //   xMax: '2024-03-25',
  //   borderColor: 'white',
  //   borderWidth: 1,
  //   borderDash: [5, 5], //
  //   label: {
  //     display: true,
  //     content: 'Important Date',  // Le contenu du label
  //     position: 'start',          // La position du label ('start', 'center', 'end')              
  //     color: 'white',             // Couleur du texte du label
  //     font: {
  //       weight: 'normal', // Correct use of fontWeight
  //       size: 12,   
  //     },
  //     xAdjust: 0,
  //     yAdjust: -20
  //   }         
  // },      

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
          // Ajout de l'unité "€" après chaque valeur
          callback: function(value: any) {
            return `${value}` + signY;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const
      },
      annotation: {
        annotations: annotations 
        }
      }          
  };

  return <Line data={inputData} options={options} />;
};

export default MoreGraphicLinear;

