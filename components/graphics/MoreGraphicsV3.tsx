import React from 'react'
import MoreGraphicLinear from './MoreGraphicsLinear'
import Icon from '../FontAwesomeIcon'

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
    guideLines?: any[], // Optionnel
    comment?: string, // Optionnel
    total?: string, // Optionnel
  }

const MoreGraphicsV3 = ({ datasets, labelsX, comment, isFill, signY, borderWidth, pointRadius, transparency, minY, maxY, guideLines, total }: Props) => {
  return (
    <>
        <div className="p-2 flex justify-between items-center">                    
            <div className="p-2">                    
              <div className='text-secondary text-3xl'>{ total }</div>                         
            </div>
             <div className=' flex flex-row sm:flex-col overflow-x-auto'  style={{
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none', // Works in Firefox
                msOverflowStyle: 'none', // Works in IE and Edge
            }}>              
              
              <button className="btn btn-active btn-neutral mr-5 more-text-gray">Total Borrow</button>
              <button className="btn btn-active btn-neutral mr-5 more-text-gray">Total Supply</button>
              <button className="btn btn-active btn-neutral mr-5 more-text-gray">Liquidity</button>
              <button className="btn btn-active btn-neutral mr-5 more-text-gray">Utilization</button>
              <button className="btn btn-active btn-neutral mr-5 more-text-gray">USD</button>
              <button className="btn btn-active btn-neutral mr-5 more-text-gray">DAI</button>   
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn m-1 btn-neutral">3M <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 ml-2 stroke-current"> 
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> 
                </svg></label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
                  <li className="bg-neutral"><a>Item 1</a></li>
                  <li className="bg-neutral"><a>Item 2</a></li>
                  <li className="bg-neutral"><a>Item 3</a></li>
                </ul>
              </div>                       
             </div>            
        </div>
        <div><MoreGraphicLinear datasets={datasets} labelsX={labelsX}></MoreGraphicLinear></div>
    </>
  )
}

export default MoreGraphicsV3
