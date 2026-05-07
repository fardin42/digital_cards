import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', style, ...props }) => {
  let bg = '#4a90e2';
  let color = '#fff';
  let border = 'none';

  if (variant === 'danger') {
    bg = '#e53e3e';
  } else if (variant === 'danger-light') {
    bg = '#fed7d7';
    color = '#c53030';
  } else if (variant === 'secondary') {
    bg = '#edf2f7';
    color = '#4a5568';
  } else if (variant === 'success') {
    bg = '#38a169';
  } else if (variant === 'outline') {
    bg = 'transparent';
    color = '#4a5568';
    border = '1px solid #e2e8f0';
  } else if (variant === 'dark') {
    bg = '#1a202c';
  }

  let padding = '10px 16px';
  let fontSize = '0.9rem';
  
  if (size === 'sm') {
    padding = '6px 12px';
    fontSize = '0.8rem';
  } else if (size === 'icon') {
    padding = '8px';
  }

  return (
    <button 
      style={{ 
        padding, 
        borderRadius: '6px', 
        cursor: 'pointer', 
        fontWeight: 600, 
        fontSize,
        background: bg, 
        color, 
        border, 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '6px',
        ...style 
      }} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
