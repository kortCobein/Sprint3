import { useState, type FormEvent } from 'react';
import type { LoginCredentials } from '../domain/Auth';

interface LoginFormProps {
  loading: boolean;
  error: string | null;
  onLogin(credentials: LoginCredentials): Promise<boolean>;
}

export function LoginForm({ loading, error, onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanUsername = username.trim();

    if (!cleanUsername || !password) {
      setValidationError('Ingresa tu usuario y contraseña.');
      return;
    }

    setValidationError(null);
    await onLogin({ username: cleanUsername, password });
  }

  return (
    <main className="login-shell">
      <section className="login-card" aria-labelledby="login-title">
        <p className="eyebrow">Sprint 3 · React + TypeScript</p>
        <h1 id="login-title">Iniciar sesión</h1>
        <p className="login-description">
          Ingresa con una cuenta válida de FakeStoreAPI.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            disabled={loading}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            disabled={loading}
          />

          {(validationError || error) && (
            <p className="error-message" role="alert">
              {validationError ?? error}
            </p>
          )}

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
      </section>
    </main>
  );
}
