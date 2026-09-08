import React, { useEffect, useState } from 'react';
import { sound } from '../utils/sound';

interface GlitchSystemProps {
  examinedCount: number;
  unlockedConnectionsCount: number;
  hasPlatform7: boolean;
  hasTime2341: boolean;
  onGlitchMessage?: (msg: string | null) => void;
}

export const GlitchSystem: React.FC<GlitchSystemProps> = ({
  examinedCount,
  unlockedConnectionsCount,
  hasPlatform7,
  hasTime2341,
  onGlitchMessage,
}) => {
  const [activeScreenTear, setActiveScreenTear] = useState(false);
  const [activeStaticBurst, setActiveStaticBurst] = useState(false);
  const [contextualOverlay, setContextualOverlay] = useState<string | null>(null);

  // Interval & intensity management
  useEffect(() => {
    // 0-1 objects: very rare or none
    if (examinedCount <= 1) {
      onGlitchMessage?.(null);
      return;
    }

    // Interval decreases (more frequent) as examined count increases
    const baseInterval = examinedCount >= 5 ? 4500 : examinedCount >= 3 ? 7500 : 12000;
    
    const interval = setInterval(() => {
      const roll = Math.random();

      // Trigger static or sound if level >= 2
      if (examinedCount >= 2 && roll > 0.4) {
        sound.glitchStatic();
      }

      // Contextual glitch priority
      if (unlockedConnectionsCount >= 2 && Math.random() > 0.6) {
        setContextualOverlay('THEY WERE CONNECTED');
        onGlitchMessage?.('NOTICE: THEY WERE CONNECTED');
        setTimeout(() => {
          setContextualOverlay(null);
          onGlitchMessage?.(null);
        }, 1200);
        return;
      }

      if (hasPlatform7 && Math.random() > 0.65) {
        setContextualOverlay('PLATFORM 7');
        onGlitchMessage?.('SECTOR: PLATFORM 7 // ECHO');
        setTimeout(() => {
          setContextualOverlay(null);
          onGlitchMessage?.(null);
        }, 900);
        return;
      }

      if (hasTime2341 && Math.random() > 0.65) {
        setContextualOverlay('23:41:08');
        onGlitchMessage?.('CLOCK DRIFT: 23:41');
        setTimeout(() => {
          setContextualOverlay(null);
          onGlitchMessage?.(null);
        }, 900);
        return;
      }

      // Level 4-5 Glitches: Screen tearing & static bursts
      if (examinedCount >= 4) {
        setActiveScreenTear(true);
        setActiveStaticBurst(true);

        const messages = [
          'MEMORY DRIFT DETECTED',
          'UNAUTHORIZED TRACE',
          'SIGNAL INTEGRITY LOW',
          'BUFFER OVERFLOW: ARCHIVE_LEAK',
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        onGlitchMessage?.(randomMsg);

        setTimeout(() => {
          setActiveScreenTear(false);
          setActiveStaticBurst(false);
          onGlitchMessage?.(null);
        }, 650);
      } else if (examinedCount >= 2) {
        // Level 2-3: tiny flicker & corrupted status
        onGlitchMessage?.('ARCHIVE STATUS: N0MINAL');
        setTimeout(() => {
          onGlitchMessage?.(null);
        }, 800);
      }
    }, baseInterval);

    return () => clearInterval(interval);
  }, [examinedCount, unlockedConnectionsCount, hasPlatform7, hasTime2341, onGlitchMessage]);

  return (
    <>
      {/* Universal CRT scanline overlay: increases in opacity with progression */}
      <div
        className="fixed inset-0 pointer-events-none z-30 crt-scanlines transition-opacity duration-1000"
        style={{
          opacity:
            examinedCount === 0
              ? 0.08
              : examinedCount <= 2
              ? 0.16
              : examinedCount <= 4
              ? 0.28
              : 0.42,
        }}
      />

      {/* Screen tearing bar effect (transient) */}
      {activeScreenTear && (
        <div
          className="fixed inset-0 pointer-events-none z-40 screen-tear-active bg-red-600/10 mix-blend-color-dodge transition-all"
        />
      )}

      {/* Static noise burst overlay (transient) */}
      {activeStaticBurst && (
        <div
          className="fixed inset-0 pointer-events-none z-40 film-grain opacity-40 bg-black/20 mix-blend-overlay"
        />
      )}

      {/* Contextual fleeting message watermark */}
      {contextualOverlay && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none select-none text-center animate-pulse">
          <div className="px-4 py-2 bg-red-950/90 border-2 border-red-500 shadow-[0_0_40px_rgba(220,38,38,0.8)] font-mono text-xl sm:text-3xl font-black tracking-[0.3em] text-white glitch-text-active">
            {contextualOverlay}
          </div>
          <div className="text-[10px] font-mono text-red-400/80 tracking-widest mt-1">
            ARCHIVE ECHO DETECTED
          </div>
        </div>
      )}
    </>
  );
};
