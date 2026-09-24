import { useMemo } from 'react';
import type { UserRole } from '../features/auth/domain/Auth';
import { useCarts } from '../hooks/useCarts';
import { FakeStoreCartHistoryService } from '../services/FakeStoreCartHistoryService';
import { createProductService } from '../app/createProductService';

interface CartsPageProps {
  userRole: UserRole;
}

export function CartsPage({ userRole }: CartsPageProps) {
  const cartService = useMemo(() => new FakeStoreCartHistoryService(), []);
  const productService = useMemo(() => createProductService(), []);

  const { carts, products, loading, error, retry } = useCarts(
    cartService,
    productService,
  );

  if (userRole === 'Cliente') {
    return (
      <section className="catalog-card">
        <h2>Histórico global de carritos</h2>
        <p>No tienes permisos para consultar el histórico global de carritos.</p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="catalog-card">
        <h2>Histórico global de carritos</h2>
        <p>Cargando carritos...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="catalog-card">
        <h2>Histórico global de carritos</h2>
        <p className="error-message">{error}</p>
        <button type="button" onClick={() => void retry()}>
          Reintentar
        </button>
      </section>
    );
  }

  return (
    <section className="catalog-card">
      <h2>Histórico global de carritos</h2>

      {carts.length === 0 && <p>No hay carritos disponibles.</p>}

      {carts.map((cart) => (
        <article key={cart.id}>
          <h3>Carrito #{cart.id}</h3>

          <p>
            <strong>Usuario propietario:</strong> {cart.userId}
          </p>

          <p>
            <strong>Fecha:</strong>{' '}
            {new Date(cart.date).toLocaleDateString('es-MX')}
          </p>

          <details>
            <summary>Ver artículos</summary>

            <ul>
              {cart.products.map((cartProduct) => {
                const product = products.find(
                  (item) => item.id === cartProduct.productId,
                );

                return (
                  <li key={cartProduct.productId}>
                    {product?.title ?? `Producto ID: ${cartProduct.productId}`}
                    {' - '}
                    Cantidad: {cartProduct.quantity}
                  </li>
                );
              })}
            </ul>
          </details>
        </article>
      ))}
    </section>
  );
}
