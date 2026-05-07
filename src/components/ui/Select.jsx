import React from 'react';

const Select = ({ children, style, ...props }) => {
  return (
    <select 
      style={{ 
        padding: '10px', 
        border: '1px solid #cbd5e0', 
        borderRadius: '6px', 
        fontSize: '0.85rem', 
        color: '#2d3748', 
        background: '#fff', 
        outline: 'none', 
        width: '100%',
        boxSizing: 'border-box',
        ...style 
      }} 
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
