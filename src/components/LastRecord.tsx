import React, { useState, useEffect } from 'react';
import { ObjectIllustration } from './ObjectIllustration';
import { sound } from '../utils/sound';
import { ShieldCheck, UserCheck, RotateCcw, Copy, Check, Eye } from 'lucide-react';

interface LastRecordProps {
  onClose: () => void;
  onRestart: () => void;
}

export const LastRecord: React.FC<LastRecordProps> = ({ onClose, onRestart }) => {
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(0);

  // Today formatted
  const todayFormatted = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/\//g, '.');

  useEffect(() => {
    // Cinematic step progression
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => {
        setStep(3);
        sound.clueReveal();
      }, 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const copyRecordSummary = () => {
    sound.click();
    const text = `RECORD: LF-0000\nOBJECT: UNKNOWN\nLOCATION: ARCHIVE\nDATE FOUND: ${todayFormatted}\nSTATUS: ACTIVE\nLAST OBSERVER: CURRENT USER\n"THE OBJECTS WERE NEVER LOST. WHO FOUND THEM? YOU DID."`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="last-record-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative z-10 w-full max-w-2xl bg-[#08090d] border-2 border-red-500 rounded-sm shadow-[0_0_80px_rgba(220,38,38,0.5)] overflow-hidden font-mono text-xs">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#130708] border-b border-red-500/50">
          <div className="flex items-center gap-2 text-red-500 font-bold tracking-widest text-sm">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            <span>TERMINAL FILE: RECORD LF-0000</span>
          </div>
          <span className="text-white/40 text-[11px] tracking-widest">
            CLASSIFICATION: OMEGA // FINAL
          </span>
        </div>

        {/* Dossier Body */}
        <div className="p-6 sm:p-8 space-y-6 text-white/90">
          {/* Visual User Reticle */}
          <div className="flex justify-center py-2">
            <ObjectIllustration type="record0" size="md" glitched={true} />
          </div>

          {/* ASCII Border Box as explicitly formatted in prompt */}
          <div className="p-5 bg-black/70 border border-white/20 rounded-sm space-y-3 font-mono">
            <div className="text-white/30 text-xs tracking-widest select-none">
              ────────────────────────────────────────────────
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs sm:text-sm">
              <div>
                <span className="text-white/40 block text-[10px] tracking-widest uppercase">RECORD:</span>
                <span className="font-bold text-red-400 text-base tracking-wider">LF-0000</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] tracking-widest uppercase">OBJECT:</span>
                <span className="font-bold tracking-wider">UNKNOWN</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] tracking-widest uppercase">LOCATION:</span>
                <span className="font-bold tracking-wider">ARCHIVE</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] tracking-widest uppercase">DATE FOUND:</span>
                <span className="font-bold tracking-wider">TODAY ({todayFormatted})</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] tracking-widest uppercase">STATUS:</span>
                <span className="font-bold text-emerald-400 tracking-wider">ACTIVE</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] tracking-widest uppercase">OWNER:</span>
                <span className="font-bold tracking-wider">UNKNOWN</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <span className="text-white/40 block text-[10px] tracking-widest uppercase">LAST OBSERVER:</span>
              <span className="font-bold text-red-400 text-sm tracking-widest flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-red-500" />
                CURRENT USER [SESSION OBSERVER]
              </span>
            </div>

            <div className="text-white/30 text-xs tracking-widest select-none">
              ────────────────────────────────────────────────
            </div>
          </div>

          {/* Revelation Query Flow */}
          <div className="space-y-4 pt-2 text-center">
            <div className="text-white/50 text-xs tracking-[0.2em] uppercase">
              ARCHIVE QUERY
            </div>

            <div className="font-editorial text-xl sm:text-2xl tracking-wider text-white font-semibold">
              WHO FOUND THE OBJECTS?
            </div>

            {step >= 1 && (
              <div className="text-white/40 font-mono text-sm tracking-widest animate-pulse">
                ...
              </div>
            )}

            {step >= 2 && (
              <div className="font-editorial text-3xl sm:text-4xl text-red-500 font-extrabold tracking-[0.2em] glitch-text-active py-2">
                YOU DID.
              </div>
            )}

            {step >= 3 && (
              <div className="p-4 bg-[#120507] border border-red-500/40 rounded-sm space-y-2 animate-fadeIn">
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm tracking-widest">
                  <ShieldCheck className="w-4 h-4" />
                  ARCHIVE COMPLETE.
                </div>
                <div className="text-white/80 font-mono text-sm tracking-wider">
                  THANK YOU FOR FINDING US.
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={copyRecordSummary}
              className="w-full sm:w-auto px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-xs font-mono text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'RECORD COPIED' : 'COPY DOSSIER'}</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  sound.click();
                  onClose();
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xs font-mono text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-white/70" />
                <span>INSPECT ARCHIVE</span>
              </button>

              <button
                onClick={() => {
                  sound.click();
                  onRestart();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-red-700 hover:bg-red-600 text-white rounded-xs font-mono text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors font-bold shadow-[0_0_15px_rgba(220,38,38,0.4)]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET SYSTEM</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
