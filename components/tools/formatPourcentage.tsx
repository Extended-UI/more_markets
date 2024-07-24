import React from 'react';

interface Props {
  value: number;  // Définit clairement que la prop attendue est un nombre
}


const FormatPourcentage: React.FC<Props> = ({ value }) => {
    // Vous pouvez ajouter une vérification ici si besoin
    return  <div className='flex gap-1 justify-end' > <div className=' ' >{value}</div> <div className='text-grey' >%</div></div>
}

export default FormatPourcentage;
