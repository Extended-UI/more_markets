import React, { useEffect, useState } from 'react'
import MoreGraphicLinear from './MoreGraphicsLinear'
import Icon from '../FontAwesomeIcon'

interface Props {  
    labelsX: string[], // Obligatoire
    datasets: Dataset[], // Obligatoire
    afterSignY?: string, // Optionnel
    beforeSignY?: string, // Optionnel
    isFill?: boolean, // Optionnel
    transparency?: number, // Optionnel
    borderWidth?: number, // Optionnel
    pointRadius?: number, // Optionnel
    minY?: number, // Optionnel
    maxY?: number, // Optionnel
    guideLines?: any[], // Optionnel
    comment?: string, // Optionnel
    total?: string, // Optionnel
  }

const MoreGraphicsV1: React.FC<Props> =  ({ datasets, labelsX, comment, isFill, afterSignY, beforeSignY, borderWidth, pointRadius, transparency, minY, maxY, guideLines, total }: Props) => {    
  const [visibility, setVisibility] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const initialVisibility = datasets.reduce<{[key: string]: boolean}>((acc, dataset) => {
      acc[dataset.label] = true; // Par défaut, tous les graphiques sont visibles
      return acc;
    }, {});
    setVisibility(initialVisibility);
  }, [datasets]);


      // Écouter les changements de visibilité
    useEffect(() => {
        console.log("Visibility updated: ", visibility);
        console.log("Visibility updated: ", datasets);
    }, [visibility, datasets]);

  
  const toggleVisibility = (label: string): void => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [label]: !prevVisibility[label],
    }));    

  };

  const filteredDatasets = datasets.filter(dataset => visibility[dataset.label]);

  return (
    <>
      <div className="p-2 flex justify-between items-center overflow-x-auto overflow-y-hidden"  style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', // Works in Firefox
            msOverflowStyle: 'none', // Works in IE and Edge
        }}>                    
        <div className="p-2 flex justify-center items-center">                                    
          {datasets.map((dataset) => (
            <div key={dataset.label} className="mr-16">
              <div className="p-2 flex justify-center items-center">
                  <Icon icon="circle" className="text-xl cursor-pointer mr-2" style={{ color: dataset.borderColor }} />
                  <div className="text-xl mb-0 mr-2">{dataset.label}</div>
                  <Icon 
                    icon={visibility[dataset.label] ? "eye" : "eye-slash"} 
                    className="text-xl cursor-pointer mr-2" 
                    style={{ color: '#fff' }} 
                    onClick={() => toggleVisibility(dataset.label)}
                  />
              </div>
              <div className="text-3xl text-center">{dataset.percentage}<span className="text-gray-500 ml-2">%</span></div>
            </div>
          ))}                
        </div>
        <div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn m-1 btn-neutral">1 Week <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 ml-2 stroke-current"> 
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path> 
                </svg></label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
                  <li className="bg-neutral"><a>Item 1</a></li>
                  <li className="bg-neutral"><a>Item 2</a></li>
                  <li className="bg-neutral"><a>Item 3</a></li>
                </ul>
              </div>                       
            </div> 
      </div>            
      <div><MoreGraphicLinear key={JSON.stringify(filteredDatasets)} datasets={filteredDatasets} labelsX={labelsX} isFill={isFill} transparency={transparency} afterSignY={afterSignY} borderWidth={borderWidth} pointRadius={pointRadius} minY={minY} maxY={maxY} guideLines={guideLines} /></div>      
    </>
  )
}

export default MoreGraphicsV1
