import { useNavigate } from 'react-router-dom';
import DuolingoOwl from '../components/DuolingoOwl';
import { auth, googleProvider, signInWithPopup } from '../data/firebase';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Successful login triggers onAuthStateChanged in userStore context, 
      // which handles auth state updates and redirects the user automatically.
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      alert('Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <div className="landing-page" id="landing-page">
      {/* Logo */}
      <div className="landing-logo">
        <svg width="36" height="36" viewBox="0 0 200 200" fill="none">
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
        <span className="landing-logo-text">duolingo</span>
      </div>

      {/* Illustration */}
      <div className="landing-illustration">
        <DuolingoOwl size={180} />
      </div>

      {/* Tagline */}
      <h1 className="landing-tagline">
        The free, fun, and effective way to learn a language!
      </h1>

      {/* Buttons */}
      <div className="landing-buttons">
        <button
          className="btn btn-primary"
          onClick={handleGoogleLogin}
          id="btn-get-started"
        >
          GET STARTED
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleGoogleLogin}
          id="btn-login"
        >
          I ALREADY HAVE AN ACCOUNT
        </button>
      </div>
    </div>
  );
}
