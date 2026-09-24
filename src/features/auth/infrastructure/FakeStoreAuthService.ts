import type { IHttpClient } from '../../../core/http/IHttpClient';
import type { IPostHttpClient } from '../../../core/http/IPostHttpClient';
import type { LoginCredentials, SessionData } from '../domain/Auth';
import { resolveRoleByUserId } from '../domain/Auth';
import type { IAuthService } from '../domain/IAuthService';

interface LoginResponse {
  token: string;
}

interface FakeStoreUser {
  id: number;
  username: string;
}

type AuthHttpClient = IHttpClient & IPostHttpClient;

export class FakeStoreAuthService implements IAuthService {
  private readonly httpClient: AuthHttpClient;
  private readonly baseUrl: string;

  constructor(httpClient: AuthHttpClient, baseUrl: string) {
    this.httpClient = httpClient;
    this.baseUrl = baseUrl;
  }

  async login(credentials: LoginCredentials): Promise<SessionData> {
    const response = await this.httpClient.post<LoginResponse, LoginCredentials>(
      `${this.baseUrl}/auth/login`,
      credentials,
    );

    const users = await this.httpClient.get<FakeStoreUser[]>(
      `${this.baseUrl}/users`,
    );
    const user = users.find((item) => item.username === credentials.username);

    if (!user) {
      throw new Error('No se encontró la información del usuario autenticado.');
    }

    return {
      token: response.token,
      user: {
        id: user.id,
        username: user.username,
        role: resolveRoleByUserId(user.id),
      },
    };
  }
}
