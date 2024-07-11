import React from 'react';

interface Props {
  type: string;
  value: string | number;
  token: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string;
  max?: string;  
  balance: number;
}

const InputTokenMax: React.FC<Props> = ({ type, value, onChange, placeholder, min, max, token, balance }) => {

  const setMaxWithBalance = () => {
    max = balance.toString();
  };
  return (
    <div className='w-full more-bg-primary flex justify-center items-center space-x-4'>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="input input-bordered text-left text-3xl w-full max-w-xs more-input-text-color more-input-bg-color"
        placeholder={placeholder}
        min={min}
        max={max}
      />      
      <div className="text-l">{token}</div>
      <button type="button" className="btn btn-outline btn-info">Max</button>
    </div>
  );
};

export default InputTokenMax;
