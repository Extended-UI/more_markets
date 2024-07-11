import React from 'react';

interface Props {
  type: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string;
  max?: string;
}

const InputToken: React.FC<Props> = ({ type, value, onChange, placeholder, min, max }) => {
  return (
    <div className='w-full bg-green-800'>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="input input-bordered w-full max-w-xs"
        placeholder={placeholder}
        min={min}
        max={max}
      />
    </div>
  );
};

export default InputToken;
