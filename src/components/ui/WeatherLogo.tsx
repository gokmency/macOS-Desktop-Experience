import React from 'react';

const WeatherLogo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background gradient */}
      <rect width="100" height="100" rx="20" fill="url(#paint0_linear_1_2)"/>
      
      {/* Mountains */}
      <path d="M20 80L35 50L50 60L65 40L80 70L100 50V100H20V80Z" fill="#4A5568" opacity="0.8"/>
      <path d="M0 85L15 55L30 65L45 45L60 75L75 55L100 65V100H0V85Z" fill="#2D3748" opacity="0.9"/>
      
      {/* Snow caps */}
      <path d="M35 50L40 45L45 50L40 55Z" fill="white" opacity="0.9"/>
      <path d="M65 40L70 35L75 40L70 45Z" fill="white" opacity="0.9"/>
      
      {/* Lake reflection */}
      <ellipse cx="50" cy="85" rx="40" ry="8" fill="#3182CE" opacity="0.6"/>
      
      {/* Sun */}
      <circle cx="75" cy="25" r="12" fill="#FFD700"/>
      <circle cx="75" cy="25" r="8" fill="#FFA500" opacity="0.8"/>
      
      {/* Clouds */}
      <ellipse cx="30" cy="30" rx="15" ry="8" fill="white" opacity="0.9"/>
      <ellipse cx="40" cy="30" rx="12" ry="6" fill="white" opacity="0.8"/>
      <ellipse cx="25" cy="35" rx="10" ry="5" fill="white" opacity="0.7"/>
      
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="paint0_linear_1_2" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#87CEEB"/>
          <stop offset="0.5" stopColor="#4682B4"/>
          <stop offset="1" stopColor="#2E8B57"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

// SVG string olarak export et
export const WeatherLogoSVG = `data:image/svg+xml;base64,${btoa(`
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="20" fill="url(#paint0_linear_1_2)"/>
  <path d="M20 80L35 50L50 60L65 40L80 70L100 50V100H20V80Z" fill="#4A5568" opacity="0.8"/>
  <path d="M0 85L15 55L30 65L45 45L60 75L75 55L100 65V100H0V85Z" fill="#2D3748" opacity="0.9"/>
  <path d="M35 50L40 45L45 50L40 55Z" fill="white" opacity="0.9"/>
  <path d="M65 40L70 35L75 40L70 45Z" fill="white" opacity="0.9"/>
  <ellipse cx="50" cy="85" rx="40" ry="8" fill="#3182CE" opacity="0.6"/>
  <circle cx="75" cy="25" r="12" fill="#FFD700"/>
  <circle cx="75" cy="25" r="8" fill="#FFA500" opacity="0.8"/>
  <ellipse cx="30" cy="30" rx="15" ry="8" fill="white" opacity="0.9"/>
  <ellipse cx="40" cy="30" rx="12" ry="6" fill="white" opacity="0.8"/>
  <ellipse cx="25" cy="35" rx="10" ry="5" fill="white" opacity="0.7"/>
  <defs>
    <linearGradient id="paint0_linear_1_2" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
      <stop stopColor="#87CEEB"/>
      <stop offset="0.5" stopColor="#4682B4"/>
      <stop offset="1" stopColor="#2E8B57"/>
    </linearGradient>
  </defs>
</svg>
`)}`;

export default WeatherLogo;
