import { useState, useEffect } from 'react';
import { shopItems } from '../../data/mockData';
import { useUser, useUserDispatch } from '../../data/userStore';
import { api } from '../../data/api';
import './ShopPage.css';

export default function ShopPage() {
  const user = useUser();
  const dispatch = useUserDispatch();
  const [boughtItems, setBoughtItems] = useState([]);
  const [showToast, setShowToast] = useState(null);
  const [isUpgrading, setIsUpgrading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setTimeout(() => {
        setShowToast({ type: 'success', message: 'Payment successful! You now have Infinite Hearts!' });
      }, 0);
      window.history.replaceState({}, document.title, window.location.pathname);
      dispatch({ type: 'CHECK_HEARTS_REFILL' });
      setTimeout(() => setShowToast(null), 3000);
    } else if (params.get('canceled') === 'true') {
      setTimeout(() => {
        setShowToast({ type: 'error', message: 'Payment was canceled.' });
      }, 0);
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => setShowToast(null), 2000);
    }
  }, [dispatch]);

  const handleBuy = (item) => {
    if ((user.gems || 0) < item.cost) {
      setShowToast({ type: 'error', message: 'Not enough gems!' });
      setTimeout(() => setShowToast(null), 2000);
      return;
    }
    dispatch({ type: 'SPEND_GEMS', amount: item.cost });
    setBoughtItems((prev) => [...prev, item.id]);
    setShowToast({ type: 'success', message: `${item.name} purchased!` });
    setTimeout(() => setShowToast(null), 2000);
  };

  const handleUpgradePremium = async () => {
    try {
      setIsUpgrading(true);
      const res = await api.post('/payments/create-checkout-session');
      if (res.url) {
        window.location.href = res.url;
      } else {
        throw new Error('Failed to retrieve checkout URL.');
      }
    } catch (err) {
      setShowToast({ type: 'error', message: err.message || 'Upgrade session failed.' });
      setTimeout(() => setShowToast(null), 2000);
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div className="shop-page" id="shop-page">
      <div className="shop-header">
        <h1 className="shop-title">Shop</h1>
        <div className="shop-balance">
          <span className="shop-balance-gem">💎</span>
          <span className="shop-balance-amount">{user.gems || 0}</span>
          <span className="shop-balance-label">Gems</span>
        </div>
      </div>

      {/* Premium Upgrade section */}
      {user.hearts !== 'infinity' && (
        <div className="shop-section shop-premium-banner-section" id="shop-premium-section">
          <div className="shop-premium-banner">
            <div className="shop-premium-banner-content">
              <span className="premium-badge">PREMIUM</span>
              <h2 className="shop-premium-title">Upgrade to Infinite Hearts</h2>
              <p className="shop-premium-desc">
                Get 1 year of Infinite Hearts! Learn grammar and vocabulary without limits. Never wait for hearts to refill.
              </p>
              <button 
                className="shop-premium-upgrade-btn"
                onClick={handleUpgradePremium}
                disabled={isUpgrading}
                id="btn-stripe-promptpay-upgrade"
              >
                {isUpgrading ? 'Redirecting to Stripe...' : 'Upgrade Now — 29 THB'}
              </button>
            </div>
            <div className="shop-premium-banner-visual">
              <span className="premium-icon">⚡</span>
            </div>
          </div>
        </div>
      )}

      {/* Power-ups */}
      <div className="shop-section">
        <h2 className="shop-section-title">Power-Ups</h2>
        <div className="shop-grid">
          {shopItems.powerUps.map((item, index) => {
            const bought = boughtItems.includes(item.id);
            return (
              <div
                key={item.id}
                className={`shop-card ${bought ? 'bought' : ''}`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="shop-card-icon">{item.icon}</div>
                <div className="shop-card-info">
                  <h3 className="shop-card-name">{item.name}</h3>
                  <p className="shop-card-desc">{item.description}</p>
                </div>
                <button
                  className={`shop-card-btn ${bought ? 'bought' : ''}`}
                  onClick={() => !bought && handleBuy(item)}
                  disabled={bought}
                >
                  {bought ? (
                    <span>OWNED</span>
                  ) : (
                    <>
                      <span className="shop-card-btn-gem">💎</span>
                      <span>{item.cost}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Outfits */}
      <div className="shop-section">
        <h2 className="shop-section-title">Outfits for Gogram Owl</h2>
        <div className="shop-grid shop-grid-outfits">
          {shopItems.outfits.map((item, index) => {
            const bought = boughtItems.includes(item.id);
            return (
              <div
                key={item.id}
                className={`shop-outfit-card ${bought ? 'bought' : ''}`}
                style={{ animationDelay: `${(shopItems.powerUps.length + index) * 0.08}s` }}
              >
                <div className="shop-outfit-icon">{item.icon}</div>
                <h3 className="shop-outfit-name">{item.name}</h3>
                <p className="shop-outfit-desc">{item.description}</p>
                <button
                  className={`shop-outfit-btn ${bought ? 'bought' : ''}`}
                  onClick={() => !bought && handleBuy(item)}
                  disabled={bought}
                >
                  {bought ? (
                    'EQUIPPED'
                  ) : (
                    <>
                      <span className="shop-card-btn-gem">💎</span>
                      {item.cost}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className={`shop-toast ${showToast.type}`} id="shop-notification-toast">
          {showToast.type === 'success' ? '✅' : '❌'} {showToast.message}
        </div>
      )}
    </div>
  );
}
