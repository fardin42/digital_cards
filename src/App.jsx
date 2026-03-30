import React, { useState, useEffect } from 'react';
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://qysyznj5.ap-southeast.insforge.app',
  anonKey: 'ik_523cc4ab5658929fc603ab21f7442d9a' 
});

export default function App() {
  const [view, setView] = useState('home');
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [adminPass, setAdminPass] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Fetch clients for Admin View (Enhanced with Subscriptions)
  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await insforge.database
      .from('profiles')
      .select('name, whatsapp, email, created_at, cards(id, slug, status, subscriptions(last_payment_status, next_bill_date))')
      .order('created_at', { ascending: false });
    
    if (!error) setClients(data || []);
    setLoading(false);
  };

  const toggleCardStatus = async (cardId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    const { error } = await insforge.database
      .from('cards')
      .update({ status: newStatus })
      .eq('id', cardId);
    
    if (error) alert("Status Update Failed: " + error.message);
    else fetchClients(); // Refresh list
  };

  useEffect(() => {
    if (view === 'admin' && isAdminAuthenticated) fetchClients();
  }, [view, isAdminAuthenticated]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPass === 'fardin42') {
      setIsAdminAuthenticated(true);
    } else {
      alert("Invalid Password");
    }
  };

  return (
    <div className="container">
      {view === 'home' && (
        <section className="hero">
          <h1>Modern Digital Business Cards for Professionals</h1>
          <p style={{color: '#a0aec0', fontSize: '1.2rem', marginBottom: '30px'}}>
            Join 100+ businesses using MyDigi Cards to share contact details instantly.
          </p>
          <button className="btn-primary" onClick={() => setView('checkout')}>
            Get Your Digital Card - ₹299/mo
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

      {view === 'admin' && !isAdminAuthenticated && (
        <div className="auth-gate">
          <h2>Admin Access</h2>
          <form onSubmit={handleAdminLogin}>
            <div className="input-group">
              <label>Enter Super Admin Password</label>
              <input 
                type="password" 
                value={adminPass} 
                onChange={(e) => setAdminPass(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <button className="btn-primary" style={{width: '100%'}}>Enter Dashboard</button>
            <button 
              type="button"
              onClick={() => setView('home')} 
              style={{marginTop: '20px', background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer'}}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {view === 'admin' && isAdminAuthenticated && (
        <section className="dashboard">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
            <div>
              <h1>Super Admin</h1>
              <p style={{color: '#a0aec0'}}>Managing all {clients.length} digital cards</p>
            </div>
            <button className="btn-primary" onClick={() => setView('home')}>← View Site</button>
          </div>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Client / Profile</th>
                  <th>WhatsApp</th>
                  <th>Card Path (Slug)</th>
                  <th>Billing</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, i) => {
                  const card = client.cards?.[0];
                  const sub = card?.subscriptions?.[0];
                  return (
                    <tr key={i}>
                      <td>
                        <b>{client.name}</b><br/>
                        <span style={{fontSize: '0.8rem', color: '#a0aec0'}}>{client.email}</span>
                      </td>
                      <td>{client.whatsapp}</td>
                      <td>
                        <a href={`/${card?.slug}`} target="_blank" style={{color: 'var(--primary)', textDecoration: 'none'}}>
                          /{card?.slug}
                        </a>
                      </td>
                      <td>
                        {sub ? (
                          <>
                            <span style={{color: sub.last_payment_status === 'captured' ? '#48bb78' : '#ed8936'}}>
                              {sub.last_payment_status.toUpperCase()}
                            </span>
                            <br/>
                            <span style={{fontSize: '0.8rem', opacity: 0.6}}>Next: {new Date(sub.next_bill_date).toLocaleDateString()}</span>
                          </>
                        ) : 'No Data'}
                      </td>
                      <td>
                        <span className={`badge badge-${card?.status || 'pending'}`}>
                          {(card?.status || 'pending').toUpperCase()}
                        </span>
                      </td>
                      <td>
                        {card && (
                          <button 
                            className={`btn-action ${card.status === 'active' ? 'btn-suspend' : 'btn-activate'}`}
                            onClick={() => toggleCardStatus(card.id, card.status)}
                          >
                            {card.status === 'active' ? 'Suspend' : 'Activate'}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

function CheckoutForm({ setView }) {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    whatsapp: '', 
    slug: '',
    category: 'digital-marketing' 
  });

  const CATEGORIES = [
    'agriculture', 'automotive', 'beauty-salon', 'construction', 
    'digital-marketing', 'education', 'event-management', 'finance', 
    'fitness-gym', 'food-beverage', 'healthcare', 'interior-design', 
    'it-services', 'jewellery', 'legal', 'photography', 
    'real-estate', 'retail', 'travel-tourism', 'miscellaneous'
  ];

  const handlePay = async (e) => {
    e.preventDefault();
    
    // Construct the final category-based slug
    const finalForm = {
      ...form,
      slug: `${form.category}/${form.slug}`
    };

    // 1. Create Order
    const res = await fetch('https://qysyznj5.ap-southeast.insforge.app/functions/create-razorpay-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalForm)
    });
    const { subscriptionId, keyId, error } = await res.json();
    
    if (error) return alert(error);

    // 2. Open Razorpay (using the combined slug in the handler)
    const options = {
      key: keyId,
      subscription_id: subscriptionId,
      name: "MyDigi Cards",
      description: "One-time Setup + Monthly Subscription",
      handler: async function (response) {
        // 3. Verify Payment
        const vRes = await fetch('https://qysyznj5.ap-southeast.insforge.app/functions/verify-razorpay-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_subscription_id: response.razorpay_subscription_id,
            razorpay_signature: response.razorpay_signature,
            clientData: finalForm
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
        <label>Business Category</label>
        <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="category-select">
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat.replace('-', ' ').toUpperCase()}</option>
          ))}
        </select>
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
        <label>URL Address (Final Link)</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f9f9f9', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <span style={{ opacity: 0.6, fontSize: '0.85em', whiteSpace: 'nowrap' }}>mydigi.cards/{form.category}/</span>
          <input required type="text" placeholder="your-name" value={form.slug} onChange={e => setForm({...form, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none' }} />
        </div>
      </div>
      <button className="btn-primary" style={{width: '100%', marginTop: '20px'}}>
        Pay & Create Card
      </button>
    </form>
  )
}
