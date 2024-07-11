import React from 'react';
import MoreButton from '../moreButton/MoreButton';

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
  
  return (
    <div className='w-full more-bg-primary flex justify-center items-center space-x-4'>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="input input-bordered text-left text-3xl w-full max-w-xs more-input-text-color more-input-bg-color"
        placeholder={placeholder}        
      />      
      <div className="text-l">{token}</div>      
      <MoreButton text="Max" onClick={() => setMax(balance)} color="gray" />
    </div>
  );
};

export default InputTokenMax;
