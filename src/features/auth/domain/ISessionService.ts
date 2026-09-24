import type { SessionData } from './Auth';

export interface ISessionService {
  save(session: SessionData): void;
  load(): SessionData | null;
  clear(): void;
}
