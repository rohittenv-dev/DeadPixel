import React, { useState } from 'react';
import { sound } from '../utils/sound';
import { Volume2, VolumeX, AlertTriangle, ShieldAlert, Cpu, Network, Terminal } from 'lucide-react';

interface InvestigationHUDProps {
  examinedCount: number;
  totalCount: number;
  integrity: number;
  glitchText?: string | null;
  onScrollToSection: (sectionId: string) => void;
}

export const InvestigationHUD: React.FC<InvestigationHUDProps> = ({
  examinedCount,
  totalCount,
  integrity,
  glitchText,
  onScrollToSection,
}) => {
  const [muted, setMuted] = useState<boolean>(sound.isMuted);

  const toggleSound = () => {
    sound.isMuted = !sound.isMuted;
    setMuted(sound.isMuted);
    if (!sound.isMuted) sound.click();
  };

  // Status mapping
  const getStatusText = () => {
    if (glitchText) return glitchText;
    if (examinedCount === 0) return 'STATUS: NOMINAL';
    if (examinedCount === 1) return 'STATUS: MONITORED';
    if (examinedCount === 2) return 'STATUS: DATA INSTABILITY';
    if (examinedCount === 3) return 'STATUS: MEMORY DRIFT DETECTED';
    if (examinedCount === 4) return 'STATUS: UNAUTHORIZED TRACE';
    if (examinedCount === 5) return 'STATUS: SIGNAL INTEGRITY LOW';
    return 'STATUS: SYSTEM CORRUPTED';
  };

  // Color logic for integrity
  const getIntegrityColor = () => {
    if (integrity > 70) return 'text-emerald-400 border-emerald-500/30';
    if (integrity > 40) return 'text-amber-400 border-amber-500/30';
    return 'text-red-400 border-red-500/40 animate-pulse';
  };

  const getBarColor = () => {
    if (integrity > 70) return 'bg-emerald-500';
    if (integrity > 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <header
      id="investigation-hud"
      className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#07080a]/90 border-b border-white/10 px-4 py-3 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono">
        {/* Left: Investigation stats */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-red-500" />
            <span className="text-white/40 uppercase tracking-widest hidden sm:inline">
              ARCHIVE INVESTIGATION:
            </span>
            <span className="text-white font-bold tracking-wider">
              {String(examinedCount).padStart(2, '0')} / {String(totalCount).padStart(2, '0')} OBJECTS EXAMINED
            </span>
          </div>

          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

          {/* Quick jumps */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.click();
                onScrollToSection('evidence-grid');
              }}
              className="text-white/60 hover:text-white px-2 py-0.5 rounded-sm hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
            >
              RECORDS
            </button>
            <button
              onClick={() => {
                sound.click();
                onScrollToSection('connection-section');
              }}
              className="text-white/60 hover:text-white px-2 py-0.5 rounded-sm hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors flex items-center gap-1"
            >
              <Network className="w-3 h-3 text-red-400" />
              EVIDENCE MAP
            </button>
            <button
              onClick={() => {
                sound.click();
                onScrollToSection('archive-log-section');
              }}
              className="text-white/60 hover:text-white px-2 py-0.5 rounded-sm hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors flex items-center gap-1 hidden sm:flex"
            >
              <Terminal className="w-3 h-3 text-white/50" />
              LOGS
            </button>
          </div>
        </div>

        {/* Right: Integrity & Status & Audio */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          {/* Integrity bar */}
          <div className="flex items-center gap-2.5">
            <span className="text-white/40 tracking-wider">ARCHIVE INTEGRITY</span>
            <div className="w-20 sm:w-28 h-2 bg-white/10 rounded-xs overflow-hidden p-[1px]">
              <div
                className={`h-full transition-all duration-500 rounded-xs ${getBarColor()}`}
                style={{ width: `${integrity}%` }}
              />
            </div>
            <span className={`font-bold px-1.5 py-0.2 border rounded-xs ${getIntegrityColor()}`}>
              {String(integrity).padStart(2, '0')}%
            </span>
          </div>

          {/* Dynamic Status Display */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/10">
            {integrity <= 24 ? (
              <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500/80" />
            )}
            <span
              className={`tracking-widest text-[11px] ${
                integrity <= 24 ? 'text-red-400 font-bold glitch-text-active' : 'text-white/75'
              }`}
            >
              {getStatusText()}
            </span>
          </div>

          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            title={muted ? 'Enable tactile audio' : 'Mute audio'}
            className="p-1 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            {muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
