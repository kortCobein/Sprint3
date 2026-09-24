import { useMemo } from 'react';
import type { SessionData } from '../features/auth/domain/Auth';
import { useAuth } from '../features/auth/application/useAuth';
import { LoginForm } from '../features/auth/ui/LoginForm';
import { RolePanel } from '../features/auth/ui/RolePanel';
import { useProducts } from '../features/products/application/useProducts';
import { ProductCreateForm } from '../features/products/ui/ProductCreateForm';
import { ProductList } from '../features/products/ui/ProductList';
import { createAuthServices } from './createAuthServices';
import { createProductService } from './createProductService';

interface AuthenticatedAppProps { session: SessionData; onLogout(): void; }

function AuthenticatedApp({ session, onLogout }: AuthenticatedAppProps) {
  const productService = useMemo(() => createProductService(), []);
  const { products, loading, error, saving, mutationError, createProduct, updateProduct } = useProducts(productService);
  const canManageInventory = session.user.role === 'Administrador';

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Sprint 3 · React + TypeScript</p>
        <h1>Base de la aplicación</h1>
        <p>Sesión protegida en React con autenticación, rol y gestión de productos.</p>
      </header>
      <RolePanel user={session.user} onLogout={onLogout} />
      {canManageInventory && (
        <section className="catalog-card" aria-labelledby="create-title">
          <h2 id="create-title">Agregar producto</h2>
          <ProductCreateForm disabled={saving} onCreate={createProduct} />
          {mutationError && <p className="error-message">{mutationError}</p>}
        </section>
      )}
      <section className="catalog-card" aria-labelledby="catalog-title">
        <h2 id="catalog-title">Catálogo base</h2>
        {loading && <p>Cargando productos...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {!loading && !error && (
          <ProductList products={products} disabled={saving} onUpdate={canManageInventory ? updateProduct : undefined} />
        )}
      </section>
    </main>
  );
}

export default function App() {
  const authServices = useMemo(() => createAuthServices(), []);
  const { session, loading, error, login, logout } = useAuth(authServices.authService, authServices.sessionService);
  if (!session) return <LoginForm loading={loading} error={error} onLogin={login} />;
  return <AuthenticatedApp session={session} onLogout={logout} />;
}
