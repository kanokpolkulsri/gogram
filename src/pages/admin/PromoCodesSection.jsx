import React, { useState, useEffect } from 'react';
import { api } from '../../data/api';

function formatDuration(minutes) {
  if (!minutes) return 'Never';
  if (minutes === 0.5) return '30 seconds';
  if (minutes === 1) return '1 minute';
  if (minutes === 5) return '5 minutes';
  if (minutes === 30 * 24 * 60) return '1 month';
  if (minutes === 90 * 24 * 60) return '3 months';
  if (minutes === 180 * 24 * 60) return '6 months';
  if (minutes === 365 * 24 * 60) return '1 year';
  
  if (minutes >= 24 * 60) {
    return `${Math.round(minutes / (24 * 60))} days`;
  }
  return `${minutes} minutes`;
}

export default function PromoCodesSection({
  triggerConfirm,
  showToast,
  promoCodes,
  setPromoCodes,
  isLoading,
  setIsLoading,
  fetchPromoCodes
}) {
  // Form State for Adding Promo Code
  const [newCode, setNewCode] = useState('');
  const [newType, setNewType] = useState('hearts');
  const [newReward, setNewReward] = useState('100');
  const [newDesc, setNewDesc] = useState('');
  const [newExpiresAt, setNewExpiresAt] = useState('');
  const [newInfinityDuration, setNewInfinityDuration] = useState('3mo');
  const [newMaxRedemptions, setNewMaxRedemptions] = useState('');

  // Inline Edit State
  const [editingCode, setEditingCode] = useState(null);
  const [editType, setEditType] = useState('hearts');
  const [editReward, setEditReward] = useState('100');
  const [editDesc, setEditDesc] = useState('');
  const [editExpiresAt, setEditExpiresAt] = useState('');
  const [editInfinityDuration, setEditInfinityDuration] = useState('3mo');
  const [editMaxRedemptions, setEditMaxRedemptions] = useState('');

  useEffect(() => {
    fetchPromoCodes();
  }, [fetchPromoCodes]);

  const handleAddCode = async (e) => {
    e.preventDefault();
    if (!newCode.trim()) {
      alert('Please enter a code name.');
      return;
    }

    const codeUpper = newCode.trim().toUpperCase();

    // Check if code already exists
    if (promoCodes.some(c => c.code.toUpperCase() === codeUpper)) {
      alert('This code already exists.');
      return;
    }

    let infinityDurationMinutes = null;
    if (newType === 'infinity') {
      if (newInfinityDuration === '30s') infinityDurationMinutes = 0.5;
      else if (newInfinityDuration === '1m') infinityDurationMinutes = 1;
      else if (newInfinityDuration === '5m') infinityDurationMinutes = 5;
      else if (newInfinityDuration === '1mo') infinityDurationMinutes = 30 * 24 * 60;
      else if (newInfinityDuration === '3mo') infinityDurationMinutes = 90 * 24 * 60;
      else if (newInfinityDuration === '6mo') infinityDurationMinutes = 180 * 24 * 60;
      else if (newInfinityDuration === '1y') infinityDurationMinutes = 365 * 24 * 60;
    }

    try {
      await api.post('/admin/promo-codes', {
        code: codeUpper,
        type: newType,
        reward: newType === 'infinity' ? 'infinity' : parseInt(newReward) || 10,
        description: newDesc.trim() || `${newType === 'infinity' ? 'Infinite hearts' : `${newReward} hearts`} promo code`,
        expiresAt: newExpiresAt || null,
        infinityDuration: infinityDurationMinutes,
        maxRedemptions: newMaxRedemptions ? parseInt(newMaxRedemptions) || null : null
      });
      showToast(`Promo code ${codeUpper} created successfully!`);
      
      // Clear form
      setNewCode('');
      setNewDesc('');
      setNewExpiresAt('');
      setNewInfinityDuration('3mo');
      setNewMaxRedemptions('');

      fetchPromoCodes(true);
    } catch (err) {
      showToast(`Failed to create promo code: ${err.message}`);
    }
  };

  const startEditing = (c) => {
    setEditingCode(c.code);
    setEditType(c.type);
    setEditReward(c.type === 'infinity' ? '' : String(c.reward || '100'));
    setEditDesc(c.description || '');
    setEditExpiresAt(c.expiresAt || '');
    
    let durVal = 'none';
    if (c.infinityDuration) {
      if (c.infinityDuration === 0.5) durVal = '30s';
      else if (c.infinityDuration === 1) durVal = '1m';
      else if (c.infinityDuration === 5) durVal = '5m';
      else if (c.infinityDuration === 30 * 24 * 60) durVal = '1mo';
      else if (c.infinityDuration === 90 * 24 * 60) durVal = '3mo';
      else if (c.infinityDuration === 180 * 24 * 60) durVal = '6mo';
      else if (c.infinityDuration === 365 * 24 * 60) durVal = '1y';
    }
    setEditInfinityDuration(durVal);
    setEditMaxRedemptions(c.maxRedemptions ? String(c.maxRedemptions) : '');
  };

  const handleSaveEdit = async (originalCode) => {
    let infinityDurationMinutes = null;
    if (editType === 'infinity') {
      if (editInfinityDuration === '30s') infinityDurationMinutes = 0.5;
      else if (editInfinityDuration === '1m') infinityDurationMinutes = 1;
      else if (editInfinityDuration === '5m') infinityDurationMinutes = 5;
      else if (editInfinityDuration === '1mo') infinityDurationMinutes = 30 * 24 * 60;
      else if (editInfinityDuration === '3mo') infinityDurationMinutes = 90 * 24 * 60;
      else if (editInfinityDuration === '6mo') infinityDurationMinutes = 180 * 24 * 60;
      else if (editInfinityDuration === '1y') infinityDurationMinutes = 365 * 24 * 60;
    }

    try {
      await api.put(`/admin/promo-codes/${originalCode}`, {
        type: editType,
        reward: editType === 'infinity' ? 'infinity' : parseInt(editReward) || 10,
        description: editDesc.trim(),
        expiresAt: editExpiresAt || null,
        infinityDuration: infinityDurationMinutes,
        maxRedemptions: editMaxRedemptions ? parseInt(editMaxRedemptions) || null : null
      });
      setEditingCode(null);
      showToast(`Promo code ${originalCode} updated successfully.`);
      fetchPromoCodes(true);
    } catch (err) {
      showToast(`Error updating promo code: ${err.message}`);
    }
  };

  const handleDeleteCode = async (code) => {
    try {
      await api.delete(`/admin/promo-codes/${code}`);
      showToast(`Promo code ${code} has been deleted.`);
      fetchPromoCodes(true);
    } catch (err) {
      showToast(`Error deleting promo code: ${err.message}`);
    }
  };

  return (
    <div className="cms-promo-page-content animate-fade-in cms-promo-codes-page">
      <h2 className="cms-promo-section-title">Promo & Referral Codes</h2>
      <p className="cms-promo-section-subtitle">Manage promotional rewards and special subscription activation keys.</p>

      {/* Add Code Form */}
      <div className="cms-promo-form-card" style={{ marginBottom: '28px' }}>
        <h3 className="cms-promo-card-title" style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '800' }}>
          Create New Promo Code
        </h3>
        <form onSubmit={handleAddCode} className="cms-promo-grid-form" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', alignItems: 'end' }}>
          <div className="cms-promo-form-group">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-light)', marginBottom: '6px' }}>Code Name</label>
            <input
              type="text"
              placeholder="e.g. FREEHEARTS"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value.toUpperCase())}
              style={{ width: '100%', padding: '10px 14px', border: '2px solid var(--color-gray)', borderRadius: '12px', fontSize: '14px', fontWeight: '700' }}
            />
          </div>

          <div className="cms-promo-form-group">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-light)', marginBottom: '6px' }}>Reward Type</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', border: '2px solid var(--color-gray)', borderRadius: '12px', fontSize: '14px', fontWeight: '700', backgroundColor: 'white' }}
            >
              <option value="hearts">Extra Hearts</option>
              <option value="infinity">Infinity Hearts (Premium)</option>
            </select>
          </div>

          <div className="cms-promo-form-group">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: newType === 'hearts' ? 'var(--color-text-light)' : '#ccc', marginBottom: '6px' }}>Hearts Amount</label>
            <input
              type="number"
              placeholder={newType === 'hearts' ? '100' : 'N/A'}
              value={newType === 'hearts' ? newReward : ''}
              onChange={(e) => setNewReward(e.target.value)}
              disabled={newType !== 'hearts'}
              style={{ width: '100%', padding: '10px 14px', border: '2px solid var(--color-gray)', borderRadius: '12px', fontSize: '14px', fontWeight: '700', backgroundColor: newType === 'hearts' ? 'white' : '#f5f5f5', color: newType === 'hearts' ? 'inherit' : '#aaa', cursor: newType === 'hearts' ? 'text' : 'not-allowed' }}
            />
          </div>

          <div className="cms-promo-form-group">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-light)', marginBottom: '6px' }}>Code Expiry Date (Optional)</label>
            <input
              type="date"
              value={newExpiresAt}
              onChange={(e) => setNewExpiresAt(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', border: '2px solid var(--color-gray)', borderRadius: '12px', fontSize: '14px', fontWeight: '700', backgroundColor: 'white' }}
            />
          </div>

          <div className="cms-promo-form-group">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: newType === 'infinity' ? 'var(--color-text-light)' : '#ccc', marginBottom: '6px' }}>Infinity Duration</label>
            <select
              value={newType === 'infinity' ? newInfinityDuration : 'none'}
              onChange={(e) => setNewInfinityDuration(e.target.value)}
              disabled={newType !== 'infinity'}
              style={{ width: '100%', padding: '10px 14px', border: '2px solid var(--color-gray)', borderRadius: '12px', fontSize: '14px', fontWeight: '700', backgroundColor: newType === 'infinity' ? 'white' : '#f5f5f5', color: newType === 'infinity' ? 'inherit' : '#aaa', cursor: newType === 'infinity' ? 'pointer' : 'not-allowed' }}
            >
              {newType === 'infinity' ? (
                <>
                  <option value="3mo">3 Months (Default)</option>
                  <option value="1mo">1 Month</option>
                  <option value="6mo">6 Months</option>
                  <option value="1y">1 Year</option>
                  <option value="5m">5 Minutes (Testing)</option>
                  <option value="30s">30 Seconds (Testing)</option>
                  <option value="none">Never Expires</option>
                </>
              ) : (
                <option value="none">N/A (Hearts Reward)</option>
              )}
            </select>
          </div>

          <div className="cms-promo-form-group">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-light)', marginBottom: '6px' }}>Max Claims Limit (Optional)</label>
            <input
              type="number"
              placeholder="e.g. 100"
              value={newMaxRedemptions}
              onChange={(e) => setNewMaxRedemptions(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', border: '2px solid var(--color-gray)', borderRadius: '12px', fontSize: '14px', fontWeight: '700' }}
            />
          </div>

          <div className="cms-promo-form-group" style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-light)', marginBottom: '6px' }}>Description</label>
            <input
              type="text"
              placeholder="e.g. 100 hearts reward for tutoring school"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', border: '2px solid var(--color-gray)', borderRadius: '12px', fontSize: '14px', fontWeight: '700' }}
            />
          </div>

          <div className="cms-promo-form-group">
            <button
              type="submit"
              className="btn btn-orange cms-promo-add-btn"
              style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: '800', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Add Promo Code
            </button>
          </div>
        </form>
      </div>

      {/* Promo Codes Table */}
      <div className="cms-promo-table-card">
        <div className="cms-promo-table-wrapper scrollbar">
          <table className="cms-promo-table text-left" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-gray)' }}>
                <th style={{ padding: '12px 8px' }}>CODE</th>
                <th style={{ padding: '12px 8px' }}>TYPE</th>
                <th style={{ padding: '12px 8px' }}>REWARD</th>
                <th style={{ padding: '12px 8px' }}>CODE EXPIRES</th>
                <th style={{ padding: '12px 8px' }}>INF DURATION</th>
                <th style={{ padding: '12px 8px' }}>USAGE LIMIT</th>
                <th style={{ padding: '12px 8px' }}>DESCRIPTION</th>
                <th style={{ padding: '12px 8px' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>
                    <div className="cms-loading-spinner" style={{ display: 'inline-block', width: '24px', height: '24px', border: '3px solid var(--color-gray)', borderTopColor: 'var(--color-blue-dark)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <p style={{ marginTop: '8px', fontSize: '13px', fontWeight: 'bold', color: 'var(--color-text-light)' }}>Loading Promo Codes...</p>
                  </td>
                </tr>
              ) : (
                promoCodes.map((c) => {
                  const isEditing = editingCode === c.code;
                  const redemptionsCount = c.usedByCount || 0;
                  
                  if (isEditing) {
                    return (
                      <tr key={c.code} style={{ borderBottom: '1px solid var(--color-gray-light)', backgroundColor: '#F9FAFB' }}>
                        <td style={{ padding: '12px 8px', fontWeight: '800' }}>{c.code}</td>
                        <td style={{ padding: '12px 8px' }}>
                          <select
                            value={editType}
                            onChange={(e) => setEditType(e.target.value)}
                            style={{ padding: '6px 8px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '13px', fontWeight: '700' }}
                          >
                            <option value="hearts">HEARTS</option>
                            <option value="infinity">INFINITY</option>
                          </select>
                        </td>
                        <td style={{ padding: '12px 8px' }}>
                          {editType === 'hearts' ? (
                            <input
                              type="number"
                              value={editReward}
                              onChange={(e) => setEditReward(e.target.value)}
                              style={{ width: '60px', padding: '6px 8px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '13px', fontWeight: '700' }}
                            />
                          ) : '∞'}
                        </td>
                        <td style={{ padding: '12px 8px' }}>
                          <input
                            type="date"
                            value={editExpiresAt}
                            onChange={(e) => setEditExpiresAt(e.target.value)}
                            style={{ padding: '6px 8px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '13px', fontWeight: '700' }}
                          />
                        </td>
                        <td style={{ padding: '12px 8px' }}>
                          {editType === 'infinity' ? (
                            <select
                              value={editInfinityDuration}
                              onChange={(e) => setEditInfinityDuration(e.target.value)}
                              style={{ padding: '6px 8px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '13px', fontWeight: '700' }}
                            >
                              <option value="3mo">3 Months</option>
                              <option value="1mo">1 Month</option>
                              <option value="6mo">6 Months</option>
                              <option value="1y">1 Year</option>
                              <option value="5m">5 Minutes</option>
                              <option value="30s">30 Seconds</option>
                              <option value="none">Never Expires</option>
                            </select>
                          ) : 'N/A'}
                        </td>
                        <td style={{ padding: '12px 8px' }}>
                          <input
                            type="number"
                            placeholder="No Limit"
                            value={editMaxRedemptions}
                            onChange={(e) => setEditMaxRedemptions(e.target.value)}
                            style={{ width: '70px', padding: '6px 8px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '13px', fontWeight: '700' }}
                          />
                        </td>
                        <td style={{ padding: '12px 8px' }}>
                          <input
                            type="text"
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            style={{ width: '120px', padding: '6px 8px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '13px', fontWeight: '700' }}
                          />
                        </td>
                        <td style={{ padding: '12px 8px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => handleSaveEdit(c.code)}
                              className="cms-promo-icon-btn"
                              style={{ padding: '4px 8px', backgroundColor: 'var(--color-green)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingCode(null)}
                              className="cms-promo-icon-btn"
                              style={{ padding: '4px 8px', backgroundColor: 'var(--color-gray-dark)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={c.code} style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '800' }}>{c.code}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <span className={`cms-promo-role-badge-text role-badge-text ${c.type === 'infinity' ? 'subscribed' : 'free'}`}>
                          {c.type === 'infinity' ? 'INFINITY' : 'HEARTS'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px', fontWeight: '800', color: c.type === 'infinity' ? 'var(--color-orange-dark)' : 'var(--color-text)' }}>
                        {c.type === 'infinity' ? '∞' : c.reward}
                      </td>
                      <td style={{ padding: '12px 8px', fontWeight: '800', color: 'var(--color-text-light)', fontSize: '13px' }}>
                        {c.expiresAt ? new Date(c.expiresAt).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }) : 'Never'}
                      </td>
                      <td style={{ padding: '12px 8px', fontWeight: '800', color: 'var(--color-text-light)', fontSize: '13px' }}>
                        {c.type === 'infinity' ? (c.infinityDuration ? formatDuration(c.infinityDuration) : 'Never') : 'N/A'}
                      </td>
                      <td style={{ padding: '12px 8px', fontWeight: '800', color: 'var(--color-text-light)', fontSize: '13px' }}>
                        {c.maxRedemptions ? `${redemptionsCount} / ${c.maxRedemptions}` : `${redemptionsCount} claims`}
                      </td>
                      <td style={{ padding: '12px 8px', color: 'var(--color-text-light)', fontSize: '13px' }}>{c.description}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="cms-promo-icon-btn cms-promo-edit-btn icon-action-btn"
                            onClick={() => startEditing(c)}
                            title="Edit Promo Code"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil">
                              <path d="M12 20h9"/>
                              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                            </svg>
                          </button>
                          <button
                            className="cms-promo-icon-btn cms-promo-delete-btn icon-action-btn delete"
                            onClick={() => {
                              triggerConfirm({
                                title: 'Delete Promo Code',
                                message: `Are you sure you want to delete promo code "${c.code}"? Users will no longer be able to claim it.`,
                                confirmText: 'Delete Code',
                                isDanger: true,
                                onConfirm: () => handleDeleteCode(c.code)
                              });
                            }}
                            title="Delete Promo Code"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                              <path d="M3 6h18"/>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                              <line x1="10" x2="10" y1="11" y2="17"/>
                              <line x1="14" x2="14" y1="11" y2="17"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
              {!isLoading && promoCodes.length === 0 && (
                <tr>
                  <td colSpan="8" className="cms-promo-no-data" style={{ padding: '20px 8px', color: 'var(--color-text-light)', fontStyle: 'italic', textAlign: 'center' }}>No custom promo codes found. Create one above!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
