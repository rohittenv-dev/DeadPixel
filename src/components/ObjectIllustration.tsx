import React from 'react';
import { ObjectType } from '../types';

interface ObjectIllustrationProps {
  type: ObjectType | 'record0';
  size?: 'sm' | 'md' | 'lg';
  glitched?: boolean;
}

export const ObjectIllustration: React.FC<ObjectIllustrationProps> = ({
  type,
  size = 'md',
  glitched = false,
}) => {
  const sizeClasses = {
    sm: 'w-24 h-20',
    md: 'w-48 h-36',
    lg: 'w-full max-w-md h-64',
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center p-3 select-none overflow-hidden ${sizeClasses} ${
        glitched ? 'animate-[glitch-jitter_0.3s_infinite]' : ''
      }`}
    >
      {/* Background blueprint/grid lines */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {type === 'cassette' && (
        <svg
          viewBox="0 0 200 130"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(220,38,38,0.15)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Cassette Shell */}
          <rect
            x="10"
            y="10"
            width="180"
            height="110"
            rx="8"
            className="fill-[#14161a] stroke-[#dc2626]/80 stroke-1"
          />
          {/* Screw holes */}
          <circle cx="20" cy="20" r="3" className="fill-[#08090b] stroke-white/20 stroke-1" />
          <circle cx="180" cy="20" r="3" className="fill-[#08090b] stroke-white/20 stroke-1" />
          <circle cx="20" cy="110" r="3" className="fill-[#08090b] stroke-white/20 stroke-1" />
          <circle cx="180" cy="110" r="3" className="fill-[#08090b] stroke-white/20 stroke-1" />
          <circle cx="100" cy="110" r="2.5" className="fill-[#08090b] stroke-white/20 stroke-1" />

          {/* Cassette Label - Red Tinted */}
          <rect
            x="24"
            y="24"
            width="152"
            height="82"
            rx="4"
            className="fill-[#1c0d0f] stroke-[#dc2626]/40 stroke-1"
          />
          {/* Label Header Stripe */}
          <rect x="24" y="24" width="152" height="16" className="fill-[#dc2626]/30" />
          <text x="32" y="36" className="fill-[#fecaca] text-[9px] font-mono tracking-widest font-semibold">
            LF-001 // SIDE A // 23:41
          </text>

          {/* Central Window */}
          <rect
            x="48"
            y="48"
            width="104"
            height="34"
            rx="3"
            className="fill-[#090a0d] stroke-white/30 stroke-1"
          />
          {/* Left Spool */}
          <circle cx="72" cy="65" r="13" className="fill-[#1a1d24] stroke-white/40 stroke-1" />
          <circle cx="72" cy="65" r="7" className="fill-[#08090b] stroke-[#dc2626] stroke-1" />
          <path d="M72 58 L72 72 M65 65 L79 65" className="stroke-white/60 stroke-1" />

          {/* Right Spool */}
          <circle cx="128" cy="65" r="13" className="fill-[#1a1d24] stroke-white/40 stroke-1" />
          <circle cx="128" cy="65" r="7" className="fill-[#08090b] stroke-[#dc2626] stroke-1" />
          <path d="M128 58 L128 72 M121 65 L135 65" className="stroke-white/60 stroke-1" />

          {/* Magnetic Tape bridge */}
          <path
            d="M85 68 L115 68"
            className="stroke-[#7f1d1d] stroke-[5px] stroke-linecap-round opacity-80"
          />

          {/* Bottom trapezoid section */}
          <polygon
            points="38,120 162,120 152,98 48,98"
            className="fill-[#0d0f12] stroke-white/20 stroke-1"
          />
          <circle cx="62" cy="108" r="4" className="fill-[#1b1e24]" />
          <circle cx="138" cy="108" r="4" className="fill-[#1b1e24]" />
        </svg>
      )}

      {type === 'key' && (
        <svg
          viewBox="0 0 200 130"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(255,255,255,0.08)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ornate Key Bow / Ring */}
          <circle
            cx="48"
            cy="65"
            r="28"
            className="stroke-[#c0c6d0] stroke-[4px] fill-[#0d0f13]"
          />
          <circle
            cx="48"
            cy="65"
            r="16"
            className="stroke-white/20 stroke-1 fill-[#07080a]"
          />
          <circle cx="48" cy="65" r="6" className="fill-[#94a3b8] opacity-60" />

          {/* Key Collar / Neck */}
          <rect x="74" y="60" width="10" height="10" rx="1" className="fill-[#c0c6d0]" />

          {/* Key Shaft / Barrel */}
          <rect
            x="82"
            y="61"
            width="86"
            height="8"
            rx="2"
            className="fill-[#94a3b8] stroke-white/40 stroke-1"
          />
          {/* Stamped text 113 on shaft */}
          <text
            x="96"
            y="67"
            className="fill-[#090b0e] text-[7px] font-mono font-bold tracking-widest"
          >
            113
          </text>

          {/* Bittings / Teeth */}
          <path
            d="M140 69 L140 88 L148 88 L148 76 L154 76 L154 86 L162 86 L162 69 Z"
            className="fill-[#c0c6d0] stroke-white/30 stroke-1"
          />
          {/* Security Notch */}
          <rect x="126" y="55" width="6" height="6" className="fill-[#c0c6d0]" />
        </svg>
      )}

      {type === 'camera' && (
        <svg
          viewBox="0 0 200 130"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(220,38,38,0.1)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Camera Body */}
          <rect
            x="24"
            y="30"
            width="152"
            height="82"
            rx="10"
            className="fill-[#16181d] stroke-white/25 stroke-1"
          />
          {/* Top Plate Accent */}
          <path
            d="M24 48 L176 48"
            className="stroke-white/15 stroke-1"
          />
          {/* Shutter Button */}
          <rect x="42" y="23" width="20" height="7" rx="2" className="fill-[#dc2626] stroke-[#f87171] stroke-1" />
          {/* Flash Window */}
          <rect x="134" y="36" width="30" height="14" rx="2" className="fill-[#2a303c] stroke-white/30 stroke-1" />
          <line x1="134" y1="43" x2="164" y2="43" className="stroke-white/20 stroke-1" />

          {/* Viewfinder */}
          <rect x="74" y="36" width="14" height="10" rx="2" className="fill-[#08090c] stroke-white/40 stroke-1" />

          {/* Red status LED */}
          <circle cx="120" cy="42" r="2.5" className="fill-[#ef4444] animate-pulse" />

          {/* Main Lens Barrel - Concentric Circles */}
          <circle cx="100" cy="74" r="30" className="fill-[#0f1115] stroke-white/30 stroke-[2px]" />
          <circle cx="100" cy="74" r="24" className="fill-[#181c22] stroke-[#dc2626]/50 stroke-1" />
          <circle cx="100" cy="74" r="16" className="fill-[#07080a] stroke-cyan-500/40 stroke-1" />
          <circle cx="100" cy="74" r="8" className="fill-[#040507]" />
          {/* Glass reflection glint */}
          <path
            d="M90 64 A16 16 0 0 1 112 66"
            className="stroke-white/60 stroke-[1.5px] stroke-linecap-round fill-none"
          />
        </svg>
      )}

      {type === 'ticket' && (
        <svg
          viewBox="0 0 200 130"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(220,38,38,0.15)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ticket Base */}
          <rect
            x="20"
            y="26"
            width="160"
            height="78"
            rx="4"
            className="fill-[#131518] stroke-white/25 stroke-1"
          />
          {/* Perforated edge on left stub */}
          <line
            x1="62"
            y1="26"
            x2="62"
            y2="104"
            strokeDasharray="4 3"
            className="stroke-white/30 stroke-1"
          />
          <circle cx="62" cy="26" r="4" className="fill-[#07080a]" />
          <circle cx="62" cy="104" r="4" className="fill-[#07080a]" />

          {/* Barcode on stub */}
          <g className="opacity-70">
            <line x1="30" y1="42" x2="30" y2="86" className="stroke-white/80 stroke-2" />
            <line x1="34" y1="42" x2="34" y2="86" className="stroke-white/40 stroke-1" />
            <line x1="38" y1="42" x2="38" y2="86" className="stroke-white/80 stroke-[3px]" />
            <line x1="43" y1="42" x2="43" y2="86" className="stroke-white/60 stroke-1" />
            <line x1="47" y1="42" x2="47" y2="86" className="stroke-white/80 stroke-2" />
            <line x1="52" y1="42" x2="52" y2="86" className="stroke-white/50 stroke-1" />
          </g>

          {/* Ticket Content */}
          <text x="74" y="44" className="fill-white/40 text-[7px] font-mono tracking-widest uppercase">
            DISTRICT TRANSIT AUTHORITY
          </text>
          <text x="74" y="60" className="fill-white text-[13px] font-mono font-bold tracking-wider">
            PLATFORM 7
          </text>
          <text x="74" y="74" className="fill-white/60 text-[9px] font-mono">
            EXP: 17.08.1997
          </text>

          {/* Crimson departure stamp */}
          <g transform="rotate(-6 135 68)">
            <rect
              x="116"
              y="58"
              width="44"
              height="20"
              rx="2"
              className="stroke-[#dc2626] stroke-[1.5px] fill-[#dc2626]/10"
            />
            <text x="122" y="72" className="fill-[#ef4444] text-[10px] font-mono font-bold tracking-widest">
              23:41
            </text>
          </g>
        </svg>
      )}

      {type === 'watch' && (
        <svg
          viewBox="0 0 200 130"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(255,255,255,0.08)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Watch Straps */}
          <rect x="88" y="6" width="24" height="24" rx="2" className="fill-[#181a1f] stroke-white/20 stroke-1" />
          <rect x="88" y="100" width="24" height="24" rx="2" className="fill-[#181a1f] stroke-white/20 stroke-1" />

          {/* Watch Casing */}
          <circle cx="100" cy="65" r="42" className="fill-[#121418] stroke-[#64748b] stroke-[3px]" />
          <circle cx="100" cy="65" r="36" className="fill-[#0a0c0f] stroke-white/25 stroke-1" />

          {/* Hour Indices */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + 31 * Math.sin(rad);
            const y1 = 65 - 31 * Math.cos(rad);
            const x2 = 100 + 34 * Math.sin(rad);
            const y2 = 65 - 34 * Math.cos(rad);
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={angle % 90 === 0 ? 'stroke-white stroke-2' : 'stroke-white/40 stroke-1'}
              />
            );
          })}

          {/* Hands frozen at 23:41 (11h 41m) */}
          {/* Hour hand pointing near 11 (approx 350 deg) */}
          <line
            x1="100"
            y1="65"
            x2="88"
            y2="46"
            className="stroke-white stroke-[2.5px] stroke-linecap-round"
          />
          {/* Minute hand pointing at 41m (approx 246 deg) */}
          <line
            x1="100"
            y1="65"
            x2="73"
            y2="76"
            className="stroke-white stroke-[1.8px] stroke-linecap-round"
          />
          {/* Second hand arrested in red */}
          <line
            x1="100"
            y1="65"
            x2="108"
            y2="38"
            className="stroke-[#ef4444] stroke-1"
          />
          <circle cx="100" cy="65" r="3" className="fill-[#ef4444]" />

          {/* Spiderweb Glass Fracture Fissures */}
          <path
            d="M84 48 L100 65 L118 78 M100 65 L76 72 M100 65 L110 42 M100 65 L94 88 M84 48 L76 40 M118 78 L128 86"
            className="stroke-white/80 stroke-[1.2px] opacity-75"
          />
        </svg>
      )}

      {type === 'polaroid' && (
        <svg
          viewBox="0 0 200 130"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(255,255,255,0.08)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Polaroid Frame */}
          <rect
            x="45"
            y="10"
            width="110"
            height="110"
            rx="2"
            className="fill-[#eceeed] stroke-white/40 stroke-1"
          />
          {/* Adhesive Tape at Top Left */}
          <polygon points="40,14 65,4 69,14 44,24" className="fill-[#e2e8f0]/40 opacity-70" />

          {/* Photo Area */}
          <rect
            x="53"
            y="18"
            width="94"
            height="76"
            className="fill-[#090b0e] stroke-black/20 stroke-1"
          />

          {/* Eerie Scene: Platform 7 Rails in Fog + Silhouette */}
          <line x1="53" y1="84" x2="147" y2="84" className="stroke-white/20 stroke-1" />
          <line x1="70" y1="94" x2="86" y2="70" className="stroke-[#94a3b8]/40 stroke-1" />
          <line x1="130" y1="94" x2="114" y2="70" className="stroke-[#94a3b8]/40 stroke-1" />

          {/* Distant Platform Light */}
          <circle cx="100" cy="42" r="14" className="fill-[#f87171]/20" />
          <circle cx="100" cy="42" r="3" className="fill-[#fca5a5]" />

          {/* Silhouette Figure */}
          <path
            d="M96 52 Q100 48 104 52 L106 74 L94 74 Z"
            className="fill-[#1e293b]"
          />
          <circle cx="100" cy="49" r="3.5" className="fill-[#1e293b]" />

          {/* Handwritten Annotation on Lower White Border */}
          <text
            x="56"
            y="108"
            className="fill-[#1e293b] text-[7px] font-mono tracking-tight font-medium"
          >
            LOCKER 113 // WE WERE STAGED
          </text>
        </svg>
      )}

      {type === 'record0' && (
        <svg
          viewBox="0 0 200 130"
          className="w-full h-full drop-shadow-[0_4px_16px_rgba(220,38,38,0.3)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* CRT Monitor Frame */}
          <rect
            x="20"
            y="14"
            width="160"
            height="102"
            rx="6"
            className="fill-[#050608] stroke-[#dc2626] stroke-2"
          />
          {/* Target Reticle */}
          <circle cx="100" cy="65" r="38" className="stroke-[#dc2626]/40 stroke-1" strokeDasharray="4 4" />
          <circle cx="100" cy="65" r="26" className="stroke-[#ef4444]/60 stroke-1" />
          
          {/* Reticle Crosshairs */}
          <line x1="56" y1="65" x2="144" y2="65" className="stroke-[#dc2626]/50 stroke-1" />
          <line x1="100" y1="21" x2="100" y2="109" className="stroke-[#dc2626]/50 stroke-1" />

          {/* User Observer Silhouette */}
          <circle cx="100" cy="54" r="9" className="fill-[#dc2626]/80" />
          <path
            d="M84 82 C84 70 116 70 116 82 Z"
            className="fill-[#dc2626]/80"
          />

          {/* Terminal Stamp */}
          <text x="32" y="32" className="fill-[#ef4444] text-[8px] font-mono font-bold tracking-widest">
            LF-0000 // OBSERVER
          </text>
          <text x="32" y="104" className="fill-white/80 text-[7px] font-mono tracking-wider">
            STATUS: ACTIVE OBSERVER
          </text>
        </svg>
      )}
    </div>
  );
};
