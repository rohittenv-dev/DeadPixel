/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArchiveObject, MysteryConnection, ArchiveLogEntry } from './types';
import { INITIAL_OBJECTS, MYSTERY_CONNECTIONS } from './data/archiveData';
import { sound } from './utils/sound';

import { Landing } from './components/Landing';
import { InvestigationHUD } from './components/InvestigationHUD';
import { ObjectCard } from './components/ObjectCard';
import { ObjectDetail } from './components/ObjectDetail';
import { ConnectionNotification } from './components/ConnectionNotification';
import { ConnectionMap } from './components/ConnectionMap';
import { ArchiveLog } from './components/ArchiveLog';
import { GlitchSystem } from './components/GlitchSystem';
import { FinalRevelation } from './components/FinalRevelation';
import { LastRecord } from './components/LastRecord';

import { Database, ShieldAlert, FileText, CornerDownRight, RotateCcw } from 'lucide-react';

const INTEGRITY_MAP: Record<number, number> = {
  0: 100,
  1: 87,
  2: 76,
  3: 61,
  4: 43,
  5: 24,
  6: 7,
};

export default function App() {
  const [inArchive, setInArchive] = useState(false);
  const [objects, setObjects] = useState<ArchiveObject[]>(INITIAL_OBJECTS);
  const [connections, setConnections] = useState<MysteryConnection[]>(MYSTERY_CONNECTIONS);
  const [activeObject, setActiveObject] = useState<ArchiveObject | null>(null);
  const [discoveredNotification, setDiscoveredNotification] = useState<MysteryConnection | null>(null);
  const [glitchMessage, setGlitchMessage] = useState<string | null>(null);
  const [lastRecordOpen, setLastRecordOpen] = useState(false);

  // Archive Logs State
  const [archiveLogs, setArchiveLogs] = useState<ArchiveLogEntry[]>([]);

  // Helper to format timestamps (HH:MM:SS)
  const getLogTimestamp = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  };

  const addLog = useCallback((text: string, type: ArchiveLogEntry['type'] = 'system') => {
    const newEntry: ArchiveLogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: getLogTimestamp(),
      text,
      type,
    };
    setArchiveLogs((prev) => [...prev, newEntry]);
  }, []);

  // Compute examined count and integrity
  const examinedCount = useMemo(() => {
    return objects.filter((o) => o.examined).length;
  }, [objects]);

  const integrity = useMemo(() => {
    return INTEGRITY_MAP[examinedCount] ?? 100;
  }, [examinedCount]);

  const hasPlatform7 = useMemo(() => {
    return objects.some((o) => o.examined && o.clueTags.includes('PLATFORM 7'));
  }, [objects]);

  const hasTime2341 = useMemo(() => {
    return objects.some((o) => o.examined && o.clueTags.includes('23:41'));
  }, [objects]);

  const unlockedConnectionsCount = useMemo(() => {
    return connections.filter((c) => c.unlocked).length;
  }, [connections]);

  // Handle entering the archive
  const handleEnterArchive = () => {
    setInArchive(true);
    addLog('USER ENTERED ARCHIVE // AUTHORIZED AS GUEST', 'system');
    addLog('SECTOR 4 DATA BANK MOUNTED: 6 RECORDS LOADED', 'system');
  };

  // Handle object examination completion
  const handleExaminedComplete = (id: string) => {
    const targetObj = objects.find((o) => o.id === id);
    if (!targetObj) return;

    // Check if already examined to prevent duplicate increments
    const wasAlreadyExamined = targetObj.examined;

    // Update object state
    setObjects((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              examined: true,
              status: 'EXAMINED',
            }
          : o
      )
    );

    // If newly examined, run progressive logic
    if (!wasAlreadyExamined) {
      const nextExaminedCount = examinedCount + 1;
      const nextIntegrity = INTEGRITY_MAP[nextExaminedCount] ?? 7;

      addLog(`RECORD ${targetObj.recordId} EXAMINED // ${targetObj.name}`, 'trace');
      addLog(`TRACE DETECTED: "${targetObj.clueText.split('\n')[0]}"`, 'trace');
      addLog(`ARCHIVE INTEGRITY ↓ ${nextIntegrity}%`, 'anomaly');

      // Check for unlocked connections
      const currentExaminedIds = new Set([
        ...objects.filter((o) => o.examined).map((o) => o.id),
        id,
      ]);

      let newlyFoundConn: MysteryConnection | null = null;

      setConnections((prevConns) =>
        prevConns.map((conn) => {
          const [idA, idB] = conn.objectIds;
          if (currentExaminedIds.has(idA) && currentExaminedIds.has(idB) && !conn.unlocked) {
            newlyFoundConn = { ...conn, unlocked: true };
            return { ...conn, unlocked: true };
          }
          return conn;
        })
      );

      if (newlyFoundConn) {
        sound.connectionFound();
        setDiscoveredNotification(newlyFoundConn);
        addLog(
          `CONNECTION ESTABLISHED: ${(newlyFoundConn as MysteryConnection).title}`,
          'connection'
        );
      }

      // Add unsettling logs as progress increases
      if (nextExaminedCount === 3) {
        setTimeout(() => addLog('USER ACTIVITY DETECTED AT HOST LAYER', 'anomaly'), 1200);
      } else if (nextExaminedCount === 4) {
        setTimeout(() => addLog('SECONDARY OBSERVER DETECTED IN ARCHIVE NODE', 'anomaly'), 1400);
      } else if (nextExaminedCount === 5) {
        setTimeout(() => addLog('WARNING: BUFFER LEAKAGE INTO CLIENT ENVIRONMENT', 'corrupt'), 1500);
      } else if (nextExaminedCount === 6) {
        setTimeout(() => addLog('ALL 6 ARTIFACT CORRELATIONS VERIFIED', 'connection'), 800);
        setTimeout(() => addLog('THE OBJECTS WERE NEVER LOST. PARADOX DETECTED', 'corrupt'), 1800);
        setTimeout(() => addLog('OBSERVER IDENTITY RECONCILED: CURRENT USER', 'corrupt'), 2800);
      }
    }
  };

  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Full reset function
  const handleRestart = () => {
    setObjects(INITIAL_OBJECTS.map((o) => ({ ...o, examined: false, status: 'UNCLAIMED' })));
    setConnections(MYSTERY_CONNECTIONS.map((c) => ({ ...c, unlocked: false })));
    setActiveObject(null);
    setDiscoveredNotification(null);
    setGlitchMessage(null);
    setLastRecordOpen(false);
    setInArchive(false);
    setArchiveLogs([]);
  };

  return (
    <div className="relative min-h-screen bg-[#07080a] text-[#e2e4e9] overflow-x-hidden selection:bg-red-900/60 selection:text-white">
      {/* Glitch and CRT scanlines engine */}
      {inArchive && (
        <GlitchSystem
          examinedCount={examinedCount}
          unlockedConnectionsCount={unlockedConnectionsCount}
          hasPlatform7={hasPlatform7}
          hasTime2341={hasTime2341}
          onGlitchMessage={setGlitchMessage}
        />
      )}

      {/* Floating notification for discovered connection */}
      <ConnectionNotification
        connection={discoveredNotification}
        onDismiss={() => setDiscoveredNotification(null)}
      />

      {/* Main Single Page Experience */}
      {!inArchive ? (
        /* SECTION 1: Clean Cinematic Landing */
        <Landing onEnter={handleEnterArchive} />
      ) : (
        /* SECTION 2: Interactive City Archive */
        <main id="archive-main-container" className="relative z-10 archival-grid min-h-screen pb-24 animate-fadeIn">
          {/* Fixed compact monitoring HUD */}
          <InvestigationHUD
            examinedCount={examinedCount}
            totalCount={objects.length}
            integrity={integrity}
            glitchText={glitchMessage}
            onScrollToSection={scrollToSection}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
            {/* Archive Header */}
            <header className="mb-10 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-red-500 font-mono text-xs tracking-widest uppercase mb-1">
                  <Database className="w-3.5 h-3.5" />
                  <span>SECTOR 04 REPOSITORY // ARCHIVE NODE LF-01</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-editorial tracking-wider text-white font-bold">
                  CITY ARCHIVE
                </h1>
                <p className="text-white/60 text-sm font-mono mt-2 max-w-xl">
                  Recovered objects from the abandoned districts. Select any artifact to run forensic scanning and trace data recovery.
                </p>
              </div>

              {/* Status capsule */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRestart}
                  className="px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-xs text-white/50 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reset entire archive state"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET ARCHIVE</span>
                </button>
              </div>
            </header>

            {/* Evidence Cards Grid */}
            <section id="evidence-grid" className="scroll-mt-20">
              <div className="flex items-center justify-between mb-4 font-mono text-xs text-white/40">
                <span className="tracking-widest uppercase flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-red-500/70" />
                  EVIDENCE RECORDS ({objects.length})
                </span>
                <span>STATUS: {examinedCount === 6 ? 'ALL VERIFIED' : 'INVESTIGATION IN PROGRESS'}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {objects.map((item) => (
                  <ObjectCard
                    key={item.id}
                    item={item}
                    integrity={integrity}
                    glitchActive={Boolean(glitchMessage)}
                    onExamine={(obj) => {
                      setActiveObject(obj);
                    }}
                  />
                ))}
              </div>
            </section>

            {/* Final Revelation Banner (Unlocked once 6/6 objects examined) */}
            {examinedCount === 6 && (
              <FinalRevelation
                onViewLastRecord={() => {
                  setLastRecordOpen(true);
                }}
              />
            )}

            {/* Evidence & Connection Map Section */}
            <ConnectionMap
              objects={objects}
              connections={connections}
              onSelectObject={(obj) => setActiveObject(obj)}
            />

            {/* Live Telemetry Archive Log Section */}
            <ArchiveLog logs={archiveLogs} integrity={integrity} />

            {/* Footer terminal credentials */}
            <footer className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-white/30">
              <div className="flex items-center gap-2">
                <span>LOST & FOUND // DEADPIXEL SPECIFICATION</span>
              </div>
              <div className="text-center sm:text-right">
                <span>SECTOR 04 EAST DISTRICT MUNICIPALITY — 1997</span>
              </div>
            </footer>
          </div>
        </main>
      )}

      {/* Interactive Examination Modal Overlay (Opens on same page) */}
      {activeObject && (
        <ObjectDetail
          item={activeObject}
          onClose={() => setActiveObject(null)}
          onExaminedComplete={handleExaminedComplete}
        />
      )}

      {/* Last Record Dossier Modal (The climactic reveal) */}
      {lastRecordOpen && (
        <LastRecord
          onClose={() => setLastRecordOpen(false)}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
