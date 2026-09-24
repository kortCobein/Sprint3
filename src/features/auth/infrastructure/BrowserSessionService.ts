import type { SessionData } from '../domain/Auth';
import type { ISessionService } from '../domain/ISessionService';

const TOKEN_KEY = 'sprint3.auth.token';
const USER_KEY = 'sprint3.auth.user';

export class BrowserSessionService implements ISessionService {
  save(session: SessionData): void {
    localStorage.setItem(TOKEN_KEY, session.token);
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
  }

  load(): SessionData | null {
    const token = localStorage.getItem(TOKEN_KEY);
    const userJson = localStorage.getItem(USER_KEY);

    if (!token || !userJson) return null;

    try {
      return {
        token,
        user: JSON.parse(userJson) as SessionData['user'],
      };
    } catch {
      this.clear();
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    // Limpieza de claves antiguas y del carrito para evitar datos entre sesiones.
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('rol');
    localStorage.removeItem('cart_data');
    localStorage.removeItem('carrito');
  }
}
