import type { AuthenticatedUser } from '../domain/Auth';

interface RolePanelProps {
  user: AuthenticatedUser;
}

const roleDescriptions = {
  Administrador: 'Acceso de administrador habilitado.',
  Auditor: 'Acceso de auditor habilitado.',
  Cliente: 'Acceso de cliente habilitado.',
} as const;

export function RolePanel({ user }: RolePanelProps) {
  return (
    <section className="session-card" aria-labelledby="session-title">
      <div>
        <p className="eyebrow">Sesión activa</p>
        <h2 id="session-title">{user.role}</h2>
        <p>
          Usuario: <strong>{user.username}</strong> · {roleDescriptions[user.role]}
        </p>
      </div>
    </section>
  );
}
