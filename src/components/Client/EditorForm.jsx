import React from 'react';
import CloudinaryWidget from './CloudinaryWidget';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Label from '../ui/Label';
import Select from '../ui/Select';
import RichTextEditor from '../ui/RichTextEditor';
import ServicesBlock from './EditorBlocks/ServicesBlock';
import WorkingHoursBlock from './EditorBlocks/WorkingHoursBlock';

const EditorForm = ({ profile, setProfile, templates }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* 1. BASIC DETAILS */}
      <section style={{ borderBottom: '1px solid #edf2f7', paddingBottom: '30px' }}>
        <SectionHeader title="General Profile" color="#4a90e2" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label>Full Name</Label>
            <Input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label>Company Name (Subtitle)</Label>
            <Input type="text" value={profile.company_name} onChange={(e) => setProfile({...profile, company_name: e.target.value})} />
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label>About Us / Bio (Rich Text)</Label>
            <RichTextEditor 
              value={profile.bio} 
              onChange={(newBio) => setProfile({...profile, bio: newBio})} 
            />
          </div>
        </div>
      </section>

      {/* 2. THEME CONFIG */}
      <section style={{ borderBottom: '1px solid #edf2f7', paddingBottom: '30px' }}>
        <SectionHeader title="Theme & Branding" color="#F6AD55" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label>Category Tag</Label>
            <Input type="text" value={profile.theme_config.category} onChange={(e) => setProfile({...profile, theme_config: { ...profile.theme_config, category: e.target.value }})} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label>Badge Label</Label>
            <Input type="text" value={profile.theme_config.badge_text} onChange={(e) => setProfile({...profile, theme_config: { ...profile.theme_config, badge_text: e.target.value }})} placeholder="e.g. BNI Dynamic Member" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label>Primary Color (Hex)</Label>
            <Input type="color" value={profile.theme_config.primary_color} onChange={(e) => setProfile({...profile, theme_config: { ...profile.theme_config, primary_color: e.target.value }})} style={{ padding: '2px', height: '40px' }} />
          </div>
        </div>
      </section>

      {/* 3. MEDIA SECTION */}
      <section style={{ borderBottom: '1px solid #edf2f7', paddingBottom: '30px' }}>
        <SectionHeader title="Media Assets" color="#9F7AEA" />
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1, padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e0' }}>
            <Label style={{ marginBottom: '10px' }}>Profile Avatar</Label>
            <CloudinaryWidget publicId="avatar" onUploadSuccess={(url) => setProfile({...profile, media_url: `${url}?v=${Date.now()}`})} buttonText="Replace Avatar" />
          </div>
          <div style={{ flex: 1, padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e0' }}>
            <Label style={{ marginBottom: '10px' }}>Company Header Logo</Label>
            <CloudinaryWidget publicId="logo" onUploadSuccess={(url) => setProfile({...profile, company_logo_url: `${url}?v=${Date.now()}`})} buttonText="Replace Logo" />
          </div>
        </div>
      </section>

      {/* 4. EXTENDED CONTACTS */}
      <section style={{ borderBottom: '1px solid #edf2f7', paddingBottom: '30px' }}>
        <SectionHeader title="Contact Information" color="#38B2AC" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label>Action Phone (e.g. +91...)</Label>
            <Input type="text" value={profile.contact_info.phone} onChange={(e) => setProfile({...profile, contact_info: {...profile.contact_info, phone: e.target.value}})} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label>WhatsApp Connect</Label>
            <Input type="text" value={profile.whatsapp} onChange={(e) => setProfile({...profile, whatsapp: e.target.value})} />
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label>Email Address</Label>
            <Input type="text" value={profile.contact_info.email} onChange={(e) => setProfile({...profile, contact_info: {...profile.contact_info, email: e.target.value}})} />
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label>Office Address</Label>
            <Input type="text" value={profile.contact_info.office_address} onChange={(e) => setProfile({...profile, contact_info: {...profile.contact_info, office_address: e.target.value}})} />
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label>Google Maps URL Link</Label>
            <Input type="text" value={profile.contact_info.map_url} onChange={(e) => setProfile({...profile, contact_info: {...profile.contact_info, map_url: e.target.value}})} />
          </div>
        </div>
      </section>

      {/* 5. ARRAYS (Services & Timings) */}
      <section style={{ borderBottom: '1px solid #edf2f7', paddingBottom: '30px', display: 'flex', gap: '20px' }}>
        <ServicesBlock profile={profile} setProfile={setProfile} />
        <WorkingHoursBlock profile={profile} setProfile={setProfile} />
      </section>

      {/* Template Switcher */}
      <div style={{ marginTop: '20px' }}>
        <Label style={{ fontSize: '1.2rem', color: '#2d3748', marginBottom: '16px' }}>Template Engine</Label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {templates.map((tpl) => (
            <div 
              key={tpl.id}
              onClick={() => setProfile({...profile, template_id: tpl.id})}
              style={{
                padding: '24px 16px',
                borderRadius: '12px',
                border: profile.template_id === tpl.id ? '2px solid #4a90e2' : '2px solid #edf2f7',
                background: profile.template_id === tpl.id ? '#ebf8ff' : '#fff',
                cursor: 'pointer',
                textAlign: 'center',
                fontWeight: 600,
                color: profile.template_id === tpl.id ? '#2b6cb0' : '#4a5568',
                transition: 'all 0.2s',
              }}
            >
              {tpl.name}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default EditorForm;
