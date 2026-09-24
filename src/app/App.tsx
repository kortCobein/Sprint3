import { useMemo } from 'react';
import { useProducts } from '../features/products/application/useProducts';
import { ProductList } from '../features/products/ui/ProductList';
import { createProductService } from './createProductService';

export default function App() {
  const productService = useMemo(() => createProductService(), []);
  const { products, loading, error } = useProducts(productService);

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Sprint 3 · React + TypeScript</p>
        <h1>Base de la aplicación</h1>
        <p>
          Arquitectura inicial separada por responsabilidades y preparada para
          crecer por funcionalidades.
        </p>
      </header>

      <section className="catalog-card" aria-labelledby="catalog-title">
        <h2 id="catalog-title">Catálogo base</h2>

        {loading && <p>Cargando productos...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {!loading && !error && <ProductList products={products} />}
      </section>
    </main>
  );
}
