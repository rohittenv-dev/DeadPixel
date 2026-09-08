import React, { useState, useEffect } from 'react';
import { ArchiveObject } from '../types';
import { ObjectIllustration } from './ObjectIllustration';
import { sound } from '../utils/sound';
import { X, Search, CheckCircle2, ShieldCheck, MapPin, Calendar, FileText, AlertCircle } from 'lucide-react';

interface ObjectDetailProps {
  item: ArchiveObject;
  onClose: () => void;
  onExaminedComplete: (id: string) => void;
}

export const ObjectDetail: React.FC<ObjectDetailProps> = ({
  item,
  onClose,
  onExaminedComplete,
}) => {
  const [scanning, setScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(-1);
  const [scanProgress, setScanProgress] = useState(0);
  const [hasRevealed, setHasRevealed] = useState(item.examined);

  // Close with Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.click();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleStartScan = () => {
    if (scanning) return;
    sound.click();
    setScanning(true);
    setScanStepIndex(0);
    setScanProgress(0);

    const steps = item.scanningSteps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setScanStepIndex(currentStep);
        setScanProgress(Math.min(95, Math.floor((currentStep / steps.length) * 100)));
        sound.scanTick();
      } else {
        clearInterval(interval);
        setScanProgress(100);
        sound.scanTick();
        setTimeout(() => {
          setScanning(false);
          setHasRevealed(true);
          sound.clueReveal();
          onExaminedComplete(item.id);
        }, 500);
      }
    }, 450);
  };

  // Generate ASCII block progress bar ████████████████████
  const renderAsciiBlocks = (progress: number) => {
    const totalBlocks = 20;
    const filledBlocks = Math.round((progress / 100) * totalBlocks);
    const filled = '█'.repeat(filledBlocks);
    const empty = '░'.repeat(totalBlocks - filledBlocks);
    return `${filled}${empty} ${progress}%`;
  };

  return (
    <div
      id="examination-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-3xl bg-[#090b0e] border border-white/20 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col font-mono text-xs">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#101318] border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-white font-bold tracking-widest text-sm">
              RECORD {item.recordId}
            </span>
            <span className="text-white/40 text-[11px] hidden sm:inline">
              // CLASSIFICATION: {item.classification}
            </span>
          </div>

          <button
            onClick={() => {
              sound.click();
              onClose();
            }}
            className="p-1 text-white/50 hover:text-white hover:bg-white/10 rounded-xs transition-colors cursor-pointer"
            aria-label="Close examination modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 bg-white/[0.02] border border-white/10 rounded-sm">
            <div>
              <span className="text-white/40 block text-[10px] tracking-widest uppercase">OBJECT</span>
              <span className="text-white font-bold text-sm tracking-wide">{item.name}</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] tracking-widest uppercase">LOCATION</span>
              <span className="text-white/90 text-xs tracking-tight">{item.location}</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] tracking-widest uppercase">DATE FOUND</span>
              <span className="text-white/90 text-xs">{item.date}</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] tracking-widest uppercase">STATUS</span>
              {hasRevealed ? (
                <span className="text-emerald-400 font-bold inline-flex items-center gap-1 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" /> EXAMINED
                </span>
              ) : (
                <span className="text-amber-400 font-bold inline-flex items-center gap-1 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" /> UNCLAIMED
                </span>
              )}
            </div>
          </div>

          {/* Large Visual Representation */}
          <div className="relative border border-white/10 bg-[#06070a] p-6 flex flex-col items-center justify-center rounded-sm overflow-hidden">
            <div className="absolute top-2 left-2 text-[10px] text-white/30 tracking-widest">
              SCHEMATIC SENSOR VIEW
            </div>
            <div className="absolute top-2 right-2 text-[10px] text-white/30 tracking-widest font-mono">
              MAGNIFICATION: 1.0X
            </div>

            <ObjectIllustration type={item.illustrationType} size="lg" />

            {/* Scanning radar sweep line when scanning */}
            {scanning && (
              <div
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_#ef4444] animate-[scanline-sweep_2s_linear_infinite]"
              />
            )}
          </div>

          {/* Mysterious Story Narrative */}
          <div className="border-l-2 border-red-500/60 pl-4 py-1 text-white/80 text-xs sm:text-sm leading-relaxed tracking-wide italic">
            &ldquo;{item.summaryStory}&rdquo;
          </div>

          {/* Action / Scanning Area */}
          {!hasRevealed && !scanning && (
            <div className="pt-2">
              <button
                id="btn-trigger-scan"
                onClick={handleStartScan}
                className="w-full py-4 px-6 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-mono font-bold text-sm tracking-[0.2em] uppercase rounded-sm border border-red-400 shadow-[0_0_25px_rgba(220,38,38,0.35)] transition-all cursor-pointer flex items-center justify-center gap-3"
              >
                <Search className="w-4 h-4" />
                EXAMINE OBJECT
              </button>
            </div>
          )}

          {/* Scanning Progress Sequence */}
          {scanning && (
            <div className="p-4 bg-[#0e1014] border border-red-500/40 rounded-sm space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-red-400 font-bold tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  ANALYZING PHYSICAL ARTIFACT...
                </span>
                <span className="text-white/60">{scanProgress}%</span>
              </div>

              {/* Step Logs */}
              <div className="space-y-1 text-[11px] text-white/70">
                {item.scanningSteps.map((step, idx) => {
                  if (idx > scanStepIndex) return null;
                  return (
                    <div
                      key={step}
                      className={`flex items-center gap-2 ${
                        idx === scanStepIndex ? 'text-red-300 font-bold' : 'text-white/40'
                      }`}
                    >
                      <span>{idx < scanStepIndex ? '✓' : '▶'}</span>
                      <span>{step}</span>
                    </div>
                  );
                })}
              </div>

              {/* ASCII Progress Bar */}
              <div className="pt-2 text-red-500 tracking-widest font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre">
                {renderAsciiBlocks(scanProgress)}
              </div>
            </div>
          )}

          {/* Revealed Clue & Trace Detection */}
          {hasRevealed && (
            <div className="p-5 bg-[#12080a] border border-red-600/60 rounded-sm space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-red-500/30 pb-2">
                <div className="flex items-center gap-2 text-red-400 font-bold tracking-widest text-xs uppercase">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  {item.clueTitle}
                </div>
                <span className="text-emerald-400 text-[11px] font-mono tracking-widest flex items-center gap-1 font-bold">
                  OBJECT EXAMINED ✓
                </span>
              </div>

              {/* Clue message in prompt's exact formatting */}
              <div className="p-4 bg-black/60 border border-white/10 rounded-sm">
                <pre className="text-white text-sm sm:text-base font-mono font-bold tracking-wider whitespace-pre-line leading-relaxed text-red-100">
                  {item.clueText}
                </pre>
              </div>

              {/* Clue Tags / Keywords */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-white/40 text-[10px] tracking-widest uppercase">DISCOVERED TRACE KEYS:</span>
                {item.clueTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] bg-red-950/60 text-red-300 border border-red-800/40 rounded-xs tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-3 bg-[#101318] border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 font-mono">
          <span>PRESS ESC OR CLICK CLOSE TO RETURN TO ARCHIVE</span>
          <button
            onClick={() => {
              sound.click();
              onClose();
            }}
            className="text-white/80 hover:text-white px-3 py-1 bg-white/5 hover:bg-white/10 rounded-xs border border-white/10 transition-colors"
          >
            RETURN TO GRID
          </button>
        </div>
      </div>
    </div>
  );
};
