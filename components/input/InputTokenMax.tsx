import React from 'react';
import MoreButton from '../moreButton/MoreButton';
import IconToken from '../token/IconToken';

interface Props {
  type: string;
  value: string | number;
  token: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string;
  max?: string;  
  balance: number;
  setMax: (maxValue: number) => void;
}

const InputTokenMax: React.FC<Props> = ({ type, value, onChange, placeholder, min, max, token, balance, setMax }) => {

  let  logo = token.toLowerCase();
  if (token  === 'Flow') logo = 'abt';
  
  return (
    <div className='w-full  rounded-[8px] more-input-bg-color flex justify-center items-center px-4 gap-4 '>      
      <input      
        type={type}
        value={value}
        onChange={onChange}
        className="input input-bordered text-left text-3xl w-full more-input-text-color more-input-bg-color h-20"
        placeholder={placeholder}        
      />      
      <IconToken tokenName={logo} ></IconToken>
      <div className="text-l">{token}</div>      
      <MoreButton text="Max" onClick={() => setMax(balance)} color="gray" className='h-1 w-20' />
    </div>
  );
};

export default InputTokenMax;
