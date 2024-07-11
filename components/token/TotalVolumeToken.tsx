import React, { ReactNode } from 'react'


interface Props {
  children: ReactNode;
}


const TotalVolumeToken: React.FC<Props> = ({ children }) => {  
  return (
    <span className='badge badge-outline more-text-gray'>
      ${children}M
    </span>
  )
}

export default TotalVolumeToken
