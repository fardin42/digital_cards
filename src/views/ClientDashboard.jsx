import React, { useState, useEffect } from 'react';
import { insforge } from '../lib/insforge';
import EditorForm from '../components/Client/EditorForm';
import LivePreview from '../components/Client/LivePreview';

const ClientDashboard = ({ setView, devMode, session }) => {
  const [profile, setProfile] = useState({
    name: 'Your Name',
    job_title: 'Your Job Title',
    whatsapp: '',
    bio: 'Add your biography or about section here...',
    media_url: '',
    template_id: 'corporate', // Default to the new layout
    show_bank_details: false,
    bank_details: [],
    
    company_name: 'Company Name',
    company_logo_url: '',
    theme_config: { primary_color: '#4a90e2', badge_text: '', category: '' },
    contact_info: { email: '', phone: '', office_address: '', map_url: '' },
    services: [],
    working_hours: []
  });
  
  const [saving, setSaving] = useState(false);
  const [cardId, setCardId] = useState(null); 

  useEffect(() => {
    if (devMode) return;
    
    if (session?.user?.id) {
       const loadData = async () => {
         const { data: pData } = await insforge.database.from('profiles').select('*').eq('id', session.user.id).single();
         const { data: cData } = await insforge.database.from('cards').select('*').eq('client_id', session.user.id).single();
         
         if (pData) {
            const cInfo = cData || {};
            setCardId(cInfo.id);
            setProfile({
               name: pData.name || '',
               whatsapp: pData.whatsapp || '',
               job_title: pData.job_title || '',
               bio: pData.bio || '',
               
               template_id: cInfo.template_id || 'corporate',
               media_url: cInfo.media_url || '',
               show_bank_details: cInfo.show_bank_details || false,
               bank_details: cInfo.bank_details || [],
               
               company_name: cInfo.company_name || '',
               company_logo_url: cInfo.company_logo_url || '',
               theme_config: cInfo.theme_config || { primary_color: '#F6AD55', badge_text: '', category: '' },
               contact_info: cInfo.contact_info || { email: '', phone: '', office_address: '', map_url: '' },
               services: cInfo.services || [],
               working_hours: cInfo.working_hours || []
            });
         }
       };
       loadData();
    }
  }, [session, devMode]);

  const handleUpdate = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    
    if (devMode) {
      setTimeout(() => setSaving(false), 800);
      return;
    }

    if (session?.user?.id) {
       await insforge.database.from('profiles').update({
           name: profile.name,
           whatsapp: profile.whatsapp,
           job_title: profile.job_title,
           bio: profile.bio
       }).eq('id', session.user.id);
       
       if (cardId) {
          await insforge.database.from('cards').update({
             template_id: profile.template_id,
             media_url: profile.media_url,
             show_bank_details: profile.show_bank_details,
             bank_details: profile.bank_details,
             company_name: profile.company_name,
             company_logo_url: profile.company_logo_url,
             theme_config: profile.theme_config,
             contact_info: profile.contact_info,
             services: profile.services,
             working_hours: profile.working_hours
          }).eq('id', cardId);
       }
    }
    
    setSaving(false);
  };

  const handleSaveContact = () => {
    const fn = profile.name;
    const tel = profile.contact_info?.phone || profile.whatsapp;
    const email = profile.contact_info?.email;
    const org = profile.company_name;
    
    let vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${fn}\nORG:${org}\nTEL;TYPE=CELL:${tel}\n`;
    if (email) vcard += `EMAIL:${email}\n`;
    vcard += `END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fn.replace(/ /g, '_')}.vcf`;
    a.click();
  };

  const templates = [
    { id: 'corporate', name: 'Corporate Compliance (Premium)' },
    { id: 'template_1', name: 'Neumorphic Clean' },
    { id: 'template_2', name: 'Masonry Fluid' },
    { id: 'template_3', name: 'Diagonal Structural' },
    { id: 'template_4', name: 'Organic Blob' },
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Inter", sans-serif' }}>
      
      <nav style={{ padding: '20px 40px', background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0, fontWeight: '700', color: '#1a202c' }}>DigiCards <span style={{ color: '#4299e1', fontWeight: 500 }}>Portal {devMode && '(DEV bypass)'}</span></h2>
        <button onClick={() => {
           if (session) insforge.auth.signOut().then(() => window.location.reload());
           else setView('home');
        }} style={{ background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontWeight: 600 }}>Log Out</button>
      </nav>

      <div style={{ display: 'flex', flex: 1, padding: '40px', gap: '40px', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* LEFT SIDE: HUGE DATA EDITOR */}
        <div style={{ flex: '1', background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflowY: 'auto', maxHeight: 'calc(100vh - 120px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
             <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Card Configuration</h3>
             <button onClick={handleUpdate} className="btn-primary" style={{ padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', background: '#1a202c', color: '#fff', border: 'none', fontWeight: 600 }}>
               {saving ? 'Saving...' : 'Save Changes'}
             </button>
          </div>

          <EditorForm 
            profile={profile} 
            setProfile={setProfile} 
            templates={templates} 
          />
        </div>

        {/* RIGHT SIDE: LIVE PREVIEW WINDOW (MOBILE SPECIFIC RENDER) */}
        <div style={{ flex: '0 0 400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#4a5568', fontWeight: 600 }}>Live Preview</h3>
          
          <LivePreview 
            profile={profile} 
            handleSaveContact={handleSaveContact} 
          />

        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
