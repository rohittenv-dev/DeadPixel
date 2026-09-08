import React, { useState, useEffect } from 'react';
import { sound } from '../utils/sound';
import { AlertOctagon, Terminal, ArrowRight, ShieldAlert } from 'lucide-react';

interface FinalRevelationProps {
  onViewLastRecord: () => void;
}

export const FinalRevelation: React.FC<FinalRevelationProps> = ({
  onViewLastRecord,
}) => {
  const [phase, setPhase] = useState<number>(0);
  const [corruptionBlocks, setCorruptionBlocks] = useState(0);

  useEffect(() => {
    // Phase 0: Corruption glitch sequence
    sound.corruptionDrone();

    const blockInterval = setInterval(() => {
      setCorruptionBlocks((prev) => {
        if (prev < 20) {
          sound.scanTick();
          return prev + 1;
        } else {
          clearInterval(blockInterval);
          setTimeout(() => setPhase(1), 600);
          return 20;
        }
      });
    }, 80);

    return () => clearInterval(blockInterval);
  }, []);

  const handleOpenLastRecord = () => {
    sound.click();
    onViewLastRecord();
  };

  const renderBlocks = () => {
    return '█'.repeat(corruptionBlocks) + '░'.repeat(20 - corruptionBlocks);
  };

  return (
    <section
      id="final-revelation-banner"
      className="my-16 p-6 sm:p-10 bg-[#0c0507] border-2 border-red-600 rounded-sm shadow-[0_0_50px_rgba(220,38,38,0.4)] relative overflow-hidden font-mono"
    >
      {/* Background red scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]" />

      {phase === 0 ? (
        /* Phase 0: Corruption sequence loading */
        <div className="relative z-10 text-center py-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-red-500 font-bold tracking-widest text-sm uppercase glitch-text-active">
            <AlertOctagon className="w-5 h-5 animate-spin" />
            <span>ARCHIVE CORRUPTION DETECTED</span>
          </div>

          <div className="text-red-500 text-lg sm:text-2xl font-mono tracking-widest py-2">
            {renderBlocks()}
          </div>

          <div className="text-white/60 text-xs tracking-widest uppercase">
            6 / 6 RECORDS MATCHED // CRITICAL ANOMALY
          </div>
        </div>
      ) : (
        /* Phase 1: Dramatic Revelation */
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8 animate-fadeIn">
          {/* Top header badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/80 border border-red-500/60 rounded-xs text-red-400 text-xs font-bold tracking-widest uppercase">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span>ROOT DECRYPTION PROTOCOL COMPLETE</span>
          </div>

          {/* Core Revelation Text */}
          <div className="space-y-4">
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-white font-bold tracking-[0.15em] leading-tight">
              THE OBJECTS WERE <span className="text-red-500 glitch-text-active">NEVER LOST.</span>
            </h2>

            <div className="max-w-xl mx-auto text-white/80 text-sm sm:text-base font-mono space-y-3 leading-relaxed pt-2">
              <p>The objects were placed.</p>
              <p>Each record pointed toward another.</p>
              <p className="text-red-300 font-semibold">Each clue led back to Platform 7.</p>
              <p className="text-white/60 italic pt-2">
                This archive was never documenting lost property.
              </p>
              <p className="text-white font-bold text-base sm:text-lg tracking-wider text-red-400">
                It was documenting WHO FOUND IT.
              </p>
            </div>
          </div>

          {/* Action to trigger Last Record */}
          <div className="pt-4">
            <button
              id="btn-view-last-record"
              onClick={handleOpenLastRecord}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-mono font-bold text-sm tracking-[0.2em] uppercase rounded-sm border border-red-300 shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
              <span>VIEW THE LAST RECORD</span>
              <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
