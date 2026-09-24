import { FetchHttpClient } from '../core/http/FetchHttpClient';
import { BrowserSessionService } from '../features/auth/infrastructure/BrowserSessionService';
import { FakeStoreAuthService } from '../features/auth/infrastructure/FakeStoreAuthService';

const DEFAULT_API_URL = 'https://fakestoreapi.com';

export function createAuthServices() {
  const httpClient = new FetchHttpClient();
  const apiUrl = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_URL).replace(
    /\/$/,
    '',
  );

  return {
    authService: new FakeStoreAuthService(httpClient, apiUrl),
    sessionService: new BrowserSessionService(),
  };
}
