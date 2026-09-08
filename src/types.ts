export type ObjectType = 'cassette' | 'key' | 'camera' | 'ticket' | 'watch' | 'polaroid';

export interface ArchiveObject {
  id: string;
  recordId: string;
  name: string;
  location: string;
  date: string;
  status: 'UNCLAIMED' | 'ANALYZING' | 'EXAMINED';
  classification: string;
  coordinates: string;
  summaryStory: string;
  scanningSteps: string[];
  clueTitle: string;
  clueText: string;
  clueTags: string[];
  connectionIds: string[];
  illustrationType: ObjectType;
  examined: boolean;
}

export interface MysteryConnection {
  id: string;
  objectIds: [string, string];
  title: string;
  matchKey: string;
  detail: string;
  unlocked: boolean;
}

export interface ArchiveLogEntry {
  id: string;
  timestamp: string;
  text: string;
  type: 'system' | 'trace' | 'connection' | 'anomaly' | 'corrupt';
}

export interface GlitchEvent {
  id: string;
  type: 'text' | 'timestamp' | 'platform7' | 'time2341' | 'connected' | 'tear' | 'static';
  content?: string;
  durationMs: number;
}
