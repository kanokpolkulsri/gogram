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
      const res = await api.post('/payments/create-checkout-session');
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
        <h2 className="hearts-modal-title">
          {isInfinity ? 'Infinite Hearts Active' : `You have ${user.hearts} Hearts`}
        </h2>

        {!isInfinity && (
          <div className="hearts-modal-refill-info">
            {user.hearts < 10 ? (
              <>
                <p className="hearts-modal-desc">
                  Refilling 1 heart in <span className="countdown-timer">{formatTime(timeLeft)}</span>
                </p>
                <p className="hearts-modal-subdesc">Free users can have a maximum of 10 hearts.</p>
              </>
            ) : (
              <p className="hearts-modal-desc">Your hearts are fully charged! (Max: 10)</p>
            )}
          </div>
        )}

        {isInfinity && (
          <div className="hearts-modal-refill-info">
            <p className="hearts-modal-desc premium-active-desc" style={{ marginBottom: '12px', color: 'var(--color-text)' }}>
              You are in Premium Mode. You can make unlimited mistakes during exercises!
            </p>
            {user.subscriptionExpiresAt && (new Date(user.subscriptionExpiresAt).getFullYear() < 2090) && (
              <div className="hearts-modal-expiry-desc" style={{ padding: '12px', background: '#FFFDF0', borderRadius: '12px', border: '1px solid #FFEBAD', fontSize: '14px', color: '#B57A00', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', margin: '0 auto', maxWidth: '280px' }}>
                <span>Expires on:</span>
                <span>
                  {new Date(user.subscriptionExpiresAt).toLocaleDateString('en-GB', {
                    timeZone: 'Asia/Bangkok',
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Promo code form */}
        {!isInfinity && (
          <div className="hearts-modal-promo-box">
            <h3>Apply Promo or Referral Code</h3>
            <p className="promo-box-sub">Enter a valid promo code or a friend's referral code to refill hearts.</p>
            
            <form onSubmit={handleApply} className="hearts-modal-form">
              <input
                type="text"
                placeholder="e.g. WELCOME100"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setStatusMsg('');
                }}
                className="hearts-modal-input"
              />
              <button 
                type="submit" 
                className="btn btn-orange hearts-modal-btn" 
              >
                Apply Code
              </button>
            </form>

            {statusMsg && (
              <div className={`hearts-modal-status ${statusType}`}>
                {statusType === 'success' ? '✔' : '✖'} {statusMsg}
              </div>
            )}
          </div>
        )}

        {/* Go Premium CTA */}
        {user.hearts !== 'infinity' && (
          <div className="hearts-modal-promo-box hearts-modal-upgrade-cta" style={{ borderTop: '1px solid var(--color-gray)', paddingTop: '16px', marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '800' }}>⚡ Go Premium</h3>
            <p className="promo-box-sub" style={{ marginBottom: '12px', textAlign: 'center' }}>
              Upgrade to Premium for 99 THB to get 1 month of Infinite Hearts!
            </p>
            <button
              className="btn btn-orange hearts-modal-upgrade-btn"
              onClick={handleUpgradePremium}
              disabled={isUpgrading}
              style={{ width: '100%', maxWidth: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isUpgrading ? 'Redirecting to Stripe...' : 'Upgrade Now — 99 THB'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
