import React from 'react';
import { sound } from '../utils/sound';
import { ArrowRight, ShieldCheck, Terminal, Disc } from 'lucide-react';

interface LandingProps {
  onEnter: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onEnter }) => {
  const handleEnter = () => {
    sound.click();
    onEnter();
  };

  return (
    <section
      id="landing-screen"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 archival-grid overflow-hidden"
    >
      {/* Subtle corner document markings */}
      <div className="absolute top-6 left-6 flex items-center gap-2 text-white/30 font-mono text-xs tracking-widest pointer-events-none">
        <Disc className="w-3.5 h-3.5 text-red-500/70 animate-pulse" />
        <span>CLASSIFIED MUNICIPAL REPOSITORY // 1997</span>
      </div>
      <div className="absolute top-6 right-6 text-white/30 font-mono text-xs tracking-widest hidden sm:block pointer-events-none">
        <span>LOC: SECTOR 04-EAST</span>
      </div>
      <div className="absolute bottom-6 left-6 text-white/20 font-mono text-[11px] tracking-wider hidden sm:block pointer-events-none">
        <span>ENCRYPT: SHA-256/DEADPIXEL</span>
      </div>
      <div className="absolute bottom-6 right-6 text-white/20 font-mono text-[11px] tracking-wider hidden sm:block pointer-events-none">
        <span>SYS.BUILD: 97.08.18-FINAL</span>
      </div>

      {/* Main centered container */}
      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
        {/* Subtle top stamp */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-sm bg-white/[0.03] border border-white/10 text-white/50 text-[11px] font-mono tracking-widest uppercase">
          <Terminal className="w-3.5 h-3.5 text-red-500" />
          <span>CENTRAL ARCHIVE SYSTEM</span>
        </div>

        {/* Title */}
        <h1
          id="hero-title"
          className="font-editorial text-5xl sm:text-7xl md:text-8xl tracking-[0.18em] text-[#f4f5f7] font-semibold mb-6 select-none"
        >
          LOST & FOUND
        </h1>

        {/* Subtitle */}
        <p className="text-white/60 text-lg sm:text-xl font-mono tracking-wide max-w-lg mb-12 italic">
          &ldquo;Some things were never meant to be found.&rdquo;
        </p>

        {/* Primary Action Button */}
        <button
          id="enter-archive-btn"
          onClick={handleEnter}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#111317] hover:bg-[#181b21] active:bg-[#0d0f12] text-white border border-white/20 hover:border-red-500/60 transition-all duration-300 font-mono text-sm tracking-[0.2em] uppercase cursor-pointer rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.25)]"
        >
          <span className="relative z-10 flex items-center gap-3">
            ENTER ARCHIVE
            <ArrowRight className="w-4 h-4 text-red-500 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          {/* Subtle accent border line */}
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-red-600/40 group-hover:bg-red-500 transition-colors" />
        </button>

        {/* Terminal Info Box */}
        <div className="mt-16 pt-8 border-t border-white/10 w-full max-w-md flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/45 tracking-widest gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            <span>ARCHIVE NODE: LF-01</span>
          </div>
          <div>STATUS: OPERATIONAL</div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-white/30" />
            <span>ACCESS: PUBLIC</span>
          </div>
        </div>
      </div>
    </section>
  );
};
