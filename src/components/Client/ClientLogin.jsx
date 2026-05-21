import React, { useState } from 'react';
import { insforge } from '../../lib/insforge';

export default function ClientLogin({ setSession, setView }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState(1); // 1 = Credential Form, 2 = Email Verification OTP
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const submitCredentials = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (isSignUp) {
      // Execute Signup Request
      const { data, error } = await insforge.auth.signUp({
        email: form.email,
        password: form.password,
        name: form.name
      });
      
      if (error) {
        setErrorMsg(error.message);
      } else if (data?.requireEmailVerification) {
        setStep(2); // Ask for the 6-digit OTP sent via email
      } else if (data?.accessToken) {
        setSession(data);
      }
    } else {
      // Execute standard Sign In
      const { data, error } = await insforge.auth.signInWithPassword({
        email: form.email,
        password: form.password
      });

      if (error) {
         setErrorMsg(error.message);
      } else if (data?.accessToken) {
         setSession(data);
      }
    }
    setLoading(false);
  };

  const verifyAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { data, error } = await insforge.auth.verifyEmail({
      email: form.email,
      otp: otp
    });

    if (error) {
      setErrorMsg("Invalid code. Please check your email.");
    } else if (data?.accessToken) {
      setSession(data);
    }
    setLoading(false);
  };

  if (step === 2) {
    return (
      <section className="hero">
        <div className="card-form" style={{maxWidth: '400px', margin: '0 auto'}}>
          <h2 style={{textAlign: 'center'}}>Verify Your Email</h2>
          <p style={{color: '#a0aec0', textAlign: 'center', marginBottom: '20px'}}>
             We sent a 6-digit code to {form.email}.
          </p>
          
          {errorMsg && <div style={{ background: '#FED7D7', color: '#9B2C2C', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>{errorMsg}</div>}

          <form onSubmit={verifyAccount} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="input-group">
              <label htmlFor="otpCode">6-Digit Code</label>
              <input id="otpCode" required type="text" placeholder="123456" value={otp} onChange={e => setOtp(e.target.value)} style={{ padding: '12px', fontSize: '1.2rem', letterSpacing: '4px', textAlign: 'center', boxSizing: 'border-box', width: '100%' }} />
            </div>
            <button className="btn-primary" type="submit" disabled={loading} style={{ width: '100%', padding: '14px', fontSize: '1.1rem' }}>
              {loading ? 'Verifying...' : 'Complete Signup'}
            </button>
            <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#3182CE', marginTop: '10px', cursor: 'pointer' }}>
               Cancel
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="hero">
      <button onClick={() => setView('home')} style={{background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', marginBottom: '20px'}}>
        ← Back to Home
      </button>
      
      <div className="card-form" style={{maxWidth: '400px', margin: '0 auto'}}>
        <h2 style={{textAlign: 'center'}}>{isSignUp ? 'Create Dashboard Account' : 'Client Login'}</h2>
        <p style={{color: '#a0aec0', textAlign: 'center', marginBottom: '30px'}}>
          {isSignUp ? 'Link your purchased URLs to a secure account.' : 'Access and manage your digital cards securely.'}
        </p>

        {errorMsg && (
          <div style={{ background: '#FED7D7', color: '#9B2C2C', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={submitCredentials} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isSignUp && (
             <div className="input-group">
               <label htmlFor="fullName">Full Name</label>
               <input id="fullName" required type="text" placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ padding: '12px', boxSizing: 'border-box', width: '100%' }} />
             </div>
          )}
          <div className="input-group">
            <label htmlFor="emailAddress">Email Address</label>
            <input id="emailAddress" required type="email" placeholder="registered@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ padding: '12px', boxSizing: 'border-box', width: '100%' }} />
          </div>
          <div className="input-group">
             <label htmlFor="password">Password</label>
             <input id="password" required type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={{ padding: '12px', boxSizing: 'border-box', width: '100%' }} />
          </div>
          
          <button className="btn-primary" type="submit" disabled={loading} style={{ width: '100%', padding: '14px', fontSize: '1.1rem', marginTop: '10px' }}>
            {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsSignUp(!isSignUp)} style={{ background: 'none', border: 'none', color: '#3182CE', cursor: 'pointer', fontWeight: 600 }}>
              {isSignUp ? 'Already have an account? Sign In' : 'New Client? Create Account'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
