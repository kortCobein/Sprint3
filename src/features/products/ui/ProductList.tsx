import type { Product } from '../domain/Product';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <ul className="product-list">
      {products.slice(0, 5).map((product) => (
        <li className="product-card" key={product.id}>
          <strong>{product.title}</strong>
          <span>${product.price.toFixed(2)}</span>
        </li>
      ))}
    </ul>
  );
}
