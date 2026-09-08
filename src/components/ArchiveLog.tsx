import React, { useEffect, useRef } from 'react';
import { ArchiveLogEntry } from '../types';
import { Terminal, ShieldAlert, Activity } from 'lucide-react';

interface ArchiveLogProps {
  logs: ArchiveLogEntry[];
  integrity: number;
}

export const ArchiveLog: React.FC<ArchiveLogProps> = ({ logs, integrity }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getEntryColor = (type: ArchiveLogEntry['type']) => {
    switch (type) {
      case 'trace':
        return 'text-red-400';
      case 'connection':
        return 'text-emerald-400';
      case 'anomaly':
        return 'text-amber-400';
      case 'corrupt':
        return 'text-red-500 font-bold glitch-text-active';
      default:
        return 'text-white/70';
    }
  };

  return (
    <section
      id="archive-log-section"
      className="mt-16 pt-8 border-t border-white/10 font-mono text-xs"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-red-500" />
          <h3 className="text-white font-bold tracking-widest uppercase">
            ARCHIVE TELEMETRY LOG
          </h3>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        </div>

        <div className="flex items-center gap-2 text-[11px] text-white/40">
          <Activity className="w-3.5 h-3.5 text-emerald-500" />
          <span>REAL-TIME STREAM // PORT 3000</span>
        </div>
      </div>

      <div className="bg-[#080a0d] border border-white/10 rounded-sm p-4 h-48 overflow-y-auto space-y-1.5 relative shadow-inner" ref={scrollRef}>
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-3 leading-relaxed">
            <span className="text-white/30 shrink-0 select-none">
              [{log.timestamp}]
            </span>
            <span className={getEntryColor(log.type)}>
              {log.text}
            </span>
          </div>
        ))}

        {integrity <= 24 && (
          <div className="flex items-center gap-2 text-red-500 text-[11px] pt-1 animate-pulse font-bold">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>CRITICAL WARNING: PERSISTENT BUFFER CORRUPTION AT 0x7F9A00</span>
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px] text-white/30">
        <span>ARCHIVE OPERATING SUBSYSTEM V4.19</span>
        <span>AUTO-REPLICATING LOCAL TRACE BUFFERS</span>
      </div>
    </section>
  );
};
