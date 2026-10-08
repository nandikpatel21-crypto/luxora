import React from 'react';

export const LuxoraLogo = ({ className = "h-10", showText = true, textVariant = "full", darkBg = false }) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none cursor-pointer group ${className}`}>
      {/* Emblem SVG */}
      <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_2px_8px_rgba(196,154,69,0.25)]">
          {/* Outer Gold Ring */}
          <circle cx="34" cy="36" r="22" stroke="url(#goldGrad)" strokeWidth="3.5" />
          <circle cx="34" cy="36" r="17" fill="#07120F" stroke="url(#goldGrad)" strokeWidth="1.5" />
          
          {/* Watch Dial Ticks & Hands */}
          <line x1="34" y1="22" x2="34" y2="25" stroke="#C49A45" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="34" y1="47" x2="34" y2="50" stroke="#C49A45" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="36" x2="23" y2="36" stroke="#C49A45" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="45" y1="36" x2="48" y2="36" stroke="#C49A45" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Watch Crown */}
          <rect x="9" y="34" width="3" height="4" rx="1" fill="#C49A45" />

          {/* Watch Hands */}
          <line x1="34" y1="36" x2="34" y2="28" stroke="#FDFBF3" strokeWidth="2" strokeLinecap="round" />
          <line x1="34" y1="36" x2="41" y2="36" stroke="#D8B46A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="34" cy="36" r="2" fill="#FDFBF3" />

          {/* Classic Monogram 'L' */}
          <path d="M48 18V80H75" stroke="#07120F" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" />
          <path d="M48 18V80H75" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />

          {/* Shoe Silhouette Integration */}
          <path 
            d="M48 64 C 54 62, 65 60, 78 68 C 84 72, 88 78, 86 80 L 52 80 Z" 
            fill="url(#shoeGrad)" 
            stroke="url(#goldGrad)" 
            strokeWidth="1.2"
          />
          {/* Shoe Laces Gold Touch */}
          <line x1="60" y1="65" x2="63" y2="69" stroke="#D8B46A" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="64" y1="66" x2="67" y2="70" stroke="#D8B46A" strokeWidth="1.5" strokeLinecap="round" />

          {/* Swirling Gold Ribbon */}
          <path 
            d="M 24 55 C 32 40, 48 30, 60 22 C 66 18, 55 42, 38 68" 
            stroke="url(#goldGrad)" 
            strokeWidth="3.5" 
            strokeLinecap="round"
          />

          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D8B46A" />
              <stop offset="50%" stopColor="#C49A45" />
              <stop offset="100%" stopColor="#9E792F" />
            </linearGradient>
            <linearGradient id="shoeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#07120F" />
              <stop offset="100%" stopColor="#101713" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col tracking-wider">
          <span className={`font-cinzel text-xl md:text-2xl font-bold tracking-[0.25em] transition-colors ${
            darkBg ? "text-[#FDFBF3] group-hover:text-[#D8B46A]" : "text-[#07120F] group-hover:text-[#C49A45]"
          }`}>
            LUXORA
          </span>
          {textVariant === "full" && (
            <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] tracking-[0.3em] font-medium text-[#C49A45] uppercase font-sans">
              <span>Watches</span>
              <span className="w-1 h-1 rounded-full bg-[#C49A45] inline-block"></span>
              <span>Shoes</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

