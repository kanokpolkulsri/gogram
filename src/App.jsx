import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UserProvider, useUser } from './data/userStore';
import DesktopLayout from './components/DesktopLayout';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';
import LearnPage from './pages/LearnPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ShopPage from './pages/ShopPage';
import ProfilePage from './pages/ProfilePage';
import QuizPage from './pages/QuizPage';
import LessonCompletePage from './pages/LessonCompletePage';
import StreakPage from './pages/StreakPage';

function DesktopPage({ children, showRightSidebar = true }) {
  return (
    <DesktopLayout showRightSidebar={showRightSidebar}>
      {children}
    </DesktopLayout>
  );
}

function AppContent() {
  const user = useUser();
  const location = useLocation();
  const navigate = useNavigate();

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
        <div className="auth-loading-card">
          <svg className="auth-loading-owl" width="80" height="80" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="90" fill="#58CC02" />
            <ellipse cx="100" cy="110" rx="50" ry="55" fill="#89E219" />
            <circle cx="82" cy="85" r="14" fill="white" />
            <circle cx="118" cy="85" r="14" fill="white" />
            <circle cx="86" cy="85" r="7" fill="#333" />
            <circle cx="122" cy="85" r="7" fill="#333" />
            <circle cx="88" cy="83" r="2.5" fill="white" />
            <circle cx="124" cy="83" r="2.5" fill="white" />
            <ellipse cx="100" cy="102" rx="7" ry="4" fill="#FFC800" />
          </svg>
          <div className="auth-loading-spinner"></div>
          <span className="auth-loading-text">Loading Gogram...</span>
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
            <Route path="/streak" element={<StreakPage />} />
            <Route path="/leaderboard" element={<DesktopPage><LeaderboardPage /></DesktopPage>} />
            <Route path="/shop" element={<DesktopPage showRightSidebar={false}><ShopPage /></DesktopPage>} />
            <Route path="/profile" element={<DesktopPage><ProfilePage /></DesktopPage>} />
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
