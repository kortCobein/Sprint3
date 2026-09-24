import { useMemo } from "react";
import type { UserRole } from "../features/auth/domain/Auth";
import { useCarts } from "../hooks/useCarts";
import { FakeStoreCartService } from "../services/FakeStoreCartService";
import { createProductService } from "../app/createProductService";

interface CartsPageProps {
  userRole: UserRole;
}

export function CartsPage({ userRole }: CartsPageProps) {
  const cartService = useMemo(() => new FakeStoreCartService(), []);
  const productService = useMemo(() => createProductService(), []);

  const { carts, products, loading, error, retry } = useCarts(
    cartService,
    productService,
  );

  if (userRole === "Cliente") {
    return (
      <main>
        <h1>Acceso restringido</h1>
        <p>
          No tienes permisos para consultar el histórico global de carritos.
        </p>
      </main>
    );
  }

  if (loading) {
    return (
      <main>
        <h1>Histórico global de carritos</h1>
        <p>Cargando carritos...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Histórico global de carritos</h1>
        <p>{error}</p>

        <button type="button" onClick={retry}>
          Reintentar
        </button>
      </main>
    );
  }

  return (
    <main>
      <h1>Histórico global de carritos</h1>

      {carts.map((cart) => (
        <article key={cart.id}>
          <h2>Carrito #{cart.id}</h2>

          <p>
            <strong>Usuario propietario:</strong> {cart.userId}
          </p>

          <p>
            <strong>Fecha:</strong> {new Date(cart.date).toLocaleDateString()}
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
                    {" - "}
                    Cantidad: {cartProduct.quantity}
                  </li>
                );
              })}
            </ul>
          </details>
        </article>
      ))}
    </main>
  );
}
