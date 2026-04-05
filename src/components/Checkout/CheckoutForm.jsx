import React, { useState } from 'react';
import { insforge } from '../../lib/insforge';
import { CATEGORIES } from '../../constants/categories';

export default function CheckoutForm({ setView, setPaidSlug }) {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    whatsapp: '', 
    slug: '',
    category: 'digital-marketing' 
  });

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

    try {
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
            // Persist success state in URL for refresh recovery
            const newUrl = `${window.location.pathname}?status=success&slug=${finalForm.slug}`;
            window.history.pushState({ path: newUrl }, '', newUrl);

            setPaidSlug(finalForm.slug);
            setView('thankyou');
          } else {
            alert("Verification Failed: " + vData.error);
          }
        }
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      alert("Payment Initiation Error: " + err.message);
    }
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
  );
}
