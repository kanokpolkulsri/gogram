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
