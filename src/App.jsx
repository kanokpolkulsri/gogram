import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UserProvider, useUser, useUserDispatch } from './data/userStore';
import './App.css';
import DesktopLayout from './components/DesktopLayout';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/user/CategoryPage';
import LearnPage from './pages/user/LearnPage';
import LeaderboardPage from './pages/user/LeaderboardPage';
import ProfilePage from './pages/user/ProfilePage';
import QuizPage from './pages/user/QuizPage';
import LessonCompletePage from './pages/user/LessonCompletePage';
import AdminPage from './pages/admin/AdminPage';

function DesktopPage({ children, showRightSidebar = true }) {
  return (
    <DesktopLayout showRightSidebar={showRightSidebar}>
      {children}
    </DesktopLayout>
  );
}
function AppContent() {
  const user = useUser();
  const dispatch = useUserDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Scroll to top on page change or when authentication loading finishes (except for learn pages)
  useEffect(() => {
    if (!user.isAuthLoading && !location.pathname.startsWith('/learn')) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, user.isAuthLoading]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('success') === 'true') {
      setToast({ message: 'Payment successful! You now have Infinite Hearts!', type: 'success' });
      const sessionId = params.get('session_id');
      navigate(location.pathname, { replace: true });
      dispatch({ type: 'CHECK_HEARTS_REFILL', sessionId });
    } else if (params.get('canceled') === 'true') {
      setToast({ message: 'Payment was canceled.', type: 'canceled' });
      navigate(location.pathname, { replace: true });
    }
  }, [location, dispatch, navigate]);

  useEffect(() => {
    if (user.promoExpiredMessage) {
      setToast({ message: user.promoExpiredMessage, type: 'info' });
      dispatch({ type: 'CLEAR_PROMO_EXPIRED_MESSAGE' });
    }
  }, [user.promoExpiredMessage, dispatch]);

  useEffect(() => {
    if (user.isAuthenticated && !location.pathname.startsWith('/admin')) {
      dispatch({ type: 'ENSURE_LEARN_DATA' });
    }
  }, [user.isAuthenticated, location.pathname, dispatch]);

  useEffect(() => {
    if (user.isAuthLoading) return;

    const isPublicRoute = location.pathname === '/welcome';

    if (!user.isAuthenticated) {
      if (!isPublicRoute) {
        navigate('/welcome', { replace: true });
      }
    } else {
      if (isPublicRoute || location.pathname === '/') {
        if (user.lastCategoryId) {
          navigate('/learn', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      }
    }
  }, [user.isAuthenticated, user.isAuthLoading, user.lastCategoryId, location.pathname, navigate]);

  if (user.isAuthLoading) {
    return (
      <div className="auth-loading-screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '16px' }}>
        <div className="cms-loading-spinner" style={{ width: '40px', height: '40px', border: '4px solid var(--color-gray)', borderTopColor: 'var(--color-blue-dark)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ fontWeight: '700', color: 'var(--color-text-light)' }}>Loading GramGo...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Routes>
        {/* Welcome page for logged-out users */}
        <Route path="/welcome" element={<LandingPage />} />

        {/* Protected routes, only accessible when authenticated */}
        {user.isAuthenticated && (
          <>
            <Route path="/learn" element={<DesktopPage><LearnPage /></DesktopPage>} />
            <Route path="/learn/:categoryId" element={<DesktopPage><LearnPage /></DesktopPage>} />
            <Route path="/dashboard" element={<DesktopPage><CategoryPage /></DesktopPage>} />
            <Route path="/practice" element={<Navigate to="/learn" replace />} />
            <Route path="/quiz/:unitId/:levelId" element={<QuizPage />} />
            <Route path="/lesson-complete" element={<LessonCompletePage />} />
            <Route path="/leaderboard" element={<DesktopPage><LeaderboardPage /></DesktopPage>} />
            <Route path="/profile" element={<DesktopPage><ProfilePage /></DesktopPage>} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/:section" element={<AdminPage />} />
          </>
        )}

        {/* Fallback route */}
        <Route
          path="*"
          element={<Navigate to={user.isAuthenticated ? "/learn" : "/welcome"} replace />}
        />
      </Routes>

      {toast && (
        <div className={`global-toast-container toast-${toast.type}`}>
          {toast.type === 'success' ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
