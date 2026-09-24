import { useEffect, useMemo, useState } from 'react';
import type { SessionData } from './features/auth/domain/Auth';
import { useAuth } from './features/auth/application/useAuth';
import { LoginForm } from './features/auth/ui/LoginForm';
import { RolePanel } from './features/auth/ui/RolePanel';
import { CatalogPage } from './features/products/pages/CatalogPage';
import { ProductDetailPage } from './features/products/pages/ProductDetailPage';
import { useProducts } from './features/products/application/useProducts';
import { ProductCreateForm } from './features/products/ui/ProductCreateForm';
import { ProductList } from './features/products/ui/ProductList';
import { CartView } from './components/CartView';
import { UsersPage } from './components/UsersPage';
import { createAuthServices } from './app/createAuthServices';
import { createProductService } from './app/createProductService';

function InventoryPanel() {
  const productService = useMemo(() => createProductService(), []);
  const {
    products,
    loading,
    error,
    saving,
    mutationError,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts(productService);

  return (
    <>
      <section className="catalog-card" aria-labelledby="create-title">
        <h2 id="create-title">Agregar producto</h2>
        <ProductCreateForm disabled={saving} onCreate={createProduct} />
        {mutationError && <p className="error-message">{mutationError}</p>}
      </section>

      <section className="catalog-card" aria-labelledby="inventory-title">
        <h2 id="inventory-title">Gestión de inventario</h2>
        {loading && <p>Cargando productos...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {!loading && !error && (
          <ProductList
            products={products}
            disabled={saving}
            onUpdate={updateProduct}
            onDelete={deleteProduct}
          />
        )}
      </section>
    </>
  );
}

interface AuthenticatedAppProps {
  session: SessionData;
  onLogout(): void;
}

function AuthenticatedApp({ session, onLogout }: AuthenticatedAppProps) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const isAdmin = session.user.role === 'Administrador';
  const canAudit = isAdmin || session.user.role === 'Auditor';
  const isClient = session.user.role === 'Cliente';

  useEffect(() => {
    localStorage.setItem('userRole', session.user.role);
    return () => localStorage.removeItem('userRole');
  }, [session.user.role]);

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Sprint 3 · React + TypeScript</p>
        <h1>Tienda</h1>
        <p>Catálogo, sesión, inventario, usuarios y carrito integrados.</p>
      </header>

      <RolePanel user={session.user} onLogout={onLogout} />

      {isAdmin && <InventoryPanel />}
      {canAudit && <UsersPage />}

      <section className="catalog-card" aria-labelledby="catalog-title">
        <h2 id="catalog-title">
          {selectedProductId === null ? 'Catálogo de productos' : 'Detalle del producto'}
        </h2>

        {selectedProductId === null ? (
          <CatalogPage
            userRole={session.user.role}
            onSelectProduct={(id) => setSelectedProductId(id)}
          />
        ) : (
          <ProductDetailPage
            productId={selectedProductId}
            onBack={() => setSelectedProductId(null)}
          />
        )}
      </section>

      {isClient && (
        <section className="catalog-card" aria-labelledby="cart-title">
          <h2 id="cart-title">Carrito</h2>
          <CartView />
        </section>
      )}
    </main>
  );
}

export default function App() {
  const authServices = useMemo(() => createAuthServices(), []);
  const { session, loading, error, login, logout } = useAuth(
    authServices.authService,
    authServices.sessionService,
  );

  if (!session) {
    return <LoginForm loading={loading} error={error} onLogin={login} />;
  }

  return <AuthenticatedApp session={session} onLogout={logout} />;
}
