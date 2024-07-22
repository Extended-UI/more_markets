import React, { ReactNode } from 'react'


interface Props {
  children: ReactNode;
}


const TotalVolumeToken: React.FC<Props> = ({ children }) => {  
  return (
    <span className='badge py-4 badge-outline text-grey bg-[#262626]'>
      ${children}M
    </span>
  )
}

export default TotalVolumeToken
