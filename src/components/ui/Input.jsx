import React from 'react';

const Input = ({ style, ...props }) => {
  return (
    <input 
      style={{ 
        padding: '10px', 
        border: '1px solid #cbd5e0', 
        borderRadius: '6px', 
        fontSize: '1rem', 
        outline: 'none', 
        width: '100%',
        boxSizing: 'border-box',
        ...style 
      }} 
      {...props} 
    />
  );
};

export default Input;
