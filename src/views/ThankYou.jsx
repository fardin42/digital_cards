import React from 'react';

export default function ThankYou({ paidSlug, setView }) {
  return (
    <section className="thank-you-view">
      <div className="thank-you-card" style={{ maxWidth: '500px', padding: '40px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎉</div>
        <h1 style={{ fontSize: '2rem' }}>Payment Successful!</h1>
        <p style={{ color: 'var(--text-dim)' }}>Your digital card is being generated. You can find it live at:</p>
        
        <div className="live-link-box">
           mydigi.cards/{paidSlug}
        </div>
        
        <div className="step-card">
          <h3 style={{ marginBottom: '15px', color: 'var(--text)' }}>What happens next?</h3>
          <div className="step-item">
            <span className="step-number">1</span>
            <span>Our designers will start customizing your template.</span>
          </div>
          {/* <div className="step-item">
            <span className="step-number">2</span>
            <span>You'll receive a WhatsApp message once it's live.</span>
          </div> */}
          <div className="step-item">
            <span className="step-number">2</span>
            <span>Your card will be active within 72 hours.</span>
          </div>

          <div className="step-item" style={{ marginTop: '20px', padding: '15px', background: 'rgba(56, 161, 105, 0.1)', borderRadius: '12px', border: '1px dashed #38a169' }}>
            <span className="step-number" style={{ background: '#38a169' }}>3</span>
            <div>
              <p style={{ fontWeight: '600', color: '#38a169', marginBottom: '4px' }}>Submit Your Details</p>
              <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>To start designing your card, please fill out your profile information.</p>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdOURy9bdKu0a7XRBomtCAjqk_jlMxd-CPdXInaZ1X2Ks4Y2g/viewform?usp=header" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: 'inline-block', padding: '8px 16px', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                Fill Profile Details →
              </a>
            </div>
          </div>
        </div>
        
        <button className="btn-primary" onClick={() => setView('home')} style={{marginTop: '30px', width: '100%' }}>
          Back to Website
        </button>
      </div>
    </section>
  );
}
