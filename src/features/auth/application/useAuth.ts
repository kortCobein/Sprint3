import { useState } from 'react';
import type { LoginCredentials, SessionData } from '../domain/Auth';
import type { IAuthService } from '../domain/IAuthService';
import type { ISessionService } from '../domain/ISessionService';

interface AuthState {
  session: SessionData | null;
  loading: boolean;
  error: string | null;
}

export function useAuth(
  authService: IAuthService,
  sessionService: ISessionService,
) {
  const [state, setState] = useState<AuthState>(() => ({
    session: sessionService.load(),
    loading: false,
    error: null,
  }));

  async function login(credentials: LoginCredentials): Promise<boolean> {
    setState((current) => ({ ...current, loading: true, error: null }));

    try {
      const session = await authService.login(credentials);
      sessionService.save(session);
      setState({ session, loading: false, error: null });
      return true;
    } catch {
      setState({
        session: null,
        loading: false,
        error: 'No se pudo iniciar sesión. Verifica tus credenciales y conexión.',
      });
      return false;
    }
  }

  return {
    ...state,
    login,
  };
}
