import React, { useState, useEffect } from 'react';
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://qysyznj5.ap-southeast.insforge.app',
  anonKey: 'your-anon-key' // Replace with your actual anon key from InsForge
});

export default function App() {
  const [view, setView] = useState('home');
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);

  // Fetch clients for Admin View
  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await insforge.database
      .from('profiles')
      .select('name, whatsapp, email, created_at, cards(slug, status, id)')
      .order('created_at', { ascending: false });
    
    if (!error) setClients(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (view === 'admin') fetchClients();
  }, [view]);

  return (
    <div className="container">
      {view === 'home' && (
        <section className="hero">
          <h1>Modern Digital Business Cards for Professionals</h1>
          <p style={{color: '#a0aec0', fontSize: '1.2rem', marginBottom: '30px'}}>
            Join 100+ businesses using MyDigi Cards to share contact details instantly.
          </p>
          <button className="btn-primary" onClick={() => setView('checkout')}>
            Get Your Digital Card - ₹500 Setup
          </button>
          
          <div style={{marginTop: '100px', cursor: 'pointer', opacity: 0.1}} onClick={() => setView('admin')}>
            Admin Login
          </div>
        </section>
      )}

      {view === 'checkout' && (
        <section className="hero">
          <button onClick={() => setView('home')} style={{background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', marginBottom: '20px'}}>
            ← Back to Home
          </button>
          <div className="card-form">
            <h2>Claim Your URL</h2>
            <p style={{color: '#a0aec0'}}>Your card will be at mydigi.cards/<b>slug</b></p>
            
            <CheckoutForm setView={setView} />
          </div>
        </section>
      )}

      {view === 'admin' && (
        <section className="dashboard">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
            <h1>Admin Dashboard</h1>
            <button className="btn-primary" onClick={() => setView('home')}>← View Site</button>
          </div>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>WhatsApp</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, i) => (
                  <tr key={i}>
                    <td><b>{client.name}</b><br/>{client.email}</td>
                    <td>{client.whatsapp}</td>
                    <td>/{client.cards?.[0]?.slug}</td>
                    <td>
                      <span className={`badge badge-${client.cards?.[0]?.status || 'pending'}`}>
                        {client.cards?.[0]?.status || 'pending'}
                      </span>
                    </td>
                    <td>{new Date(client.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

function CheckoutForm({ setView }) {
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', slug: '' });

  const handlePay = async (e) => {
    e.preventDefault();
    
    // 1. Create Order
    const res = await fetch('https://qysyznj5.ap-southeast.insforge.app/functions/create-razorpay-order', {
      method: 'POST',
      body: JSON.stringify(form)
    });
    const { subscriptionId, keyId, error } = await res.json();
    
    if (error) return alert(error);

    // 2. Open Razorpay
    const options = {
      key: keyId,
      subscription_id: subscriptionId,
      name: "MyDigi Cards",
      description: "One-time Setup + Monthly Subscription",
      handler: async function (response) {
        // 3. Verify Payment
        const vRes = await fetch('https://qysyznj5.ap-southeast.insforge.app/functions/verify-razorpay-payment', {
          method: 'POST',
          body: JSON.stringify({
            ...response,
            clientData: form
          })
        });
        const vData = await vRes.json();
        if (vData.success) {
          alert("Payment Successful! Your card is now being created.");
          setView('home');
        } else {
          alert("Verification Failed: " + vData.error);
        }
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <form onSubmit={handlePay}>
      <div className="input-group">
        <label>Full Name</label>
        <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
      </div>
      <div className="input-group">
        <label>Email Address</label>
        <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      </div>
      <div className="input-group">
        <label>WhatsApp Number</label>
        <input required type="text" value={form.whatsapp} onChange={e => setForm({...form, whatsapp: e.target.value})} />
      </div>
      <div className="input-group">
        <label>Desired URL Name (Slug)</label>
        <input required type="text" placeholder="e.g. anay-jadhav" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} />
      </div>
      <button className="btn-primary" style={{width: '100%', marginTop: '20px'}}>
        Pay & Create Card
      </button>
    </form>
  )
}
