import { useMemo } from 'react';
import { useUsers } from '../hooks/useUsers';
import { FakeStoreUserService } from '../services/FakeStoreUserService';

export function UsersPage() {
  const userService = useMemo(() => new FakeStoreUserService(), []);
  const { users, loading, error, retry } = useUsers(userService);

  if (loading) {
    return (
      <section className="catalog-card">
        <h2>Usuarios registrados</h2>
        <p>Cargando usuarios...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="catalog-card">
        <h2>Usuarios registrados</h2>
        <p>{error}</p>
        <button type="button" onClick={() => void retry()}>
          Reintentar
        </button>
      </section>
    );
  }

  return (
    <section className="catalog-card">
      <h2>Usuarios registrados</h2>
      <div>
        {users.map((user) => (
          <article key={user.id}>
            <h3>
              {user.name.firstname} {user.name.lastname}
            </h3>
            <p>
              <strong>Usuario:</strong> {user.username}
            </p>
            <p>
              <strong>Correo:</strong> {user.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {user.phone}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
