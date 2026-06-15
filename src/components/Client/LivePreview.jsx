import React, { useMemo } from 'react';
import { Phone, Mail, MapPin, Briefcase, Zap, User, Clock, QrCode, MessageCircle, Download } from 'lucide-react';
import edjsHTML from 'editorjs-html';

const edjsParser = edjsHTML();

const LivePreview = ({ profile, handleSaveContact }) => {
  const bioHTML = useMemo(() => {
    if (!profile.bio) return '';
    
    let data = profile.bio;
    
    // 1. If it's a string, try to parse it once
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
        
        // 2. Double-check for double-stringified data (sometimes happens with DB drivers)
        if (typeof data === 'string') {
           data = JSON.parse(data);
        }
      } catch (e) {
        // Not JSON, return as plain text
        return profile.bio;
      }
    }

    // 3. If we have a valid EditorJS object with blocks
    if (data && typeof data === 'object' && data.blocks) {
      try {
        const htmlParts = edjsParser.parse(data);
        return Array.isArray(htmlParts) ? htmlParts.join('') : String(htmlParts);
      } catch (err) {
        console.error("EditorJS parsing error:", err);
        return profile.bio;
      }
    }
    
    return profile.bio;
  }, [profile.bio]);

  return (
    <div style={{ 
      width: '375px', 
      height: '812px', 
      backgroundColor: '#fff', 
      borderRadius: '40px', 
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', 
      overflow: 'hidden',
      position: 'relative',
      border: '8px solid #1a202c'
    }}>
      <style>{`
        .bio-content h2, .bio-content h3, .bio-content h4 {
          margin: 15px 0 10px 0;
          line-height: 1.2;
          color: #1a202c;
        }
        .bio-content p {
          margin-bottom: 10px;
        }
        .bio-content ul, .bio-content ol {
          margin: 10px 0;
          padding-left: 20px;
        }
        .bio-content li {
          margin-bottom: 5px;
        }
      `}</style>
      
      {profile.template_id === 'corporate' ? (
        // NEW ARCHITECTURE: CORPORATE COMPLIANCE TEMPLATE
        <>
          {/* Main scrollable content body */}
          <div style={{ width: '100%', height: '100%', backgroundColor: '#fcfcfd', overflowY: 'auto', paddingBottom: '90px' }}>
             
             {/* Top Logo Header */}
             <div style={{ height: '140px', background: '#fff', borderTop: '6px solid #1a202c', borderBottom: '3px solid #1a202c', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '20px' }}>
                {profile.company_logo_url ? (
                    <img src={profile.company_logo_url} alt="Logo" style={{ maxHeight: '50px', objectFit: 'contain' }} />
                ) : (
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, letterSpacing: '1px' }}>{profile.company_name}</h2>
                )}
             </div>

             {/* Center Profile Wrap */}
             <div style={{ textAlign: 'center', marginTop: '-55px', position: 'relative' }}>
                {profile.media_url ? (
                  <img src={profile.media_url} alt={profile.name} style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', background: '#fff', position: 'relative', zIndex: 5 }} />
                ) : (
                  <div style={{ width: '110px', height: '110px', borderRadius: '50%', background: '#f1f5f9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', position: 'relative', zIndex: 5 }}>
                    <User size={40} color="#cbd5e0" />
                  </div>
                )}
                <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '15px 0 5px 0', color: '#1a202c' }}>{profile.name}</h1>
                <p style={{ color: profile.theme_config.primary_color, fontWeight: 700, margin: 0, fontSize: '0.95rem' }}>{profile.company_name || profile.job_title}</p>
                
                {profile.theme_config.badge_text && (
                    <div style={{ display: 'inline-block', padding: '4px 12px', border: '1px solid #e2e8f0', borderRadius: '40px', fontSize: '0.75rem', fontWeight: 700, color: '#4a5568', marginTop: '10px', background: '#fff' }}>
                        <span style={{ color: '#E53E3E', marginRight: '4px' }}>■</span> {profile.theme_config.badge_text}
                    </div>
                )}
                {profile.theme_config.category && (
                    <p style={{ fontSize: '0.8rem', color: '#718096', marginTop: '8px' }}>Category: {profile.theme_config.category}</p>
                )}

                {/* SHARE BADGE RIGT SIDE - Mapped to container bounds */}
                <div style={{ position: 'absolute', right: 0, top: '60px', background: '#1a202c', color: '#fff', padding: '12px 6px', borderTopRightRadius: '8px', borderBottomRightRadius: '8px', writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', zIndex: 10 }}>
                    SHARE <Download size={12} />
                </div>
             </div>

             {/* Circulation Buttons */}
             <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '25px' }}>
                {[
                  { icon: <Phone size={18}/>, link: `tel:${profile.contact_info.phone}`, label: 'Call Phone' },
                  { icon: <MessageCircle size={18}/>, link: `https://wa.me/${profile.whatsapp}`, label: 'Message on WhatsApp' },
                  { icon: <MapPin size={18}/>, link: profile.contact_info.map_url || '#', label: 'Open in Maps' },
                  { icon: <Mail size={18}/>, link: `mailto:${profile.contact_info.email}`, label: 'Send Email' }
                ].map((btn, i) => (
                    <a key={i} href={btn.link} aria-label={btn.label} title={btn.label} style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a202c', boxShadow: '0 4px 10px rgba(0,0,0,0.06)', textDecoration: 'none' }}>
                        {btn.icon}
                    </a>
                ))}
             </div>

             {/* Sections Wrapper */}
             <div style={{ padding: '0 20px', marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* ABOUT US */}
                <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <Briefcase size={20} color={profile.theme_config.primary_color} />
                        <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#1a202c', letterSpacing: '1px' }}>ABOUT US</h3>
                    </div>
                    {/* About Us Logo/Image - Synchronized with company_logo_url */}
                    {profile.company_logo_url && (
                        <div style={{ marginBottom: '15px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #edf2f7', background: '#f8fafc' }}>
                            <img src={profile.company_logo_url} alt="About" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain', padding: '10px' }} />
                        </div>
                    )}
                    <div 
                      className="bio-content"
                      style={{ fontSize: '0.85rem', color: '#718096', lineHeight: '1.6', margin: 0 }}
                      dangerouslySetInnerHTML={{ __html: bioHTML }} 
                    />
                </div>

                {/* CORE SERVICES */}
                <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <Zap size={20} color={profile.theme_config.primary_color} />
                        <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#1a202c', letterSpacing: '1px' }}>CORE SERVICES</h3>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {profile.services.map((srv, i) => (
                            <span key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '40px', padding: '6px 16px', fontSize: '0.75rem', color: '#1a202c', fontWeight: 600 }}>{srv}</span>
                        ))}
                    </div>
                </div>

                {/* CONTACT INFO */}
                <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <User size={20} color={profile.theme_config.primary_color} />
                        <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#1a202c', letterSpacing: '1px' }}>CONTACT INFO</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[{ icon: <Phone size={16}/>, label: 'PHONE NUMBER', val: profile.contact_info.phone }, { icon: <Mail size={16}/>, label: 'EMAIL ADDRESS', val: profile.contact_info.email }, { icon: <MapPin size={16}/>, label: 'OFFICE ADDRESS', val: profile.contact_info.office_address }].map((itm, i) => (
                            <div key={i} style={{ background: '#FAFAFA', borderRadius: '12px', padding: '12px 16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div style={{ background: '#fff', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: profile.theme_config.primary_color, flexShrink: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                    {itm.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#a0aec0', letterSpacing: '0.5px', marginBottom: '2px' }}>{itm.label}</div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a202c' }}>{itm.val}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* WORKING HOURS */}
                <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <Clock size={20} color={profile.theme_config.primary_color} />
                        <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#1a202c', letterSpacing: '1px' }}>WORKING HOURS</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {profile.working_hours.map((wh, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: i !== profile.working_hours.length-1 ? '1px dashed #e2e8f0' : 'none' }}>
                                <span style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 600 }}>{wh.days}</span>
                                <span style={{ fontSize: '0.85rem', color: '#1a202c', fontWeight: 800 }}>{wh.hours}</span>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
          </div>

          {/* BOTTOM FLOATING TAB: Outside the scrollable container, anchored to the parent container */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70px', background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', gap: '10px', zIndex: 20 }}>
             <a href={`https://wa.me/${profile.whatsapp?.replace(/[^0-9]/g, '')}`} style={{ flex: 1, background: '#22c55e', color: '#fff', textDecoration: 'none', borderRadius: '40px', padding: '10px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                <MessageCircle size={14}/> WhatsApp
             </a>
             <a href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent('https://mydigi.cards/' + profile.name.replace(/ /g, ''))}`} target="_blank" rel="noreferrer" style={{ flex: 1, background: profile.theme_config.primary_color, color: '#fff', textDecoration: 'none', borderRadius: '40px', padding: '10px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                <QrCode size={14}/> QR Code
             </a>
             <button onClick={handleSaveContact} style={{ flex: 1.2, background: '#1a202c', border: 'none', color: '#fff', textDecoration: 'none', borderRadius: '40px', padding: '10px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
                <User size={14}/> Save Contact
             </button>
          </div>
        </>
      ) : (
        // LEGACY LAYOUT / OTHER TEMPLATES
        <div style={{ width: '100%', height: '100%', background: '#1a202c', position: 'relative' }}>
          <div style={{ height: '50%', backgroundImage: `url(${profile.media_url}${profile.media_url?.includes('?') ? '&' : '?'}t=${Date.now()})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(to top, rgba(26,32,44,1), transparent)' }}></div>
          </div>
          <div style={{ padding: '30px', position: 'relative', zIndex: 10, textAlign: 'center', marginTop: '-40px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#fff' }}>{profile.name}</h1>
            <p style={{ color: profile.theme_config.primary_color || '#4299e1', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem', marginTop: '8px' }}>{profile.company_name || profile.job_title}</p>
            <div 
              className="bio-content"
              style={{ marginTop: '20px', color: '#a0aec0', lineHeight: '1.6', fontSize: '0.95rem' }}
              dangerouslySetInnerHTML={{ __html: bioHTML }} 
            />
            <a href={`https://wa.me/${profile.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '30px', width: '100%', padding: '16px', borderRadius: '12px', background: '#25D366', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
              Message on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivePreview;
