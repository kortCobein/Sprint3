import { useMemo } from "react";
import { useUsers } from "../hooks/useUsers";
import { FakeStoreUserService } from "../services/FakeStoreUserService";

export function UsersPage() {
  const userService = useMemo(() => new FakeStoreUserService(), []);

  const { users, loading, error, retry } = useUsers(userService);

  if (loading) {
    return (
      <main>
        <h1>Usuarios registrados</h1>
        <p>Cargando usuarios...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Usuarios registrados</h1>
        <p>{error}</p>
        <button type="button" onClick={retry}>
          Reintentar
        </button>
      </main>
    );
  }

  return (
    <main>
      <h1>Usuarios registrados</h1>

      <div>
        {users.map((user) => (
          <article key={user.id}>
            <h2>
              {user.name.firstname} {user.name.lastname}
            </h2>

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
    </main>
  );
}
