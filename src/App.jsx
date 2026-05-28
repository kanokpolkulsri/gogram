import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './data/userStore';
import LandingPage from './pages/LandingPage';
import LearnPage from './pages/LearnPage';
import QuizPage from './pages/QuizPage';
import LessonCompletePage from './pages/LessonCompletePage';
import StreakPage from './pages/StreakPage';
import PracticePage from './pages/PracticePage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/quiz/:unitId/:levelId" element={<QuizPage />} />
            <Route path="/lesson-complete" element={<LessonCompletePage />} />
            <Route path="/streak" element={<StreakPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
