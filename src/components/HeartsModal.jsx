import React, { useState, useEffect } from 'react';
import { useUser, useUserDispatch } from '../data/userStore';
import './HeartsModal.css';

export default function HeartsModal({ isOpen, onClose }) {
  const user = useUser();
  const dispatch = useUserDispatch();
  const [code, setCode] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'

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
              fill={isInfinity ? 'url(#modal-gold-grad)' : 'var(--color-red)'}
            />
            <defs>
              <linearGradient id="modal-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE082" />
                <stop offset="50%" stopColor="#FFB300" />
                <stop offset="100%" stopColor="#FFA000" />
              </linearGradient>
            </defs>
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
            <p className="hearts-modal-desc premium-active-desc" style={{ marginBottom: '8px' }}>
              You are in Premium Mode. You can make unlimited mistakes during exercises!
            </p>
            {user.promoExpiresAt && (
              <p className="hearts-modal-expiry-desc" style={{ fontSize: '13px', fontWeight: 'bold', color: '#B57A00', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <span>⏳ Expires on:</span>
                <span>
                  {new Date(user.promoExpiresAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </p>
            )}
          </div>
        )}

        {/* Promo code form */}
        <div className="hearts-modal-promo-box">
          <h3>Apply Promo or Referral Code</h3>
          <p className="promo-box-sub">Enter a valid promo code or a friend's referral code to refill hearts or activate Premium.</p>
          
          <form onSubmit={handleApply} className="hearts-modal-form">
            <input
              type="text"
              placeholder="e.g. PREMIUM2026"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setStatusMsg('');
              }}
              className="hearts-modal-input"
            />
            <button type="submit" className="btn btn-orange hearts-modal-btn">
              Apply Code
            </button>
          </form>

          {statusMsg && (
            <div className={`hearts-modal-status ${statusType}`}>
              {statusType === 'success' ? '✔' : '✖'} {statusMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
