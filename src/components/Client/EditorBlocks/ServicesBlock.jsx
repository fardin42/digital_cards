import React from 'react';
import SectionHeader from '../../ui/SectionHeader';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

const ServicesBlock = ({ profile, setProfile }) => {
  return (
    <div style={{ flex: 1 }}>
      <SectionHeader title="Core Services" color="#ED64A6" />
      
      {profile.services.map((srv, idx) => (
        <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <Input 
            value={srv} 
            onChange={(e) => { 
              const n = [...profile.services]; 
              n[idx] = e.target.value; 
              setProfile({...profile, services: n}); 
            }} 
          />
          <Button 
            variant="danger-light" 
            size="icon"
            aria-label="Delete service"
            title="Delete service"
            onClick={(e) => { 
              e.preventDefault(); 
              setProfile({...profile, services: profile.services.filter((_, i) => i !== idx)}); 
            }}
          >
            X
          </Button>
        </div>
      ))}
      
      <Button 
        variant="secondary" 
        size="sm"
        onClick={(e) => { 
          e.preventDefault(); 
          setProfile({...profile, services: [...profile.services, 'New Service']}); 
        }}
      >
        + Add Service
      </Button>
    </div>
  );
};

export default ServicesBlock;
