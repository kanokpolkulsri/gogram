import React, { useState, useEffect } from 'react';
import { useUser, useUserDispatch } from '../data/userStore';
import { api } from '../data/api';
import './HeartsModal.css';

export default function HeartsModal({ isOpen, onClose }) {
  const user = useUser();
  const dispatch = useUserDispatch();
  const [code, setCode] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleUpgradePremium = async () => {
    try {
      setIsUpgrading(true);
      setStatusMsg('');
      const res = await api.post('/payments/create-checkout-session', {
        referrer: window.location.pathname
      });
      if (res.url) {
        window.location.href = res.url;
      } else {
        throw new Error('Failed to retrieve checkout URL.');
      }
    } catch (err) {
      setStatusType('error');
      setStatusMsg(err.message || 'Upgrade session failed.');
    } finally {
      setIsUpgrading(false);
    }
  };

  const ONE_HOUR_MS = 3600000;
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    if (user.hearts === 'infinity' || user.hearts >= 10) {
      setTimeLeft(0);
      return;
    }

    const updateTimer = () => {
      const elapsed = Date.now() - (user.lastHeartRefillTime || Date.now());
      const remaining = Math.max(0, ONE_HOUR_MS - elapsed);
      setTimeLeft(remaining);
      if (remaining <= 0) {
        dispatch({ type: 'CHECK_HEARTS_REFILL' });
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [isOpen, user.hearts, user.lastHeartRefillTime, dispatch]);

  if (!isOpen) return null;

  const isInfinity = user.hearts === 'infinity';
  const formatTime = (ms) => {
    if (ms <= 0) return '00:00';
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleApply = (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    dispatch({
      type: 'APPLY_PROMO_CODE',
      code: code,
      onSuccess: (res) => {
        setStatusMsg(res.message);
        setStatusType('success');
        setCode('');
      },
      onError: (err) => {
        setStatusMsg(err);
        setStatusType('error');
      }
    });
  };

  return (
    <div className="hearts-modal-overlay animate-fade-in" onClick={onClose}>
      <div className="hearts-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="hearts-modal-close-btn" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        {/* Header Icon */}
        <div className="hearts-modal-header-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="var(--color-red)"
            />
          </svg>
        </div>

        {/* Current status */}
        <h2 className="hearts-modal-title" style={{ marginBottom: '16px' }}>
          {isInfinity ? 'Infinite Hearts Active' : `You have ${user.hearts} Hearts`}
        </h2>

        {!isInfinity && (
          <div className="hearts-modal-refill-info" style={{ marginBottom: '24px' }}>
            {user.hearts < 10 ? (
              <>
                <p className="hearts-modal-desc" style={{ margin: '0 0 4px 0' }}>
                  Refilling 1 heart in <span className="countdown-timer">{formatTime(timeLeft)}</span>
                </p>
                <p className="hearts-modal-subdesc" style={{ margin: 0 }}>Free users can have a maximum of 10 hearts.</p>
              </>
            ) : (
              <p className="hearts-modal-desc" style={{ margin: 0 }}>Your hearts are fully charged! (Max: 10)</p>
            )}
          </div>
        )}

        {/* Gogram Premium Card Section matching Profile Page */}
        <div className="profile-settings-card" id="profile-premium-card" style={{ width: '100%', borderTop: '2px solid var(--color-gray)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="profile-settings-title" style={{ width: '100%', textAlign: 'left', margin: 0, fontSize: '18px', fontWeight: '800', color: 'var(--color-text)' }}>Gogram Premium</h3>
          <div className="profile-settings-list" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {isInfinity ? (
              <div className="profile-settings-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
                <div className="profile-settings-item-info" style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                  <span className="profile-settings-item-label" style={{ color: 'var(--color-green-dark)', fontWeight: 'bold', fontSize: '15px' }}>Active Subscription</span>
                  <span className="profile-settings-item-desc" style={{ fontSize: '12px', color: 'var(--color-text-light)', lineHeight: '1.4' }}>You have unlocked Infinite Hearts! Learn without limits.</span>
                </div>
                {user.subscriptionExpiresAt && (
                  <div className="profile-premium-active-until" style={{ padding: '12px', background: '#FFFDF0', borderRadius: '12px', border: '1px solid #FFEBAD', fontSize: '14px', color: '#B57A00', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <span>Active until:</span>
                    <span>
                      {new Date(user.subscriptionExpiresAt).getFullYear() >= 2090 
                        ? 'Forever / Perpetual' 
                        : new Date(user.subscriptionExpiresAt).toLocaleDateString('en-GB', {
                            timeZone: 'Asia/Bangkok',
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="profile-settings-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
                  <div className="profile-settings-item-info" style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <span className="profile-settings-item-label" style={{ fontSize: '15px', fontWeight: '800', color: 'var(--color-text)' }}>Get Infinite Hearts</span>
                    <span className="profile-settings-item-desc" style={{ fontSize: '12px', color: 'var(--color-text-light)', lineHeight: '1.4' }}>Get 1 month of Infinite Hearts. Never wait for refills!</span>
                  </div>
                  <button
                    onClick={handleUpgradePremium}
                    disabled={isUpgrading}
                    className="profile-settings-btn btn-orange"
                    id="hearts-modal-upgrade-premium-btn"
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      borderRadius: '12px', 
                      fontWeight: '800', 
                      background: 'linear-gradient(135deg, #FF9900 0%, #FF5E00 100%)',
                      color: 'var(--color-white)',
                      border: 'none',
                      boxShadow: '0 3px 0 #CC4B00',
                      cursor: 'pointer'
                    }}
                  >
                    {isUpgrading ? 'Redirecting to Stripe...' : 'Upgrade Now — 99 THB'}
                  </button>
                </div>

                <div className="profile-settings-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
                  <div className="profile-settings-item-info" style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <span className="profile-settings-item-label" style={{ fontSize: '15px', fontWeight: '800', color: 'var(--color-text)' }}>Apply a Code</span>
                    <span className="profile-settings-item-desc" style={{ fontSize: '12px', color: 'var(--color-text-light)', lineHeight: '1.4' }}>Enter a promo code or friend's referral code.</span>
                  </div>
                  
                  <form onSubmit={handleApply} className="profile-promo-input-group" style={{ display: 'flex', gap: '12px', width: '100%' }}>
                    <input
                      type="text"
                      id="hearts-modal-promo-code-input"
                      placeholder="e.g. WELCOME100"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                        setStatusMsg('');
                      }}
                      className="profile-promo-input"
                      style={{
                        flex: 1,
                        padding: '10px 16px',
                        fontSize: '15px',
                        fontWeight: '700',
                        border: '2px solid var(--color-gray)',
                        borderRadius: '12px',
                        backgroundColor: 'var(--color-gray-light)',
                        outline: 'none'
                      }}
                    />
                    <button 
                      type="submit"
                      className="profile-settings-btn btn-primary" 
                      id="hearts-modal-apply-promo-btn"
                      style={{ 
                        padding: '10px 20px', 
                        borderRadius: '12px', 
                        height: '44px',
                        background: 'var(--color-orange)',
                        borderColor: 'var(--color-orange)',
                        color: 'var(--color-white)',
                        boxShadow: '0 4px 0 var(--color-orange-dark)',
                        cursor: 'pointer',
                        fontWeight: '800'
                      }}
                    >
                      APPLY
                    </button>
                  </form>

                  {statusMsg && (
                    <p className={`profile-promo-message ${statusType}`} style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      textAlign: 'left',
                      marginTop: '4px',
                      backgroundColor: statusType === 'success' ? 'var(--color-green-bg)' : 'var(--color-red-bg)',
                      color: statusType === 'success' ? 'var(--color-green-darker)' : 'var(--color-red-dark)',
                      border: statusType === 'success' ? '1px solid var(--color-green-dark)' : '1px solid var(--color-red)'
                    }}>
                      {statusMsg}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
