import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './data/userStore';
import DesktopLayout from './components/DesktopLayout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import LearnPage from './pages/LearnPage';
import LeaderboardPage from './pages/LeaderboardPage';
import QuestsPage from './pages/QuestsPage';
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

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            {/* Full-screen pages (no sidebar) */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/quiz/:unitId/:levelId" element={<QuizPage />} />
            <Route path="/lesson-complete" element={<LessonCompletePage />} />
            <Route path="/streak" element={<StreakPage />} />

            {/* Desktop layout pages */}
            <Route path="/learn" element={<DesktopPage><DashboardPage /></DesktopPage>} />
            <Route path="/learn/:categoryId" element={<DesktopPage><LearnPage /></DesktopPage>} />
            <Route path="/practice" element={<Navigate to="/learn" replace />} />
            <Route path="/leaderboard" element={<DesktopPage showRightSidebar={false}><LeaderboardPage /></DesktopPage>} />
            <Route path="/quests" element={<DesktopPage showRightSidebar={false}><QuestsPage /></DesktopPage>} />
            <Route path="/shop" element={<DesktopPage showRightSidebar={false}><ShopPage /></DesktopPage>} />
            <Route path="/profile" element={<DesktopPage showRightSidebar={false}><ProfilePage /></DesktopPage>} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
