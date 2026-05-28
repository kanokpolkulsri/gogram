export default function DuolingoOwl({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="100" cy="120" rx="60" ry="65" fill="#58CC02" />
      
      {/* Belly */}
      <ellipse cx="100" cy="135" rx="40" ry="45" fill="#89E219" />
      
      {/* Head */}
      <circle cx="100" cy="75" r="45" fill="#58CC02" />
      
      {/* Left ear tuft */}
      <ellipse cx="72" cy="38" rx="8" ry="14" fill="#58CC02" transform="rotate(-15, 72, 38)" />
      
      {/* Right ear tuft */}
      <ellipse cx="128" cy="38" rx="8" ry="14" fill="#58CC02" transform="rotate(15, 128, 38)" />
      
      {/* Face area (white) */}
      <ellipse cx="100" cy="82" rx="35" ry="30" fill="white" />
      
      {/* Left eye white */}
      <circle cx="85" cy="75" r="16" fill="white" stroke="#58CC02" strokeWidth="2" />
      
      {/* Right eye white */}
      <circle cx="115" cy="75" r="16" fill="white" stroke="#58CC02" strokeWidth="2" />
      
      {/* Left pupil */}
      <circle cx="88" cy="75" r="8" fill="#333" />
      <circle cx="90" cy="73" r="3" fill="white" />
      
      {/* Right pupil */}
      <circle cx="118" cy="75" r="8" fill="#333" />
      <circle cx="120" cy="73" r="3" fill="white" />
      
      {/* Beak */}
      <ellipse cx="100" cy="95" rx="8" ry="5" fill="#FFC800" />
      <ellipse cx="100" cy="93" rx="7" ry="3" fill="#FFD43B" />
      
      {/* Left wing */}
      <ellipse cx="48" cy="120" rx="15" ry="30" fill="#4CAF00" transform="rotate(10, 48, 120)" />
      
      {/* Right wing */}
      <ellipse cx="152" cy="120" rx="15" ry="30" fill="#4CAF00" transform="rotate(-10, 152, 120)" />
      
      {/* Left foot */}
      <ellipse cx="82" cy="185" rx="14" ry="6" fill="#FFC800" />
      
      {/* Right foot */}
      <ellipse cx="118" cy="185" rx="14" ry="6" fill="#FFC800" />
      
      {/* Belly line */}
      <path d="M75 130 Q100 160 125 130" stroke="#78D600" strokeWidth="2" fill="none" />
    </svg>
  );
}
