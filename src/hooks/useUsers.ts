import { useCallback, useEffect, useState } from 'react';
import type { User } from '../core/models/user';
import type { IUserService } from '../core/services/IUserService';

export function useUsers(userService: IUserService) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadInitialUsers() {
      try {
        const data = await userService.getAllUsers();
        if (active) {
          setUsers(data);
          setError(null);
        }
      } catch {
        if (active) {
          setError('No se pudieron cargar los usuarios.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadInitialUsers();

    return () => {
      active = false;
    };
  }, [userService]);

  const retry = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch {
      setError('No se pudieron cargar los usuarios.');
    } finally {
      setLoading(false);
    }
  }, [userService]);

  return {
    users,
    loading,
    error,
    retry,
  };
}
