import React, { useEffect } from 'react';
import { MysteryConnection } from '../types';
import { Network, Sparkles, X } from 'lucide-react';

interface ConnectionNotificationProps {
  connection: MysteryConnection | null;
  onDismiss: () => void;
}

export const ConnectionNotification: React.FC<ConnectionNotificationProps> = ({
  connection,
  onDismiss,
}) => {
  useEffect(() => {
    if (connection) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [connection, onDismiss]);

  if (!connection) return null;

  return (
    <div
      id="connection-notification-toast"
      className="fixed bottom-6 right-6 z-50 max-w-md w-full p-4 bg-[#0d0f14] border-2 border-red-500 rounded-sm shadow-[0_0_30px_rgba(220,38,38,0.35)] font-mono text-xs animate-bounce-short transition-all duration-300"
      role="alert"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-red-500 font-bold tracking-widest uppercase">
          <Network className="w-4 h-4 animate-pulse" />
          <span>CONNECTION DISCOVERED</span>
        </div>
        <button
          onClick={onDismiss}
          className="text-white/40 hover:text-white p-0.5 cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-2.5 space-y-1">
        <div className="text-white font-bold text-sm tracking-wider">
          {connection.title}
        </div>
        <div className="text-red-400 font-semibold text-xs tracking-widest flex items-center gap-1.5 pt-1">
          <span className="text-white/40 uppercase">MATCH:</span>
          <span className="px-1.5 py-0.5 bg-red-950/80 border border-red-800/60 rounded-xs">
            {connection.matchKey}
          </span>
        </div>
        <p className="text-white/70 text-[11px] leading-relaxed pt-1.5 border-t border-white/10 mt-2">
          {connection.detail}
        </p>
      </div>

      {/* Pulsing corner indicator */}
      <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full animate-ping pointer-events-none" />
    </div>
  );
};
