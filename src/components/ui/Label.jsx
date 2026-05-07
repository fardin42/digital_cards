import React from 'react';

const Label = ({ children, style, ...props }) => {
  return (
    <label 
      style={{ 
        fontSize: '0.85rem', 
        fontWeight: 600, 
        color: '#4a5568', 
        display: 'block',
        ...style 
      }} 
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
