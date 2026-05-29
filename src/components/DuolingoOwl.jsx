import { useState } from 'react';
import './DuolingoOwl.css';

export default function DuolingoOwl({ size = 120 }) {
  const [animation, setAnimation] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const handleClick = () => {
    if (isLocked) return;

    // Alternate or choose randomly between backflip and turnaround
    const moves = ['animate-backflip', 'animate-turnaround'];
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    
    setAnimation(randomMove);
    setIsLocked(true);

    const duration = randomMove === 'animate-backflip' ? 900 : 700;
    setTimeout(() => {
      setAnimation('');
      setIsLocked(false);
    }, duration);
  };

  return (
    <div 
      className={`duolingo-owl-container ${animation}`} 
      onClick={handleClick}
      title="Click me to perform a trick!"
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id="mascot-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#16A34A" />   {/* Emerald green */}
            <stop offset="50%" stopColor="#58CC02" />  {/* Duolingo light green */}
            <stop offset="100%" stopColor="#C2F125" /> {/* Glowing yellow-green */}
          </linearGradient>
          
          {/* Subtle inner eye shadow */}
          <filter id="eye-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Cute Waving Left Arm */}
        <path 
          className="mascot-left-arm"
          d="M 46 112 Q 22 114 26 96" 
          stroke="#4CAF50" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Cute Right Arm */}
        <path 
          className="mascot-right-arm"
          d="M 154 112 Q 178 124 172 136" 
          stroke="#4CAF50" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Left Leg */}
        <path 
          d="M 82 156 V 184 H 74" 
          stroke="#4CAF50" 
          strokeWidth="5.5" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Right Leg */}
        <path 
          d="M 118 156 V 184 H 126" 
          stroke="#4CAF50" 
          strokeWidth="5.5" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Left Horn */}
        <path 
          d="M 68 55 Q 52 32 52 38 Q 60 50 68 55 Z" 
          fill="#F4F4F0" 
          stroke="#4CAF50" 
          strokeWidth="1.2" 
        />

        {/* Right Horn */}
        <path 
          d="M 132 55 Q 148 32 148 38 Q 140 50 132 55 Z" 
          fill="#F4F4F0" 
          stroke="#4CAF50" 
          strokeWidth="1.2" 
        />

        {/* Round Sphere Body (like Mike Wazowski) */}
        <circle 
          className="mascot-body-circle"
          cx="100" 
          cy="105" 
          r="56" 
          fill="url(#mascot-body-grad)" 
          stroke="#4CAF50" 
          strokeWidth="1" 
        />

        {/* Big White Single Eye */}
        <circle 
          className="mascot-eye-white" 
          cx="100" 
          cy="96" 
          r="24" 
          fill="#FFFFFF" 
          filter="url(#eye-shadow)" 
        />

        {/* Glowing Cyan Blue Iris */}
        <circle 
          className="mascot-eye-iris" 
          cx="100" 
          cy="96" 
          r="12" 
          fill="#00C3FF" 
        />

        {/* Pupil (Dark rounded circle) */}
        <circle 
          className="mascot-pupil" 
          cx="100" 
          cy="96" 
          r="6" 
          fill="#1A202C" 
        />

        {/* Tiny Pupil Sparkle */}
        <circle 
          cx="102" 
          cy="94" 
          r="2.2" 
          fill="#FFFFFF" 
        />

        {/* Big Happy Smile */}
        <path 
          d="M 76 128 Q 100 148 124 128" 
          stroke="#115E59" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          fill="none" 
        />
      </svg>
    </div>
  );
}
