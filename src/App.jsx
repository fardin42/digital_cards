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
  const [policyType, setPolicyType] = useState('privacy');
  const [paidSlug, setPaidSlug] = useState('');

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
    // Hidden Admin Routing: Access via ?admin=auth URL parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'auth') {
      setView('admin');
      // Clear the URL parameter to keep it clean
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

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
        <section className="hero-grid">
          <div className="hero-content">
            <h1 style={{ lineHeight: '1.1' }}>Modern Digital Business Cards for Professionals</h1>
            <p style={{color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '30px'}}>
              Share your contact details instantly with a sleek, one-page digital profile. Join 100+ businesses using MyDigi Cards.
            </p>
            <ul style={{textAlign: 'left', color: 'var(--text-dim)', marginBottom: '30px', paddingLeft: '20px'}}>
              <li>✓ One-click WhatsApp & Save Contact</li>
              <li>✓ Integration with Social Media & Maps</li>
              <li>✓ Interactive Business Profiles</li>
              <li>✓ Eco-friendly & Reusable</li>
            </ul>
            <button className="btn-primary" onClick={() => setView('checkout')}>
              Create Your Card - ₹299/mo
            </button>
            {/* Admin entry point removed from UI as requested */}
          </div>
          
          <div className="hero-preview">
            <iframe 
              src="/digital-marketing/anay-jadhav/index.html" 
              title="Digital Card Preview"
            />
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
            
            <CheckoutForm setView={setView} setPaidSlug={setPaidSlug} />
          </div>
        </section>
      )}

      {view === 'thankyou' && (
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
              <div className="step-item">
                <span className="step-number">2</span>
                <span>You'll receive a WhatsApp message once it's live.</span>
              </div>
              <div className="step-item">
                <span className="step-number">3</span>
                <span>Your card will be active within 24 hours.</span>
              </div>
            </div>
            
            <button className="btn-primary" onClick={() => setView('home')} style={{marginTop: '30px', width: '100%' }}>
              Back to Website
            </button>
          </div>
        </section>
      )}

      {view === 'admin' && !isAdminAuthenticated && (
        <div className="auth-gate">
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ marginBottom: '8px' }}>Super Admin Login</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Restricted access for developers only.</p>
          </div>
          <form onSubmit={handleAdminLogin}>
            <div className="input-group">
              <label>Super Admin Password</label>
              <input 
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

      {view === 'verification' && (
        <section className="container">
          <button onClick={() => setView('home')} style={{background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', margin: '20px 0'}}>
            ← Back to Home
          </button>
          <VerificationForm setView={setView} />
        </section>
      )}

      {view === 'policy' && (
        <section className="container policy-container">
          <button onClick={() => setView('home')} style={{background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', marginBottom: '24px'}}>
            ← Back to Home
          </button>
          <PolicyContent type={policyType} />
        </section>
      )}

      {view !== 'admin' && (
        <footer className="footer">
          <div className="footer-links">
            <span className="footer-link" onClick={() => { setView('policy'); setPolicyType('about'); }}>About Us</span>
            <span className="footer-link" onClick={() => { setView('policy'); setPolicyType('privacy'); }}>Privacy Policy</span>
            <span className="footer-link" onClick={() => { setView('policy'); setPolicyType('terms'); }}>Terms & Conditions</span>
            <span className="footer-link" onClick={() => { setView('policy'); setPolicyType('refund'); }}>Refund & Cancellation</span>
            <span className="footer-link" onClick={() => { setView('policy'); setPolicyType('contact'); }}>Contact Us</span>
          </div>
          <p style={{ marginTop: '10px', fontSize: '0.8rem', opacity: 0.6 }}>
            © 2025 MyDigi Cards. Powered by <a href="https://pgrowmedia.com" target="_blank" style={{ color: 'inherit', textDecoration: 'underline', fontWeight: 'bold' }}>Pgrow media</a>
          </p>
        </footer>
      )}
    </div>
  );
}

function PolicyContent({ type }) {
  const policies = {
    privacy: (
      <div className="policy-content">
        <h1>Privacy Policy</h1>
        <p>Your privacy is important to us. This Privacy Policy explains how MyDigi Cards collects, uses, and protects your information.</p>
        
        <h2>Information We Collect</h2>
        <ul>
          <li><b>Personal Details:</b> Name, email address, and WhatsApp number.</li>
          <li><b>Business Details:</b> Business name, category, and any social links you provide for your card.</li>
          <li><b>Payment Info:</b> We do not store credit card details; all payments are processed securely by Razorpay.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use your information to create your digital business card, manage your subscription, and contact you for support or important updates.</p>

        <h2>Security</h2>
        <p>We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your details.</p>
      </div>
    ),
    terms: (
      <div className="policy-content">
        <h1>Terms & Conditions</h1>
        <p>By using MyDigi Cards, you agree to comply with and be bound by the following terms and conditions of use.</p>

        <h2>Use of Service</h2>
        <p>MyDigi Cards provides digital business card solutions. You are responsible for ensuring the accuracy of the information provided on your card.</p>

        <h2>Subscription & Billing</h2>
        <p>Our service is based on a recurring subscription model. By subscribing, you authorize us to charge the applicable fees to your chosen payment method.</p>

        <h2>Account Termination</h2>
        <p>We reserve the right to suspend or terminate accounts that violate our terms or engage in fraudulent activities.</p>
      </div>
    ),
    refund: (
      <div className="policy-content">
        <h1>Refund & Cancellation Policy</h1>
        <p>At MyDigi Cards, we strive for customer satisfaction.</p>

        <h2>Cancellation</h2>
        <p>You can cancel your subscription at any time through your dashboard or by contacting support. Once cancelled, your card will remain active until the end of the current billing cycle.</p>

        <h2>Refunds</h2>
        <p>Refunds are processed under the following conditions:</p>
        <ul>
          <li>If there is a technical failure that prevents your card from being activated.</li>
          <li>If you request a refund within 24 hours of your first payment and have not yet shared your card more than 5 times.</li>
        </ul>
        <p>Refunds typically take 5-7 business days to reflect in your original payment method.</p>
      </div>
    ),
    contact: (
      <div className="policy-content">
        <h1>Contact Us</h1>
        <p>If you have any questions about these policies or our service, please contact us:</p>
        
        <div style={{ marginTop: '20px' }}>
          <p><b>Business Name:</b> MyDigi Cards</p>
          <p><b>Email:</b> contact@pgrowmedia.com</p>
          <p><b>Address:</b> FL NO B 1302 SHREEJI, EXCELENCIA SERENE MEADOW, SAWARKAR NAGAR GANGAPUR ROAD, Nashik, MH, 422013</p>
          <p><b>Support Hours:</b> Mon-Sat, 10 AM - 6 PM IST</p>
        </div>
      </div>
    ),
    about: (
      <div className="policy-content">
        <h1>About Us</h1>
        <p>Welcome to MyDigi Cards, your partner in modern networking.</p>
        <p>We provide professionals and businesses with sleek, interactive, and environmentally friendly digital business cards. Our mission is to help you make a lasting impression in a digital-first world.</p>
        <h2>Why Choose Us?</h2>
        <ul>
          <li><b>Instant Sharing:</b> Share via QR, WhatsApp, or Link.</li>
          <li><b>Dynamic Updates:</b> Update your details anytime without reprinted.</li>
          <li><b>Eco-Friendly:</b> Save paper and go digital.</li>
        </ul>
      </div>
    )
  };

  return policies[type] || policies.privacy;
}

function CheckoutForm({ setView, setPaidSlug }) {
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
    'real-estate', 'retail', 'travel-tourism', 'others'
  ];

  const [customCategory, setCustomCategory] = useState('');

  const handlePay = async (e) => {
    e.preventDefault();
    
    // Construct the final category-based slug
    const catFinal = form.category === 'others' 
      ? customCategory.toLowerCase().replace(/ /g, '-') 
      : form.category;

    const finalForm = {
      ...form,
      category: catFinal,
      slug: `${catFinal}/${form.slug}`
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
          setPaidSlug(finalForm.slug);
          setView('thankyou');
        } else {
          alert("Verification Failed: " + vData.error);
        }
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <form onSubmit={handlePay} className="premium-form">
      <div className="form-grid">
        <div className="input-group">
          <label>Full Name</label>
          <input required type="text" placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        </div>
        <div className="input-group">
          <label>WhatsApp Number</label>
          <input required type="text" placeholder="919876543210" value={form.whatsapp} onChange={e => setForm({...form, whatsapp: e.target.value})} />
        </div>
      </div>

      <div className="input-group">
        <label>Email Address</label>
        <input required type="email" placeholder="john@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      </div>

      <div className="input-group">
        <label>Card Templates / Category</label>
        <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="category-select">
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat.replace('-', ' ').toUpperCase()}</option>
          ))}
        </select>
      </div>

      {form.category === 'others' && (
        <div className="input-group">
          <label>Specify Your Industry</label>
          <input 
            required 
            type="text" 
            placeholder="e.g. Architecture, Bakery..." 
            value={customCategory} 
            onChange={e => setCustomCategory(e.target.value)} 
          />
        </div>
      )}

      <div className="input-group">
        <label>Your Custom URL Link</label>
        <div className="url-input-container">
          <span className="url-prefix">mydigi.cards/{form.category === 'others' ? (customCategory.toLowerCase().replace(/ /g, '-') || 'category') : form.category}/</span>
          <input 
            required 
            type="text" 
            placeholder="businessname" 
            value={form.slug} 
            onChange={e => setForm({...form, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} 
          />
        </div>
        <p style={{ fontSize: '0.8rem', color: '#718096', marginTop: '8px' }}>
           Example: mydigi.cards/{form.category === 'others' ? (customCategory.toLowerCase().replace(/ /g, '-') || 'category') : form.category}/{form.slug || 'businessname'}
        </p>
      </div>

      <button className="btn-primary" style={{width: '100%', marginTop: '10px', height: '56px', fontSize: '1.2rem'}}>
        Create My Card Now
      </button>
      
      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem', color: '#718096' }}>
        Safe & Secure Payment via Razorpay
      </p>
    </form>
  )
}
