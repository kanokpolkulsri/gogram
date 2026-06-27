import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UserProvider, useUser, useUserDispatch } from './data/userStore';
import DesktopLayout from './components/DesktopLayout';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/user/CategoryPage';
import LearnPage from './pages/user/LearnPage';
import LeaderboardPage from './pages/user/LeaderboardPage';
import ShopPage from './pages/user/ShopPage';
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

  useEffect(() => {
    if (user.promoExpiredMessage) {
      alert(user.promoExpiredMessage);
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
      <div className="auth-loading-screen">
        <div className="auth-loading-text-only">
          loading
        </div>
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
            <Route path="/shop" element={<DesktopPage showRightSidebar={false}><ShopPage /></DesktopPage>} />
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
