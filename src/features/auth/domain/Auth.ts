export type UserRole = 'Administrador' | 'Auditor' | 'Cliente';

export interface AuthenticatedUser {
  id: number;
  username: string;
  role: UserRole;
}

export interface SessionData {
  token: string;
  user: AuthenticatedUser;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export function resolveRoleByUserId(userId: number): UserRole {
  if (userId === 1 || userId === 2) return 'Administrador';
  if (userId === 3) return 'Auditor';
  return 'Cliente';
}
