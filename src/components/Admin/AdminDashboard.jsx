import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, LayoutDashboard, CreditCard,
  Users, Bell, Settings, Download, Upload, 
  MoreHorizontal, Check, X, ArrowLeft, Trash2, Edit, Save,
  ShieldCheck, ShieldOff
} from 'lucide-react';

/* ─── Custom Confirmation Modal ─── */
function ConfirmModal({ open, title, message, onConfirm, onCancel, danger }) {
  if (!open) return null;
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-box" onClick={e => e.stopPropagation()}>
        <h3>{title || 'Confirm'}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="confirm-cancel-btn" onClick={onCancel}>Cancel</button>
          <button className={`confirm-ok-btn ${danger ? 'confirm-danger' : ''}`} onClick={onConfirm}>
            {danger ? 'Delete' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard({ clients, toggleCardStatus, deleteClient, updateClient, monthlyIncome, setView }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [menuOpenIdx, setMenuOpenIdx] = useState(null);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', whatsapp: '' });
  const menuRef = useRef(null);

  // Confirm modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState({ title: '', message: '', danger: false, action: null });

  const showConfirm = (title, message, action, danger = false) => {
    setConfirmData({ title, message, danger, action });
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (confirmData.action) confirmData.action();
    setConfirmOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenIdx(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Stats
  const totalClients = clients?.length || 0;
  const activeClients = clients?.filter(c => c.cards?.[0]?.status === 'active').length || 0;
  const suspendedClients = clients?.filter(c => c.cards?.[0]?.status === 'suspended').length || 0;
  const pendingClients = clients?.filter(c => !c.cards?.[0]?.status || c.cards?.[0]?.status === 'pending').length || 0;

  // New onboards this month
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const newOnboards = clients?.filter(c => new Date(c.created_at) >= startOfMonth).length || 0;

  const toggleSelectAll = () => {
    if (selectedIds.length === totalClients) setSelectedIds([]);
    else setSelectedIds(clients.map((_, i) => i));
  };

  const toggleSelect = (idx) => {
    setSelectedIds(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const handleDelete = (client, e) => {
    e.stopPropagation();
    setMenuOpenIdx(null);
    showConfirm(
      'Delete Client',
      `Are you sure you want to delete "${client.name}"? This will also remove their card and subscription data. This action cannot be undone.`,
      () => deleteClient(client.id),
      true
    );
  };

  const handleToggleStatus = (card, e) => {
    e.stopPropagation();
    setMenuOpenIdx(null);
    const action = card.status === 'active' ? 'Suspend' : 'Activate';
    showConfirm(
      `${action} Card`,
      `Are you sure you want to ${action.toLowerCase()} this card?`,
      () => toggleCardStatus(card.id, card.status)
    );
  };

  const handleStartEdit = (client, idx, e) => {
    e.stopPropagation();
    setMenuOpenIdx(null);
    setEditingIdx(idx);
    setEditForm({ name: client.name || '', email: client.email || '', whatsapp: client.whatsapp || '' });
  };

  const handleSaveEdit = (client) => {
    updateClient(client.id, { name: editForm.name, email: editForm.email, whatsapp: editForm.whatsapp });
    setEditingIdx(null);
  };

  return (
    <div className="admin-layout">
      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmOpen}
        title={confirmData.title}
        message={confirmData.message}
        danger={confirmData.danger}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* Left Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">💳</span> DigiCard
          </div>
          <button className="sidebar-back-btn" onClick={() => setView('home')} title="Back to site">
            <ArrowLeft size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item active"><LayoutDashboard size={18} /> Dashboard</a>
          <a href="#" className="nav-item"><Users size={18} /> Clients</a>
          <a href="#" className="nav-item"><CreditCard size={18} /> Payments</a>
          <a href="#" className="nav-item"><Settings size={18} /> Settings</a>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-stats-mini">
            <div className="mini-stat"><span>{totalClients}</span> Total</div>
            <div className="mini-stat"><span>{activeClients}</span> Active</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="main-header">
          <h1>Clients</h1>
          <div className="header-actions">
            <button className="btn-table-action"><Download size={16} /> Import</button>
            <button className="btn-table-action"><Upload size={16} /> Export</button>
          </div>
        </div>

        <div className="table-filters">
          <span className="filter-pill">All ({totalClients})</span>
          <span className="filter-pill filter-active-pill">Active ({activeClients})</span>
          <span className="filter-pill filter-suspended-pill">Suspended ({suspendedClients})</span>
          <span className="filter-pill filter-pending-pill">Pending ({pendingClients})</span>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{width: '40px'}}>
                  <input type="checkbox" onChange={toggleSelectAll} checked={totalClients > 0 && selectedIds.length === totalClients} />
                </th>
                <th>Client</th>
                <th>Card Path</th>
                <th>Status</th>
                <th>Billing</th>
                <th>Next Bill</th>
                <th style={{width: '120px'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients?.map((client, i) => {
                const card = client.cards?.[0];
                const sub = card?.subscriptions?.[0];
                const isSelected = selectedIds.includes(i);
                const status = card?.status || 'pending';
                const isEditing = editingIdx === i;
                
                return (
                  <tr key={client.id || i} className={isSelected ? 'selected-row' : ''}>
                    <td>
                      <input type="checkbox" checked={isSelected} onChange={(e) => { e.stopPropagation(); toggleSelect(i); }} />
                    </td>
                    <td>
                      {isEditing ? (
                        <div className="edit-inline-group">
                          <input className="edit-inline-input" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} placeholder="Name" />
                          <input className="edit-inline-input" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} placeholder="Email" />
                          <input className="edit-inline-input" value={editForm.whatsapp} onChange={e => setEditForm({...editForm, whatsapp: e.target.value})} placeholder="WhatsApp" />
                        </div>
                      ) : (
                        <div className="client-cell">
                          <div className="client-avatar">{client.name?.substring(0,2).toUpperCase()}</div>
                          <div className="client-info">
                            <b>{client.name}</b>
                            <span>{client.email}</span>
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      <a href={`/${card?.slug}`} target="_blank" rel="noreferrer" className="card-link">/{card?.slug}</a>
                    </td>
                    <td>
                      <div className={`status-indicator status-${status}`}>
                        {status === 'active' ? <Check size={14}/> : <X size={14}/>} {status.charAt(0).toUpperCase() + status.slice(1)}
                      </div>
                    </td>
                    <td>
                      {sub ? <b className="payment-status">{sub.last_payment_status.toUpperCase()}</b> : <span className="no-data">No Data</span>}
                    </td>
                    <td className="date-cell">
                      {sub ? new Date(sub.next_bill_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
                    </td>
                    <td className="actions-cell">
                      {isEditing ? (
                        <div className="edit-actions">
                          <button className="btn-save-edit" onClick={() => handleSaveEdit(client)} title="Save"><Save size={16} /></button>
                          <button className="btn-cancel-edit" onClick={() => setEditingIdx(null)} title="Cancel"><X size={16} /></button>
                        </div>
                      ) : (
                        <div className="row-action-group">
                          {/* Distinct Suspend / Activate button */}
                          {card && (
                            <button
                              className={`btn-status-toggle ${card.status === 'active' ? 'btn-toggle-suspend' : 'btn-toggle-activate'}`}
                              onClick={(e) => handleToggleStatus(card, e)}
                              title={card.status === 'active' ? 'Suspend' : 'Activate'}
                            >
                              {card.status === 'active' ? <ShieldOff size={15}/> : <ShieldCheck size={15}/>}
                            </button>
                          )}
                          {/* Kebab menu for edit/delete */}
                          <div className="dropdown-container" ref={menuOpenIdx === i ? menuRef : null}>
                            <button className="action-btn" onClick={(e) => { e.stopPropagation(); setMenuOpenIdx(menuOpenIdx === i ? null : i); }}>
                              <MoreHorizontal size={18} />
                            </button>
                            {menuOpenIdx === i && (
                              <div className="dropdown-menu">
                                <button onClick={(e) => handleStartEdit(client, i, e)} className="dropdown-item"><Edit size={14}/> Update Info</button>
                                <button onClick={(e) => handleDelete(client, e)} className="dropdown-item text-danger"><Trash2 size={14}/> Delete</button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      {/* Right Sidebar Stats */}
      <aside className="admin-right-sidebar">
        <div className="stat-block">
          <h3>MONTHLY INCOME</h3>
          <div className="stat-chart-container">
            <div className="chart-circle">
               <span className="chart-value">₹{monthlyIncome || 0}</span>
               <span className="chart-sub">This month</span>
            </div>
          </div>
          <div className="stat-legend">
            <div className="legend-item"><span className="dot dot-green"></span> ₹{monthlyIncome || 0} <span className="light-text">Collected</span></div>
          </div>
        </div>

        <div className="stat-block">
          <div className="stat-header">
            <h3>CLIENTS STATUS</h3>
          </div>
          <div className="progress-bar-container">
             <div className="progress-bar bar-green" style={{width: `${totalClients > 0 ? (activeClients/totalClients)*100 : 0}%`}}></div>
             <div className="progress-bar bar-red" style={{width: `${totalClients > 0 ? (suspendedClients/totalClients)*100 : 0}%`}}></div>
             <div className="progress-bar bar-grey" style={{width: `${totalClients > 0 ? (pendingClients/totalClients)*100 : 0}%`}}></div>
          </div>
          <ul className="status-list">
            <li><span className="dot dot-green"></span> Active <span className="status-value">{activeClients}</span></li>
            <li><span className="dot dot-red"></span> Suspended <span className="status-value">{suspendedClients}</span></li>
            <li><span className="dot dot-grey"></span> Pending <span className="status-value">{pendingClients}</span></li>
          </ul>
        </div>

        <div className="stat-block">
           <div className="stat-header">
            <h3>OVERVIEW</h3>
            <span className="stat-filter">This month</span>
          </div>
          <div className="overview-grid">
            <div className="overview-item">
              <span className="overview-value">{newOnboards}</span>
              <span className="overview-label">New Onboards</span>
            </div>
            <div className="overview-item">
              <span className="overview-value">₹{monthlyIncome || 0}</span>
              <span className="overview-label">Revenue</span>
            </div>
            <div className="overview-item">
              <span className="overview-value">{totalClients}</span>
              <span className="overview-label">Total Clients</span>
            </div>
            <div className="overview-item">
               <span className="overview-value">{pendingClients}</span>
               <span className="overview-label">Pending Cards</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
