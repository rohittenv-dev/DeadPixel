import React from 'react';
import { ArchiveObject, MysteryConnection } from '../types';
import { Network, Link2, CheckCircle2, Lock, ArrowDown, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface ConnectionMapProps {
  objects: ArchiveObject[];
  connections: MysteryConnection[];
  onSelectObject: (obj: ArchiveObject) => void;
}

export const ConnectionMap: React.FC<ConnectionMapProps> = ({
  objects,
  connections,
  onSelectObject,
}) => {
  const unlockedConnections = connections.filter((c) => c.unlocked);
  const getObject = (id: string) => objects.find((o) => o.id === id);

  return (
    <section
      id="connection-section"
      className="mt-16 pt-12 border-t border-white/10 relative"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div>
          <div className="flex items-center gap-2 text-red-500 font-mono text-xs tracking-widest uppercase mb-1">
            <Network className="w-3.5 h-3.5" />
            <span>CORRELATION MATRIX // INVESTIGATION BOARD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial tracking-wider text-white font-semibold">
            CONNECTED MYSTERY
          </h2>
          <p className="text-white/50 text-xs font-mono mt-1">
            Visual map linking discovered artifacts across Sector 4.
          </p>
        </div>

        <div className="px-3 py-1.5 bg-[#0e1116] border border-white/10 rounded-sm font-mono text-xs flex items-center gap-2">
          <Link2 className="w-3.5 h-3.5 text-red-400" />
          <span className="text-white/60">ACTIVE LINKS:</span>
          <span className="text-white font-bold">
            {unlockedConnections.length} / {connections.length} REVEALED
          </span>
        </div>
      </div>

      {/* Interactive Desktop Board / Nodal Flow */}
      <div className="hidden lg:block bg-[#090b0e] border border-white/10 rounded-sm p-8 relative overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
        {/* Background circuit grid watermark */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Tree Layout following prompt hierarchy:
            RED CASSETTE (23:41 / Platform 7)
               ├──> TRAIN TICKET (Platform 7 / 23:41) ──> BROKEN WATCH (23:41)
               └──> CHILD'S CAMERA (Platform 7) ───────> POLAROID PHOTO (Same Location / Locker 113)
        */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-12">
          {/* Top Primary Node: RED CASSETTE */}
          <div className="flex flex-col items-center">
            {renderDesktopNode(getObject('01')!, onSelectObject)}
            {/* Trunk connector going down */}
            <div className="w-0.5 h-10 bg-gradient-to-b from-red-600 to-red-500/40 relative">
              <span className="absolute -left-12 top-2 text-[10px] font-mono text-red-400 bg-black/80 px-1 border border-red-500/30">
                23:41
              </span>
            </div>
            {/* Horizontal Branch Bar */}
            <div className="w-[600px] h-0.5 bg-red-500/40 relative">
              {/* Branch markers */}
              <div className="absolute left-0 -top-1 w-2 h-2 rounded-full bg-red-500" />
              <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-red-500" />
            </div>
          </div>

          {/* Level 2: Left (TRAIN TICKET) & Right (BROKEN WATCH) */}
          <div className="grid grid-cols-2 gap-8 px-4">
            {/* Left Branch */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-red-500/40" />
              {renderDesktopNode(getObject('04')!, onSelectObject)}
              
              {/* Down to Child's Camera */}
              <div className="w-0.5 h-12 bg-red-500/40 relative my-1">
                <span className="absolute -right-20 top-3 text-[10px] font-mono text-red-400 bg-black/80 px-1 border border-red-500/30">
                  PLATFORM 7
                </span>
                <ArrowDown className="w-3.5 h-3.5 text-red-400 absolute -bottom-1 -left-1.5" />
              </div>
              {renderDesktopNode(getObject('03')!, onSelectObject)}
            </div>

            {/* Right Branch */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-red-500/40" />
              {renderDesktopNode(getObject('05')!, onSelectObject)}

              {/* Down to Silver Key & Polaroid */}
              <div className="w-0.5 h-12 bg-red-500/40 relative my-1">
                <span className="absolute -right-24 top-3 text-[10px] font-mono text-red-400 bg-black/80 px-1 border border-red-500/30">
                  LOCKER 113
                </span>
                <ArrowDown className="w-3.5 h-3.5 text-red-400 absolute -bottom-1 -left-1.5" />
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                {renderDesktopNode(getObject('02')!, onSelectObject, true)}
                {renderDesktopNode(getObject('06')!, onSelectObject, true)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Vertical Timeline Chain */}
      <div className="lg:hidden space-y-4">
        {objects.map((obj, idx) => {
          const isExamined = obj.examined;
          return (
            <div key={obj.id} className="relative">
              {/* Connecting line between cards */}
              {idx < objects.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-red-500/30 -z-0" />
              )}

              <div
                onClick={() => {
                  sound.click();
                  onSelectObject(obj);
                }}
                className={`relative z-10 p-4 rounded-sm border transition-all cursor-pointer ${
                  isExamined
                    ? 'bg-[#0e1117] border-red-500/40'
                    : 'bg-[#090a0d] border-white/10 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-black border border-white/20 flex items-center justify-center font-bold text-white">
                      {obj.id}
                    </span>
                    <span className="font-bold text-white text-sm">{obj.name}</span>
                  </div>
                  {isExamined ? (
                    <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3 h-3" /> EXAMINED
                    </span>
                  ) : (
                    <span className="text-white/40 text-[10px] flex items-center gap-1">
                      <Lock className="w-3 h-3" /> PENDING EXAM
                    </span>
                  )}
                </div>

                <div className="mt-2 text-white/60 text-xs font-mono">
                  <span className="text-white/40">LOCATION: </span>
                  {obj.location}
                </div>

                {isExamined ? (
                  <div className="mt-2 pt-2 border-t border-white/10 font-mono text-xs text-red-300">
                    <span className="text-white/40 text-[10px] block">CLUE TRACE:</span>
                    <div className="whitespace-pre-line text-[11px] mt-0.5">{obj.clueText}</div>
                  </div>
                ) : (
                  <div className="mt-2 pt-2 border-t border-white/5 font-mono text-[11px] text-white/30 italic">
                    Tap to inspect and reveal connection thread.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Discovered Relationship Badges */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <h4 className="text-xs font-mono tracking-widest text-white/40 uppercase mb-3">
          VERIFIED ANOMALY INTERSECTIONS:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {connections.map((conn) => (
            <div
              key={conn.id}
              className={`p-3 rounded-sm border font-mono text-xs transition-all ${
                conn.unlocked
                  ? 'bg-red-950/20 border-red-500/40 text-white'
                  : 'bg-white/[0.01] border-white/5 text-white/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold">{conn.title}</span>
                {conn.unlocked ? (
                  <span className="text-emerald-400 text-[10px] font-bold">MATCHED ✓</span>
                ) : (
                  <span className="text-white/30 text-[10px]">LOCKED</span>
                )}
              </div>
              <div className="text-[11px] text-red-400 tracking-wider">
                {conn.unlocked ? conn.matchKey : '??? // ENCRYPTED'}
              </div>
              {conn.unlocked && (
                <p className="text-[11px] text-white/60 mt-1 leading-snug">{conn.detail}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper renderer for desktop nodes
function renderDesktopNode(
  item: ArchiveObject,
  onSelect: (o: ArchiveObject) => void,
  compact = false
) {
  if (!item) return null;
  const isExamined = item.examined;

  return (
    <div
      onClick={() => {
        sound.click();
        onSelect(item);
      }}
      className={`relative z-20 cursor-pointer rounded-sm border transition-all duration-300 font-mono text-xs ${
        compact ? 'w-full p-2.5' : 'w-72 p-3.5'
      } ${
        isExamined
          ? 'bg-[#11141a] border-red-500/60 shadow-[0_0_15px_rgba(220,38,38,0.15)] hover:border-red-400'
          : 'bg-[#0a0c0f] border-white/15 opacity-60 hover:opacity-100 hover:border-white/30'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-white/40 tracking-widest">{item.recordId}</span>
        {isExamined ? (
          <span className="text-emerald-400 font-bold text-[10px]">MATCHED</span>
        ) : (
          <span className="text-white/30 text-[10px]">PENDING</span>
        )}
      </div>

      <div className="font-bold text-white text-sm tracking-wide group-hover:text-red-300">
        {item.name}
      </div>

      <div className="text-[10px] text-white/50 truncate mt-0.5">{item.location}</div>

      {isExamined ? (
        <div className="mt-2 pt-1.5 border-t border-white/10 text-red-300 text-[10px] font-bold truncate">
          {item.clueTags.map((t) => `#${t}`).join(' ')}
        </div>
      ) : (
        <div className="mt-2 pt-1.5 border-t border-white/5 text-white/20 text-[10px] italic">
          [Record unexamined]
        </div>
      )}
    </div>
  );
}
