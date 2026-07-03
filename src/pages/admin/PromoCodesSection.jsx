import React, { useState, useEffect } from 'react';
import { api } from '../../data/api';
import './PromoCodesSection.css';

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
      <div className="cms-promo-form-card">
        <h3 className="cms-promo-card-title">
          Create New Promo Code
        </h3>
        <form onSubmit={handleAddCode} className="cms-promo-grid-form">
          <div className="cms-promo-form-group">
            <label>Code Name</label>
            <input
              type="text"
              placeholder="e.g. FREEHEARTS"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value.toUpperCase())}
              className="cms-promo-input-field"
            />
          </div>

          <div className="cms-promo-form-group">
            <label>Reward Type</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="cms-promo-input-field"
            >
              <option value="hearts">Extra Hearts</option>
              <option value="infinity">Infinity Hearts (Premium)</option>
            </select>
          </div>

          <div className="cms-promo-form-group">
            <label className={newType === 'hearts' ? '' : 'disabled'}>Hearts Amount</label>
            <input
              type="number"
              placeholder={newType === 'hearts' ? '100' : 'N/A'}
              value={newType === 'hearts' ? newReward : ''}
              onChange={(e) => setNewReward(e.target.value)}
              disabled={newType !== 'hearts'}
              className="cms-promo-input-field"
            />
          </div>

          <div className="cms-promo-form-group">
            <label>Code Expiry Date (Optional)</label>
            <input
              type="date"
              value={newExpiresAt}
              onChange={(e) => setNewExpiresAt(e.target.value)}
              className="cms-promo-input-field"
            />
          </div>

          <div className="cms-promo-form-group">
            <label className={newType === 'infinity' ? '' : 'disabled'}>Infinity Duration</label>
            <select
              value={newType === 'infinity' ? newInfinityDuration : 'none'}
              onChange={(e) => setNewInfinityDuration(e.target.value)}
              disabled={newType !== 'infinity'}
              className="cms-promo-input-field"
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
            <label>Max Claims Limit (Optional)</label>
            <input
              type="number"
              placeholder="e.g. 100"
              value={newMaxRedemptions}
              onChange={(e) => setNewMaxRedemptions(e.target.value)}
              className="cms-promo-input-field"
            />
          </div>

          <div className="cms-promo-form-group span-2">
            <label>Description</label>
            <input
              type="text"
              placeholder="e.g. 100 hearts reward for tutoring school"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="cms-promo-input-field"
            />
          </div>

          <div className="cms-promo-form-group">
            <button
              type="submit"
              className="btn btn-orange cms-promo-add-btn"
            >
              Add Promo Code
            </button>
          </div>
        </form>
      </div>

      {/* Promo Codes Table */}
      <div className="cms-promo-table-card">
        <div className="cms-promo-table-wrapper scrollbar">
          <table className="cms-promo-table text-left">
            <thead>
              <tr className="header-row">
                <th>CODE</th>
                <th>TYPE</th>
                <th>REWARD</th>
                <th>CODE EXPIRES</th>
                <th>INF DURATION</th>
                <th>USAGE LIMIT</th>
                <th>DESCRIPTION</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="cms-promo-loading-cell">
                    <div className="cms-loading-spinner cms-promo-loading-spinner"></div>
                    <p className="cms-promo-loading-text">Loading Promo Codes...</p>
                  </td>
                </tr>
              ) : (
                promoCodes.map((c) => {
                  const isEditing = editingCode === c.code;
                  const redemptionsCount = c.usedByCount || 0;
                  
                  if (isEditing) {
                    return (
                      <tr key={c.code} className="editing-row">
                        <td className="code-cell">{c.code}</td>
                        <td>
                          <select
                            value={editType}
                            onChange={(e) => setEditType(e.target.value)}
                            className="cms-promo-edit-input"
                          >
                            <option value="hearts">HEARTS</option>
                            <option value="infinity">INFINITY</option>
                          </select>
                        </td>
                        <td>
                          {editType === 'hearts' ? (
                            <input
                              type="number"
                              value={editReward}
                              onChange={(e) => setEditReward(e.target.value)}
                              className="cms-promo-edit-input width-60"
                            />
                          ) : '∞'}
                        </td>
                        <td>
                          <input
                            type="date"
                            value={editExpiresAt}
                            onChange={(e) => setEditExpiresAt(e.target.value)}
                            className="cms-promo-edit-input"
                          />
                        </td>
                        <td>
                          {editType === 'infinity' ? (
                            <select
                              value={editInfinityDuration}
                              onChange={(e) => setEditInfinityDuration(e.target.value)}
                              className="cms-promo-edit-input"
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
                        <td>
                          <input
                            type="number"
                            placeholder="No Limit"
                            value={editMaxRedemptions}
                            onChange={(e) => setEditMaxRedemptions(e.target.value)}
                            className="cms-promo-edit-input width-70"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            className="cms-promo-edit-input width-120"
                          />
                        </td>
                        <td>
                          <div className="cms-promo-action-group">
                            <button
                              onClick={() => handleSaveEdit(c.code)}
                              className="cms-promo-icon-btn cms-btn-action-green"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingCode(null)}
                              className="cms-promo-icon-btn cms-btn-action-gray"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
 
                  return (
                    <tr key={c.code}>
                      <td className="code-cell">{c.code}</td>
                      <td>
                        <span className={`cms-promo-role-badge-text role-badge-text ${c.type === 'infinity' ? 'subscribed' : 'free'}`}>
                          {c.type === 'infinity' ? 'INFINITY' : 'HEARTS'}
                        </span>
                      </td>
                      <td className={c.type === 'infinity' ? 'reward-cell-infinity' : 'reward-cell-hearts'}>
                        {c.type === 'infinity' ? '∞' : c.reward}
                      </td>
                      <td className="expiry-cell">
                        {c.expiresAt ? new Date(c.expiresAt).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }) : 'Never'}
                      </td>
                      <td className="duration-cell">
                        {c.type === 'infinity' ? (c.infinityDuration ? formatDuration(c.infinityDuration) : 'Never') : 'N/A'}
                      </td>
                      <td className="limit-cell">
                        {c.maxRedemptions ? `${redemptionsCount} / ${c.maxRedemptions}` : `${redemptionsCount} claims`}
                      </td>
                      <td className="desc-cell">{c.description}</td>
                      <td>
                        <div className="cms-promo-action-group">
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
                  <td colSpan="8" className="cms-promo-no-data">No custom promo codes found. Create one above!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
