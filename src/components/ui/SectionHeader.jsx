import React from 'react';

const SectionHeader = ({ title, color = '#4a90e2', style }) => {
  return (
    <h4 style={{ 
        color: '#2d3748', 
        borderLeft: `4px solid ${color}`, 
        paddingLeft: '10px', 
        marginBottom: '20px',
        marginTop: 0,
        ...style
    }}>
      {title}
    </h4>
  );
};

export default SectionHeader;
