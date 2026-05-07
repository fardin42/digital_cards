import React from 'react';

export default function AdminLogin({ adminPass, setAdminPass, handleAdminLogin, setView }) {
  return (
    <div className="auth-gate">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '8px' }}>Super Admin Login</h2>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Restricted access for developers only.</p>
      </div>
      <form onSubmit={handleAdminLogin}>
        <div className="input-group">
          <label htmlFor="admin-password">Super Admin Password</label>
          <input 
            id="admin-password"
            type="password" 
            value={adminPass} 
            onChange={(e) => setAdminPass(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <button className="btn-primary" style={{ width: '100%', height: '50px' }}>Enter Dashboard</button>
        <button 
          type="button"
          onClick={() => setView('home')} 
          style={{marginTop: '20px', background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', fontWeight: '500'}}
        >
          ← Back to Site
        </button>
      </form>
    </div>
  );
}
