import React from 'react';

interface IconTokenProps {
    tokenName: string,
    className?: string,
}

const IconToken: React.FC<IconTokenProps> = ({ tokenName, className }) => {
    return (
            <div className={`${className}`}>
                <img src={`/assets/tokens/${tokenName}.svg`} alt={tokenName} />
            </div>
    );
};

export default IconToken;