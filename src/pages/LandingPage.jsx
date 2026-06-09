import { useState, useEffect, useRef } from 'react';
import { auth, googleProvider, signInWithPopup } from '../data/firebase';
import './LandingPage.css';

const MESSAGES = [
  "Hey, what's good?!",
  "What's up?!",
  "Howdy!",
  "Greetings Earthlings!",
];
const CHAR_DELAY = 60;
const ERASE_DELAY = 35;
const PAUSE_BETWEEN = 5000;

export default function LandingPage() {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const msgIndex = useRef(0);

  useEffect(() => {
    let timeout;
    let cancelled = false;

    const typeMessage = (text, onDone) => {
      let i = 0;
      setIsTyping(true);
      const next = () => {
        if (cancelled) return;
        if (i <= text.length) {
          setDisplayedText(text.slice(0, i));
          i++;
          timeout = setTimeout(next, CHAR_DELAY);
        } else {
          setIsTyping(false);
          onDone();
        }
      };
      next();
    };

    const eraseMessage = (text, onDone) => {
      let i = text.length;
      setIsTyping(true);
      const next = () => {
        if (cancelled) return;
        if (i >= 0) {
          setDisplayedText(text.slice(0, i));
          i--;
          timeout = setTimeout(next, ERASE_DELAY);
        } else {
          onDone();
        }
      };
      next();
    };

    const cycle = () => {
      if (cancelled) return;
      const text = MESSAGES[msgIndex.current];
      typeMessage(text, () => {
        if (cancelled) return;
        timeout = setTimeout(() => {
          if (cancelled) return;
          eraseMessage(text, () => {
            if (cancelled) return;
            msgIndex.current = (msgIndex.current + 1) % MESSAGES.length;
            timeout = setTimeout(cycle, 300);
          });
        }, PAUSE_BETWEEN);
      });
    };

    timeout = setTimeout(cycle, 400);
    return () => { cancelled = true; clearTimeout(timeout); };
  }, []);

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
      {/* Top Header Logo */}
      <div className="landing-logo">
        <span className="landing-logo-text">GoGram</span>
      </div>

      {/* Hero Section with Speech Bubble */}
      <div className="landing-hero">
        <div className="speech-bubble">
          <span className="speech-typed">{displayedText}</span>
          {isTyping && <span className="speech-cursor" />}
        </div>

        {/* Circle containing the animated sky banner */}
        <div className="banner-circle">
          <svg viewBox="0 0 200 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
            <defs>
              <linearGradient id="circleSkyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#75D2FF" />
                <stop offset="100%" stopColor="#BBE7FF" />
              </linearGradient>
            </defs>

            {/* Sky Background */}
            <rect width="200" height="200" fill="url(#circleSkyGradient)" />

            {/* Cloud 1 (Back Layer, Y=30) */}
            <g className="banner-cloud cloud-back-y30">
              <rect width="60" height="18" rx="9" fill="white" />
              <circle cx="20" cy="0" r="14" fill="white" />
              <circle cx="38" cy="-2" r="12" fill="white" />
            </g>


            {/* Cloud 3 (Front Layer, Y=140) */}
            <g className="banner-cloud cloud-front-y140">
              <rect width="50" height="16" rx="8" fill="white" />
              <circle cx="18" cy="-2" r="12" fill="white" />
              <circle cx="32" cy="-4" r="10" fill="white" />
            </g>

            {/* Bird 1 (Right to Left, Y=45) */}
            <g className="bird-container bird-fly-r2l-y45">
              <path className="bird-wing-up" d="M 0,6 Q 4,-2 8,4 Q 12,-2 16,6 Q 10,3 8,5 Q 6,3 0,6 Z" fill="#5B8FB9" />
              <path className="bird-wing-down" d="M 0,2 Q 4,10 8,4 Q 12,10 16,2 Q 10,3 8,5 Q 6,3 0,2 Z" fill="#5B8FB9" />
            </g>

            {/* Bird 2 (Left to Right, Y=125) */}
            <g className="bird-container bird-fly-l2r-y125">
              <path className="bird-wing-up" d="M 0,6 Q 4,-2 8,4 Q 12,-2 16,6 Q 10,3 8,5 Q 6,3 0,6 Z" fill="#5B8FB9" opacity="0.8" />
              <path className="bird-wing-down" d="M 0,2 Q 4,10 8,4 Q 12,10 16,2 Q 10,3 8,5 Q 6,3 0,2 Z" fill="#5B8FB9" opacity="0.8" />
            </g>

            {/* Mascot Face Overlay */}
            <g className="mascot-face-overlay" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
              {/* Left & Right Eye Whites (Static) */}
              <circle cx="68" cy="80" r="19" fill="white" />
              <circle cx="132" cy="80" r="19" fill="white" />

              {/* Grouped Eyeballs (Animated together) */}
              <g className="mascot-eyeballs">
                {/* Left Eyeball */}
                <circle cx="68" cy="80" r="9.5" fill="#333" />
                <circle cx="70" cy="78" r="3.2" fill="white" />

                {/* Right Eyeball */}
                <circle cx="132" cy="80" r="9.5" fill="#333" />
                <circle cx="134" cy="78" r="3.2" fill="white" />
              </g>

              {/* Beak */}
              <ellipse cx="100" cy="112" rx="9" ry="5" fill="#FFC800" />
            </g>
          </svg>
        </div>
      </div>


      {/* Buttons */}
      <div className="landing-buttons">
        <button
          className="btn btn-primary"
          onClick={handleGoogleLogin}
          id="btn-get-started"
        >
          I'M READY
        </button>
      </div>
    </div>
  );
}
