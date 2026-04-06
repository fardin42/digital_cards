import React, { useState, useEffect } from 'react';
import { insforge } from './lib/insforge';
import { PLAN_PRICE } from './lib/constants';

// Views & Components
import Home from './views/Home';
import ThankYou from './views/ThankYou';
import CheckoutForm from './components/Checkout/CheckoutForm';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import PolicyContent from './components/Policy/PolicyContent';
import Footer from './components/Layout/Footer';

export default function App() {
  const [view, setView] = useState('home');
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [adminPass, setAdminPass] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [policyType, setPolicyType] = useState('privacy');
  const [paidSlug, setPaidSlug] = useState('');

  // Fetch clients for Admin View (Enhanced with Subscriptions)
  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await insforge.database
      .from('profiles')
      .select('id, name, whatsapp, email, created_at, cards(id, slug, status, subscriptions(last_payment_status, next_bill_date))')
      .order('created_at', { ascending: false });
    
    if (!error) setClients(data || []);
    setLoading(false);
  };

  // Fetch real monthly income from subscriptions with 'captured' status this month
  const fetchMonthlyIncome = async () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const { data, error } = await insforge.database
      .from('subscriptions')
      .select('id, last_payment_status, created_at')
      .in('last_payment_status', ['captured', 'success'])
      .gte('created_at', startOfMonth);
    if (!error && data) {
      setMonthlyIncome(data.length * (PLAN_PRICE || 99));
    }
  };

  const toggleCardStatus = async (cardId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    const { error } = await insforge.database
      .from('cards')
      .update({ status: newStatus })
      .eq('id', cardId);
    
    if (error) alert("Status Update Failed: " + error.message);
    else fetchClients();
  };

  const deleteClient = async (profileId) => {
    // Cards FK has CASCADE delete, so deleting the profile auto-deletes its cards
    const { error } = await insforge.database.from('profiles').delete().eq('id', profileId);
    if (error) alert('Delete Failed: ' + error.message);
    else fetchClients();
  };

  const updateClient = async (profileId, updates) => {
    const { error } = await insforge.database
      .from('profiles')
      .update(updates)
      .eq('id', profileId);
    if (error) alert('Update Failed: ' + error.message);
    else fetchClients();
  };

  useEffect(() => {
    // Hidden Admin Routing: Access via ?admin=auth URL parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'auth') {
      setView('admin');
      // Clear the URL parameter to keep it clean
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Success Redirect Handling: Persistence for Thank You page
    const status = params.get('status');
    const slug = params.get('slug');
    if (status === 'success' && slug) {
      setPaidSlug(slug);
      setView('thankyou');
      // Clean up the URL but keep it in history if needed, 
      // or replace it to keep the address bar clean
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (view === 'admin' && isAdminAuthenticated) { fetchClients(); fetchMonthlyIncome(); }
  }, [view, isAdminAuthenticated]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPass === 'fardin42') {
      setIsAdminAuthenticated(true);
    } else {
      alert("Invalid Password");
    }
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return <Home setView={setView} />;
      
      case 'checkout':
        return (
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
        );

      case 'thankyou':
        return <ThankYou paidSlug={paidSlug} setView={setView} />;

      case 'admin':
        return !isAdminAuthenticated ? (
          <AdminLogin 
            adminPass={adminPass} 
            setAdminPass={setAdminPass} 
            handleAdminLogin={handleAdminLogin} 
            setView={setView} 
          />
        ) : (
          <AdminDashboard 
            clients={clients} 
            toggleCardStatus={toggleCardStatus} 
            deleteClient={deleteClient}
            updateClient={updateClient}
            monthlyIncome={monthlyIncome}
            setView={setView} 
          />
        );

      case 'policy':
        return (
          <section className="container policy-container">
            <button onClick={() => setView('home')} style={{background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', marginBottom: '24px'}}>
              ← Back to Home
            </button>
            <PolicyContent type={policyType} />
          </section>
        );

      default:
        return <Home setView={setView} />;
    }
  };

  return (
    <div className="container">
      {renderView()}
      {view !== 'admin' && <Footer setView={setView} setPolicyType={setPolicyType} />}
    </div>
  );
}
