import { useEffect, useState } from 'react';
import type { Product } from '../core/models/Product';
import { AddToCartActions } from '../components/AddToCartActions';
import { CartView } from '../components/CartView';
import '../index.css';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);

  // Simulamos el consumo de la FakeStoreAPI para traer las imágenes y datos reales
  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=25')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>NovaStore</h1>
        <p>Tu tienda en línea con la mejor tecnología y estilo.</p>
      </header>
      

      <main className="main-content">
        {/* Lado izquierdo: Catálogo con imágenes y botones (US09) */}
        <section className="catalog-section">
          <h2>Catálogo Base</h2>
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="image-container">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-info">
                  <h3 title={product.title}>{product.title}</h3>
                  <p className="price">${product.price.toFixed(2)}</p>
                  
                  {/* Aquí inyectamos tu Historia de Usuario 9 */}
                  <AddToCartActions product={product} userRole="Cliente" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lado derecho: Gestión del carrito (US10) */}
        <aside className="cart-section">
          <CartView />
        </aside>
      </main>
    </div>
  );
}