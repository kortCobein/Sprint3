import type { LoginCredentials, SessionData } from './Auth';

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<SessionData>;
}
