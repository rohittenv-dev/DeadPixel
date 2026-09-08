import React from 'react';
import { ArchiveObject } from '../types';
import { ObjectIllustration } from './ObjectIllustration';
import { sound } from '../utils/sound';
import { Search, CheckCircle2, ShieldAlert, MapPin, Calendar, FileText } from 'lucide-react';

interface ObjectCardProps {
  item: ArchiveObject;
  integrity: number;
  glitchActive: boolean;
  onExamine: (item: ArchiveObject) => void;
}

export const ObjectCard: React.FC<ObjectCardProps> = ({
  item,
  integrity,
  glitchActive,
  onExamine,
}) => {
  const isSeverelyCorrupted = integrity <= 24;
  const isModeratelyCorrupted = integrity <= 61;

  const handleClick = () => {
    sound.click();
    onExamine(item);
  };

  return (
    <article
      id={`evidence-card-${item.id}`}
      className={`group relative bg-[#0c0e12] border transition-all duration-300 rounded-sm flex flex-col justify-between overflow-hidden ${
        item.examined
          ? 'border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.6)]'
          : 'border-white/10 hover:border-red-500/50 hover:shadow-[0_4px_25px_rgba(220,38,38,0.1)]'
      } ${glitchActive ? 'glitch-text-active' : ''}`}
    >
      {/* Top classification banner */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/10 bg-white/[0.02] text-[11px] font-mono tracking-widest text-white/50">
        <div className="flex items-center gap-1.5">
          <FileText className="w-3 h-3 text-red-500/80" />
          <span className="font-semibold text-white/80">{item.recordId}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/40 hidden sm:inline">{item.coordinates}</span>
          {item.examined ? (
            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-1.5 py-0.2 rounded-xs border border-emerald-500/20">
              <CheckCircle2 className="w-2.5 h-2.5" />
              EXAMINED
            </span>
          ) : (
            <span className="text-amber-400/80 text-[10px] bg-amber-500/10 px-1.5 py-0.2 rounded-xs border border-amber-500/20">
              UNCLAIMED
            </span>
          )}
        </div>
      </div>

      {/* Visual illustration center stage */}
      <div className="relative py-4 px-2 bg-gradient-to-b from-[#0e1015] to-[#090b0e] flex items-center justify-center border-b border-white/5 group-hover:from-[#11141a] transition-colors">
        <ObjectIllustration
          type={item.illustrationType}
          size="md"
          glitched={glitchActive && isSeverelyCorrupted}
        />

        {/* Floating index watermark */}
        <span className="absolute bottom-2 right-3 text-3xl font-mono font-black text-white/[0.03] select-none pointer-events-none">
          {item.id}
        </span>
      </div>

      {/* Card Metadata Details */}
      <div className="p-4 flex-1 flex flex-col justify-between font-mono text-xs">
        <div>
          {/* Object Name */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold tracking-wider text-white group-hover:text-red-400 transition-colors">
              {item.name}
            </h3>
            <span className="text-white/30 text-[11px]">REC #{item.id}</span>
          </div>

          {/* Location & Date */}
          <div className="space-y-1.5 text-white/60 text-[11px] mb-3">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-red-500/70 shrink-0 mt-0.5" />
              <span className="leading-snug">{item.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-white/40 shrink-0" />
              <span>FOUND: {item.date}</span>
            </div>
          </div>

          {/* Classification snippet */}
          <p className="text-[11px] text-white/40 leading-relaxed line-clamp-2 border-l border-white/10 pl-2 mb-4">
            {item.summaryStory}
          </p>
        </div>

        {/* Examine CTA button */}
        <div className="pt-2 border-t border-white/10">
          <button
            id={`btn-examine-${item.id}`}
            onClick={handleClick}
            className={`w-full py-2.5 px-3 flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase transition-all rounded-xs cursor-pointer ${
              item.examined
                ? 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/15'
                : 'bg-red-950/40 hover:bg-red-900/60 text-red-200 border border-red-600/40 hover:border-red-500'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-red-400" />
            <span>{item.examined ? 'RE-EXAMINE RECORD' : 'EXAMINE OBJECT'}</span>
          </button>
        </div>
      </div>

      {/* Eerie border glitch line */}
      {isSeverelyCorrupted && (
        <div className="absolute top-0 left-0 w-full h-[1px] bg-red-500 animate-pulse" />
      )}
    </article>
  );
};
