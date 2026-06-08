import { useNavigate } from 'react-router-dom';
import GogramOwl from '../components/GogramOwl';
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
      {/* Sky Background */}
      <div className="landing-sky-bg">
        <svg viewBox="0 0 800 800" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="landingSkyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#75D2FF" />
              <stop offset="100%" stopColor="#BBE7FF" />
            </linearGradient>
          </defs>

          {/* Sky background rect */}
          <rect width="800" height="800" fill="url(#landingSkyGradient)" />

          {/* Cloud 1 (Back Layer) */}
          <g className="banner-cloud cloud-back-1">
            <rect x="0" y="0" width="100" height="30" rx="15" fill="white" />
            <circle cx="35" cy="0" r="22" fill="white" />
            <circle cx="65" cy="-2" r="20" fill="white" />
          </g>

          {/* Cloud 2 (Back Layer) */}
          <g className="banner-cloud cloud-back-2">
            <rect x="0" y="0" width="80" height="24" rx="12" fill="white" />
            <circle cx="28" cy="0" r="18" fill="white" />
            <circle cx="52" cy="-2" r="15" fill="white" />
          </g>

          {/* Cloud 3 (Mid Layer) */}
          <g className="banner-cloud cloud-mid-1">
            <rect x="0" y="0" width="70" height="22" rx="11" fill="white" />
            <circle cx="25" cy="0" r="16" fill="white" />
            <circle cx="45" cy="-2" r="14" fill="white" />
          </g>

          {/* Cloud 4 (Mid Layer) */}
          <g className="banner-cloud cloud-mid-2">
            <rect x="0" y="0" width="60" height="18" rx="9" fill="white" />
            <circle cx="20" cy="-1" r="13" fill="white" />
            <circle cx="38" cy="-2" r="11" fill="white" />
          </g>

          {/* Bird 1 (Right to Left) */}
          <g className="bird-container bird-fly-slow">
            <path className="bird-wing-up" d="M 0,6 Q 4,-2 8,4 Q 12,-2 16,6 Q 10,3 8,5 Q 6,3 0,6 Z" fill="#5B8FB9" />
            <path className="bird-wing-down" d="M 0,2 Q 4,10 8,4 Q 12,10 16,2 Q 10,3 8,5 Q 6,3 0,2 Z" fill="#5B8FB9" />
          </g>

          {/* Bird 2 (Left to Right, flipped) */}
          <g className="bird-container bird-fly-normal">
            <path className="bird-wing-up" d="M 0,6 Q 4,-2 8,4 Q 12,-2 16,6 Q 10,3 8,5 Q 6,3 0,6 Z" fill="#5B8FB9" opacity="0.8" />
            <path className="bird-wing-down" d="M 0,2 Q 4,10 8,4 Q 12,10 16,2 Q 10,3 8,5 Q 6,3 0,2 Z" fill="#5B8FB9" opacity="0.8" />
          </g>

          {/* Bird 3 (Right to Left) */}
          <g className="bird-container bird-fly-fast">
            <path className="bird-wing-up" d="M 0,6 Q 4,-2 8,4 Q 12,-2 16,6 Q 10,3 8,5 Q 6,3 0,6 Z" fill="#5B8FB9" opacity="0.9" />
            <path className="bird-wing-down" d="M 0,2 Q 4,10 8,4 Q 12,10 16,2 Q 10,3 8,5 Q 6,3 0,2 Z" fill="#5B8FB9" opacity="0.9" />
          </g>

          {/* Cloud 5 (Front Layer) */}
          <g className="banner-cloud cloud-front-1">
            <rect x="0" y="0" width="50" height="16" rx="8" fill="white" />
            <circle cx="18" cy="-2" r="12" fill="white" />
            <circle cx="32" cy="-4" r="10" fill="white" />
          </g>
        </svg>
      </div>

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
        <span className="landing-logo-text">gogram</span>
      </div>

      {/* Illustration */}
      <div className="landing-illustration">
        <GogramOwl size={180} />
      </div>

      {/* Tagline */}
      <h1 className="landing-tagline">
        The free, fun, and effective way to learn English!
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
